
import { setup, assign, fromPromise } from "xstate";
import axios ;
// ========================================================================================
// STEP 1: Define Types Properly
// ========================================================================================

// Define the context interface
interface AuthContext {
  username: string;
  password: string;
  jwtToken: string;
  error: string | null;
  isLoading: boolean;
}

// Define the events union type
type AuthEvent = 
  | { type: "GO" }
  | { type: "SUBMIT"; username: string; password: string }
  | { type: "RETRY" }
  | { type: "CLEAR_ERROR" }
  | { type: "LOGOUT" };

// ========================================================================================
// STEP 2: Fixed XState Machine with Proper Setup
// ========================================================================================

export const machine = setup({
  types: {
    // ❌ Your original (wrong syntax):
    // context: { username="", password="", jwtToken="" } as {},
    
    // ✅ Correct syntax:
    context: {} as AuthContext,
    events: {} as AuthEvent,
  },
  
  // Define your authentication action properly
  actions: {
    // ❌ Your original (wrong syntax):
    // authenAction({context,event})=>
    
    // ✅ Correct authentication actions:
    authenAction: ({ context, event }) => {
      console.log("Authentication action triggered", { context, event });
    },
    
    setCredentials: assign({
      username: ({ event }) => {
        if (event.type === 'SUBMIT') return event.username;
        return ({ context }) => context.username;
      },
      password: ({ event }) => {
        if (event.type === 'SUBMIT') return event.password;
        return ({ context }) => context.password;
      },
      error: null,
      isLoading: true
    }),
    getToken:assign({
        jwtToken:({event})=>{
            const fetchFromServer=Axis3DIcon.
            return axios.
        }
    }),
    setToken: assign({
      jwtToken: ({ event }) => {
        // Assuming the event contains the token
        return event.token || 'mock_jwt_token_123';
      },
      error: null,
      isLoading: false,
      password: '' // Clear password for security
    }),
    
    setError: assign({
      error: ({ event }) => {
        return event.error || 'Authentication failed';
      },
      isLoading: false,
      password: '' // Clear password on error
    }),
    
    clearError: assign({
      error: null
    }),
    
    clearAuth: assign({
      username: '',
      password: '',
      jwtToken: '',
      error: null,
      isLoading: false
    })
  },
  
  // Define guards (conditions)
  guards: {
    hasValidCredentials: ({ event,context }) => {
      if (event.type === 'SUBMIT') {
        return event.username === 'admin@ss' && event.password === '123'&&context.jwtToken==;
      }
      return false;
    },
    
    hasToken: ({ context }) => {
      return context.jwtToken !== '';
    },
    
    hasError: ({ context }) => {
      return context.error !== null;
    }
  },
  
  // Define async services
  actors: {
    authenticateUser: fromPromise(async ({ input }: {
      input: { username: string; password: string }
    }) => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (input.username === 'admin@ss' && input.password === '123') {
        return {
          success: true,
          token: 'jwt_token_' + Date.now(),
          user: {
            id: '123',
            username: input.username,
            role: 'admin'
          }
        };
      }
      
      throw new Error('Invalid credentials');
    })
  }
  
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QEECuAXAFmAdrAdADID2UAljgMQDiA8gNoAMAuoqAA7GxnpnE5sQAD0QAmAMzj8AFmkBWcaICcjOaIDs6xutEAaEAE9EcgIyj8O5aNFz1J8UtEBfJ-rRZcBAMqoARgFseSkJaOgBVABUmViQQTm5efkERBAkpWQVlVQ0tHX0jBDMANnxGMrLxVSL1AA4i0SKXNwxsPHwfAJ58fgAxMgAnWHRKLzCAIQBZAEkolkF4nj4BWJS5GvV8BxrpGqU7IrXxE3zEWSVNoqUaxkkJOzqmkHdW7z9A9G6cPsHh0cmZ+gmGIcLiLJIrYzrTZXHZ7EwHGpHE4ITRyGTqJQmOpFRTScRyRquJ4tTztN5dACGJJwvAAxhTeDgoJQIPwwPgKAA3YgAa3ZVI8NLI9PQYGi81BiWWoBSZkYJV28vW0g0Eg0yNk0nw2xx1SUSjkSiKJjkj2epI673wAtadIZFGZYH6-WI-Xw7AANgyAGau-zW6l20Xi2ILKXJRByhUqIrK1WKdTIhQ1fDKJTSPambTiRFm6mvToffgAOQpnLIUAZYBG42ms2BcUlSwjhWkxu1NVE2yOa2N1WR4jbMgUZky6mk9hMecFBatTpd-UoACUAKIRJcATRDIISzYhhS75m0NRMmMN0jsSmR6fMWIkjFPNWulWcRPNbUtXXnrsoAGFCCuyBLgA+iuS5LrQS7bo2u7gjKkbWFqkhFA+ciMIi6EnsiOImBYaj1FoNimAoLhEjgxAQHAgjvvAoZNnBwiIAAtEUyIsdOLxEKQFASrB0qMQgKrIvY5wOIokiYhe2jWBxFrkugvFgvxKRHLhbaMAamLaGhNQKMiogmFq8hHNYGjyg02yyR+8mfN8QyKeG+74uc6maSY2noXphinCo+B7FYKiGehiFWbOlKBsK9pMg5e7wQg6wpp2J61OI6ixg4ejeYJF6lDoN5prI2ihWShafKW5aVqKMUMbK0g3HhtTVNs6YEhqOUxqIGQTjYqXFZ+Hzfv01XKZGdVSOoth1LUGbyKxWVFHVqYYlidT6vqU6kUAA */
  context: {
    username: "",
    password: "",
    jwtToken: "",
    error: null,
    isLoading: false
  },
  
  id: "Authens",
  initial: "Login",
  description: "Authentication state machine",
  
  states: {
    Login: {
      entry: "clearError",
      
      on: {
        GO: {
          // ❌ Your original (wrong syntax):
          // [
          //   {
          //   target: "#Authens.Submit.onFirst",
          //   guard
          //   }
          // ]
          
          // ✅ Correct syntax:
          target: "Submit.onFirst"
        }
      }
    },
    
    Submit: {
      initial: "onFirst",
      description: "Authentication submission process",
      
      // ❌ Your original had entry in wrong place with wrong syntax
      // ✅ Fixed structure:
      
      states: {
        onFirst: {
          description: "Initial authentication state",
          
          on: {
            SUBMIT: [
              {
                target: "authenticating",
                guard: "hasValidCredentials",
                actions: ["setCredentials", "authenAction"]
              },
              {
                target: "onNavigate",
                // actions: "setError"
              }
            ]
          }
        },
        
        authenticating: {
          description: "Processing authentication",
          
          invoke: {
            id: "authenticate",
            src: "authenticateUser",
            input: ({ context }) => ({
              username: context.username,
              password: context.password
            }),
            onDone: {
              target: "onNavigate",
              actions: "setToken"
            },
            onError: {
              target: "error",
              actions: "setError"
            }
          }
        },
        
        onNavigate: {
          description: "Post-authentication navigation",
          
          entry: ({ context }) => {
            console.log("Authentication successful, token:", context.jwtToken);
          },
          
          on: {
            SUBMIT: {
              // You can add more actions here
              actions: ({ context }) => {
                console.log("Already authenticated with token:", context.jwtToken);
              }
            }
          }
        },
        
        error: {
          description: "Authentication error state",
          
          on: {
            RETRY: "onFirst",
            CLEAR_ERROR: {
              target: "onFirst",
              actions: "clearError"
            }
          }
        }
      },
      
      on: {
        LOGOUT: {
          target: "Login",
          actions: "clearAuth"
        }
      }
    }
  }
});
