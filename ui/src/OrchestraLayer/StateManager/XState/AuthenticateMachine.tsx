import { createActorContext } from "@xstate/react";
import { assign, createMachine, type ActorRefFrom, fromPromise } from "xstate";
import axios from 'axios';

// --- Types ---
const mockDelay = (time: number) => new Promise((resolve) => setTimeout(resolve, time));

type AuthMachineContext = {
  username: string;
  password: string;
  token: string;
  jwt: string;
};

type AuthEvents =
  | { type: 'SUBMIT'; username: string; password: string; token: string }
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

    const response = await axios.get("http://localhost:8086/backend/auth");
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching JWT:", error);
    throw error;
  }
});

const authenticateWithCredentials = fromPromise(
  async ({ input }: { input: { username: string; password: string; token: string } }) => {
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

// --- State Machine Definition ---
const authenState = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QEMCuAXAFmAdgZXWXTADoB7HASRwEt0BiAbQAYBdRUABzNjpoo4gAHogBMzZiQCcAVgDMARlEAWAOxyAHHOYzRAGhABPRAuZyZJZct2rRGgGxS5c+3IC+bg2iy4CRUhTUdEwK7Egg3Lzo-DiCIgjikrKKKupaOvpGJqYkSjLMynLKookyUvYeXhjY+ITE5DgAgtW49BAUpDQ4AG5kANakAGZg6ADGmABSAOoAKixhXDx8AuHx8qokGjIKMjKqzDvKGk4GxgiKG+KKMo5a5lqVIN41fvUUzT44bR0kXb0DJGGY0ms0YoUEkWWsVWiHWm22u32h2OclOiA0ChI+QkCiKhRkGg0oikj2evjqASaLS+YAATrSyLSSJwADZEQaMgC2gJG42mczYEKW0RWoDWcg2Wx2ewOMiOJyyCAUqmU0nkh3UqnsBWYolJ1NepG6yBZNAg-gAwmR+jQ4I1BsRaQAxXmYJiC8KQkXQsUmZj2DSWf2idaqLVSMNohDKZhSXJyOwSzQuYkyfWfQ0kY2m83EK02u0Ouku4EhBYRYUxOJ+gNB+whiVhxyRxUXXKqCMNjTKewKBQkzxPA0UhofGpO5A0FmQeh4ACqACEALKUAXlr1VmFKvuSXXOKQY5SHBRR-KY5hbKTKJxE+xqXHpl4jsk4aKjIhdKDfHCdHr9Ugvm+-jzEKUSbr6CBwlKiKyvKqKKhiFgIq41g7GYjiPuS-gkIBNDvtEOBfnSDJMqy7Jcjh1JAcQIGepWorCLCErwtKSJyiiUb2OoJCiPYNx9lI4i6EomG1Nh2Zmpa1p9LasD2o6AAyZBQF07rrvRPqMUq-qBjG9ahuGLZnFIzAbFYuhXjcfE9qoomZhJuZgPmMmFopymqWC6lgQx8SmLWekNmGhmqFGiGWIJChEjcqgWQodkjhQSkqV8CkAPIAOKpXOa6gVCgjGWY0iiJFIZyvIdgnlpOziDx6jFAUjgPoOL6ZolylkBg9BCLAz5FrSAAUpjMAAlPQLUJTgSUdegtGLN5mnxCGcZmHkUZ9vY9gkNq1V2I4ziuB4g44GQEBwII43+Ll3rVggAC0RxRrdFhSC9B6aI4ZgHISabNcO2GBLQ6BXeBWnFGtJS5LKgmiM4ph3PF-1Up8wM+YgLhyCQqjHAUCjFBGEq7FGV4sTcGgxeUYbyAj9QOVJBZyX1JbjCjC3ojV21yoUHZaGTUYJnGOz1pZVhqFZ1OUmOuATlOkAszdSi9jxxTKg1Ui4nz-Y8aIYa8WT2o6LZv0Zs+VF4R+hFy1u9yY9jR545qhOKrogYKHeOj+lYruyOLWYmpJebSbJ8l0klXSWxBRKSBzVgSm9vMIdrlgBqoO7EmTBw+21yXh1VvGYioxX7D2avwQVGMRVFZUJhimeTe1GA5-EzBrbimLmdru1OOjh1uEAA */
  id: "authenState",
  types: {} as {
    context: AuthMachineContext;
    events: AuthEvents;
  },
  initial: "onInit",
  context: {
    username: "",
    password: "",
    token: "",
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
              token: ({ event }) => event.token || "",
            }),
            () => console.log("📝 User credentials received, starting authentication...")
          ]
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
          token: context.token
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
      // type: "final",
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
          token: ""
        })
      ],
      after: {
        100: { target: "onAuthenFailed" } // Short delay to ensure cleanup feels natural
      }
    }
  }
});

// --- Context and Export ---
export type AuthActorRef = ActorRefFrom<typeof authenState>;

const AuthenticateFactor = createActorContext(authenState);

export { authenState, AuthenticateFactor, getJWT, checkCookies, saveJWTToCookies, clearCookies };