import { createActorContext } from "@xstate/react";
import { assign, createMachine, type ActorRefFrom, fromPromise } from "xstate";
import axios from 'axios';

// --- Types ---
const mockDelay = (time: number) => new Promise((resolve) => setTimeout(resolve, time));

type RoleTypes = 'USER' | 'ADMIN'; // Default simple role types

type AuthMachineContext = {
  username: string;
  password: string;

  jwt: string;
};

type RegisterPayload = {
  userName: string;
  password: string;
  email: string;
  device: string;
  deviceIP: string;
  role: RoleTypes;
  phone?: string; // Optional field mentioned by user
};

type AuthEvents =
  | { type: 'SUBMIT'; username: string; password: string; }
  | { type: 'REGISTER'; payload: RegisterPayload }
  | { type: 'RETRY' }
  | { type: 'LOGOUT' };

// --- Configuration ---
const ADMIN_MOCK_JWT = true; // Toggle this for testing vs production
const MOCK_JWT_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJxdWFudHVtX2RldyIsIm5hbWUiOiJEdXkgTG9uZyIsImlhdCI6MTYxNjIzOTAyMiwiZXhwIjoxOTE2MjM5MDIyfQ.4n3f1o3_d3adK3y_sample_signature_verified";

// --- Cookie Utilities ---
const saveJWTToCookies = (jwt: string) => {
  if (!jwt || jwt.length === 0) {
    console.warn("Attempted to save empty JWT to cookies");
    return;
  }
  const expiryDate = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000); // 2 days from now
  document.cookie = `auth_jwt=${jwt}; expires=${expiryDate.toUTCString()}; path=/; Secure; SameSite=Lax`;
  console.log("✅ JWT saved to cookies successfully");
};

const checkCookies = (): string | null => {
  const cookies = document.cookie.split('; ');
  const jwtCookie = cookies.find(row => row.startsWith('auth_jwt='));
  if (jwtCookie) {
    const jwt = jwtCookie.split('=')[1];
    return jwt && jwt.length > 0 ? jwt : null;
  }
  return null;
};

const clearCookies = () => {
  document.cookie = "auth_jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; Secure; SameSite=Lax";
  console.log("🧹 JWT cookie cleared.");
};

// --- Services (Side Effects) ---
const getJWT = fromPromise(async () => {
  try {
    if (ADMIN_MOCK_JWT) {
      console.log("⚠️ Using MOCK JWT service.");
      await mockDelay(1000); // Simulate network latency
      return { jwt: MOCK_JWT_TOKEN };
    }

    const response = await axios.get("http://localhost:8086/backend/auth/login");
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching JWT:", error);
    throw error;
  }
});

const authenticateWithCredentials = fromPromise(
  async ({ input }: { input: { username: string; password: string; } }) => {
    try {
      if (ADMIN_MOCK_JWT) {
        console.log("⚠️ Using MOCK Login service.");
        await mockDelay(1000);
        if (input.username === "duylong@duylong.art" && input.password === "duylongadminpass") {
          return { jwt: MOCK_JWT_TOKEN };
        }
        throw new Error("Invalid mock credentials");
      }

      const response = await axios.post("http://localhost:8086/backend/auth/login", {
        username: input.username,
        password: input.password,
      });
      return response.data;
    } catch (error) {
      console.error("❌ Error authenticating:", error);
      throw error;
    }
  }
);

const registerWithCredentials = fromPromise(
  async ({ input }: { input: { payload: RegisterPayload } }) => {
    try {
      if (ADMIN_MOCK_JWT) {
        console.log("⚠️ Using MOCK Register service with payload:", input.payload);
        await mockDelay(1000);
        return { jwt: MOCK_JWT_TOKEN };
      }

      const response = await axios.post("http://localhost:8086/backend/auth/register", input.payload);
      return response.data;
    } catch (error) {
      console.error("❌ Error registering:", error);
      throw error;
    }
  }
);

// --- State Machine Definition ---
const authenState = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QEMCuAXAFmAdgZXWXTADoB7HASRwEt0BiAbQAYBdRUABzNjpoo4gAHogBMzAKwkAnBIDMARlEA2OcoDsAFgWa56gDQgAnogAcCkhObXmc06PUa5zUwF9XhtFlwEipCtR0TArsSCDcvOj8OIIiCOJSsooqalo6eoYmCJrK0iSm9vbKppqipnJyohLunhjY+ITE5DgAgnW49BAUpDQ4AG5kANakAGZg6ADGmABSAOoAKiyhXDx8AmFx8qL5EgoS5RJp0goKmWJqJJqOh+qmt8zKEppuHiBe9b5NFG3eOJ3dJF6A2GJDGkxmC0YIUEETWMQ2iC2Oz2ByOJzO2VyJAUlXspVMGjK0hqb3aDT8zR+9XoYAATrSyLSSJwADZEEaMgC2oPGUzmizYMNWUXWoE2lWR+zkh20x1OxkRym2+wksiuoj0TzkJPePkapD6yBZNAgfgAwmQhjQ4C0RsRaQAxXmYJiCsKwkXwsWIBTMdRyS4PUTSXQSeSHDEa5SXeQ4gph5QubWvXXkpqG42m4gWq02u10p3g4LLcLC6KxH1+gOaIMh6XhgwKhC4wNK5TaUzMUqaaTKHVkz7+Vpkh3IGgsyD0PAAVQAQgBZSgCkse8sIhAnPYkZga57qmumCTKDEh0yBgoEnEaYkpgf6ykjscTiD0ABKAFEAOKUPDzd+vpYhUiNdvQ3X1mEuHRfXUSR1CedRpAxJRVXyPY41EKMHmqW9fkHEhaTAKAaFge1eigf4cB6fohlIAiiJIulAPdMtRWEREJUPFFpTReUshOSQSGUJRrEOXZ1Dg7Dalw+86OI0icHIukGSZVl2S5fDCLkxi3RWYDWPFbZOKlGUFDlJDdAsaRTyUDUrHbdR+2kilUyiCYiDIiiqOBUgXJoNziCY3S4QrBAkSM1FZXRJsYIguCVA1DCEIqF4pI+e9fP8jylMZZk2XQDlaW5DK-EC0s9K9NjQo43ZjJ4jF7AsFE7ljK5JNJJz0yNE1zUtQZrVgW17QAGTIIi-lK1d9Mrf1W2DUMGwxdQt3MKpTJDDCNEctKKQzbrs16-rBrpEaxuLIDgvXaDq1rebuPqv0SGudsJBUGCDi2vUKQoE7enoIaAHlP3+6dl3Oz0Qp0ODt2kOwcTDOw9EbPi7BIXE4xrbQe2KD60yHE6yAweghBI5z81pAAKcCAEp6FTPDvtGgn0AmliKriSGpGYGHzHrBHxKQ1V1GxaQEN0dQHEeTRsNeHAyAgOBBDp-UwZAyqAFpjybDXtxsXW9b9HH6aoWh0BVqbslEDErgg311pKQ45F7aVDfvb4yTNtnEDUM9bmkKtNGeX3NCtp5BK573HBrX2XZ2rqszAHM+rze1CymD2QvsKREz2aR4tuUzNayURnkuYNcg0TcdyVGOvmHX5R3HSB08u5xo2LjDMdSSoMTUCDRAUISVX9S9ZBr2jNIY2kyOb0C1ADX3-cD0wQyQlQ++KDUYJF0pc7HkhiqiBSZ8qufHuXxe7mX4Om07PI4dlBD+733b48Tw6yZ+irJs9hBM7DnO87mF7ItBwZ8-biQQuJISmg94MzGsfdmzghY5GKC9O42h4JIS3GjaUVQuwYRSu1batd8YYAQT6RMeQVBHnWiccWVksEWG0DoF6IZB6OHcO4IAA */
  id: "authenState",
  types: {} as {
    context: AuthMachineContext;
    events: AuthEvents;
  },
  initial: "onInit",
  context: {
    username: "",
    password: "",
    jwt: ""
  },

  states: {
    // Step 1: Check JWT in cookies
    onInit: {
      entry: () => console.log("🔍 Step 1: Checking for existing JWT in cookies..."),
      always: [
        {
          guard: () => {
            const jwt = checkCookies();
            const hasJWT = jwt !== null && jwt.length > 0;
            console.log(`Cookie check: ${hasJWT ? '✅ JWT found' : '❌ No JWT'}`);
            return hasJWT;
          },
          target: "onLogin",
          actions: [
            assign({
              jwt: () => checkCookies() || ""
            }),
            () => console.log("✅ Using existing JWT from cookies, going to onLogin")
          ]
        },
        {
          target: "onAuthen",
          actions: () => console.log("➡️ No JWT in cookies, proceeding to onAuthen")
        }
      ]
    },

    // Step 2: Fetch JWT from API
    onAuthen: {
      entry: () => {
        console.log("🔍 Step 2: Attempting to fetch JWT from API...");
      },
      invoke: {
        id: "fetchJWT",
        src: getJWT,

        onDone: [
          {
            guard: ({ event }) => {
              const jwt = event.output?.jwt;
              const hasValidJWT = jwt && jwt.length > 0;
              console.log(`API response: ${hasValidJWT ? '✅ JWT received' : '❌ No valid JWT'}`);
              return hasValidJWT;
            },
            target: "validateCookiesAfterFetch",
            actions: [
              assign({
                jwt: ({ event }) => {
                  const output = event.output;
                  return output?.jwt || output || "";
                }
              }),
              ({ event }) => {
                const jwt = event.output?.jwt;
                if (jwt) {
                  console.log("💾 Saving JWT to cookies...");
                  saveJWTToCookies(jwt);
                }
              }
            ]
          },
          {
            target: "onAuthenFailed",
            actions: () => console.log("❌ API returned no valid JWT, going to onAuthenFailed")
          }
        ],
        onError: {
          target: "onAuthenFailed",
          actions: ({ event }) => console.log("❌ API error, going to onAuthenFailed:", event.error)
        }
      }
    },

    // Step 3: Validate JWT was saved to cookies
    validateCookiesAfterFetch: {
      entry: () => console.log("🔍 Step 3: Validating JWT was saved to cookies..."),
      always: [
        {
          guard: () => {
            const jwt = checkCookies();
            const hasJWT = jwt !== null && jwt.length > 0;
            console.log(`Cookie validation: ${hasJWT ? '✅ JWT found in cookies' : '❌ JWT not in cookies'}`);
            return hasJWT;
          },
          target: "onLogin",
          actions: () => console.log("✅ JWT validated in cookies, proceeding to onLogin")
        },
        {
          target: "onAuthenFailed",
          actions: () => console.log("❌ JWT not found in cookies after save, going to onAuthenFailed")
        }
      ]
    },

    // Step 4a: Authentication failed - wait for user credentials
    onAuthenFailed: {
      entry: () => {
        console.log("⚠️ Authentication failed. Waiting for user credentials...");
      },
      on: {
        SUBMIT: {
          target: 'authenticating',
          actions: [
            assign({
              username: ({ event }) => event.username,
              password: ({ event }) => event.password,
            }),
            () => console.log("📝 User credentials received, starting authentication...")
          ]
        },
        REGISTER: {
          target: 'registering',
          actions: [
            assign({
              // Temporary store basic credentials in context if needed, or just pass payload directly to invoke
              username: ({ event }) => event.payload.userName,
              password: ({ event }) => event.payload.password,
            }),
            () => console.log("📝 Registration credentials received, starting registration...")
          ]
        }
      }
    },

    registering: {
      entry: () => console.log("📝 Registering user..."),
      invoke: {
        id: "register",
        src: registerWithCredentials,
        input: ({ event }) => {
          // We need to access the event payload here.
          // Since xstate v5 invoke input can access event, we cast relevant event type
          const registerEvent = event as Extract<AuthEvents, { type: 'REGISTER' }>;
          return {
            payload: registerEvent.payload
          };
        },
        onDone: {
          target: "validateCookiesAfterLogin",
          actions: [
            assign({
              jwt: ({ event }) => {
                const output = event.output;
                return output?.jwt || output || "";
              }
            }),
            ({ event }) => {
              console.log("✅ Registration successful.");
              const jwt = event.output?.jwt;
              if (jwt) {
                console.log("💾 Saving JWT to cookies...");
                saveJWTToCookies(jwt);
              }
            }
          ]
        },
        onError: {
          target: "onAuthenFailed",
          actions: ({ event }) => console.log("❌ Registration failed:", event.error)
        }
      }
    },

    // Step 5: Authenticate with user credentials
    authenticating: {
      entry: () => {
        console.log("🔐 Authenticating with user credentials...");
      },
      invoke: {
        id: "authenticate",
        src: authenticateWithCredentials,
        input: ({ context }) => ({
          username: context.username,
          password: context.password,
        }),
        onDone: {
          target: "validateCookiesAfterLogin",
          actions: [
            assign({
              jwt: ({ event }) => {
                const output = event.output;
                return output?.jwt || output || "";
              }
            }),
            ({ event }) => {
              console.log("✅ Login successful with credentials.");
              const jwt = event.output?.jwt;
              if (jwt) {
                console.log("💾 Saving JWT to cookies...");
                saveJWTToCookies(jwt);
              }
            }
          ]
        },
        onError: {
          target: "onAuthenFailed",
          actions: ({ event }) => console.log("❌ Authentication failed:", event.error)
        }
      }
    },

    // Step 6: Validate JWT after manual login
    validateCookiesAfterLogin: {
      entry: () => console.log("🔍 Validating JWT after login..."),
      always: [
        {
          guard: () => {
            const jwt = checkCookies();
            const hasJWT = jwt !== null && jwt.length > 0;
            console.log(`Cookie validation: ${hasJWT ? '✅ JWT found' : '❌ JWT not found'}`);
            return hasJWT;
          },
          target: "onLogin",
          actions: () => console.log("✅ JWT validated, proceeding to onLogin")
        },
        {
          target: "onAuthenFailed",
          actions: () => console.log("❌ JWT validation failed, returning to onAuthenFailed")
        }
      ]
    },

    // Step 7: Final authenticated state
    onLogin: {
      entry: ({ context }) => {
        console.log("🎉 Authentication successful - Final State Reached.");
        console.log("Current JWT in context:", context.jwt ? "✅ Present" : "❌ Missing");
        const cookieJWT = checkCookies();
        console.log("Current JWT in cookies:", cookieJWT ? "✅ Present" : "❌ Missing");
      },
      on: {
        LOGOUT: {
          target: "onLogout"
        }
      }
    },

    onLogout: {
      entry: [
        () => console.log("👋 Logging out..."),
        clearCookies,
        assign({
          jwt: "",
          username: "",
          password: "",
        })
      ],
      after: {
        100: { target: "onInit" } // Short delay to ensure cleanup feels natural
      }
    }
  }
});

// --- Context and Export ---
export type AuthActorRef = ActorRefFrom<typeof authenState>;

const AuthenticateFactor = createActorContext(authenState);

export { authenState, AuthenticateFactor, getJWT, checkCookies, saveJWTToCookies, clearCookies };