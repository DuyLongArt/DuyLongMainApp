import Box from "@mui/material/Box";
import React, { useEffect, useRef, startTransition } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import type { ChildrenInterface } from "../OrchestraLayer/ChildrenComponent";
import { AuthenticateFactor } from "../OrchestraLayer/StateManager/XState/AuthenticateMachine";
import { useSelector } from "@xstate/react";
import console from "console";

// Constants
const AUTHENTICATED_STATE = "onLogin";
const UNAUTHENTICATED_STATE = "onAuthenFailed";
const LOADING_STATES = ["onInit", "onAuthen", "authenticating", "onTransaction"];
const LOGOUT_STATES = "onLogout";

const ROUTES = {
  HOME: '/home/index',
  LOGIN: '/login/index',
  ENTRY: '/entry/index'
} as const;

const SecurityLayer: React.FC<ChildrenInterface> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const authActorRef = AuthenticateFactor.useActorRef();

  // Track if navigation has already happened to prevent loops
  const hasNavigated = useRef(false);
  const previousState = useRef<string | null>(null);

  // Select state from XState machine
  const currentStateValue = useSelector(authActorRef, (snapshot) => snapshot.value);
  authActorRef.subscribe((snapshot) => {
    console.log("SecurityLayer | State:", snapshot.value);
  })
  const jwt = useSelector(authActorRef, (snapshot) => snapshot.context.jwt);
  const isLoading = useSelector(authActorRef, (snapshot) =>
    LOADING_STATES.some(stateKey => snapshot.matches(stateKey))
  );

  // Reset navigation flag when location changes (user navigates manually)
  useEffect(() => {
    hasNavigated.current = false;
  }, [location.pathname]);

  // Safe navigation helper with deduplication
  const navigateToRoute = (route: string) => {
    // Prevent navigation if:
    // 1. Already at the target route
    // 2. Already navigated in this render cycle
    // 3. State hasn't actually changed
    if (
      location.pathname === route ||
      hasNavigated.current ||
      previousState.current === currentStateValue
    ) {
      return;
    }

    hasNavigated.current = true;
    previousState.current = currentStateValue as string;

    // Use requestAnimationFrame for smoother navigation
    requestAnimationFrame(() => {
      startTransition(() => {
        navigate(route, { replace: true });
      });
    });
  };
  // var jwtValue ;
  // Handle authentication-based navigation
  useEffect(() => {
    // Async function to check JWT from cookies
    const checkAuthAndNavigate = async () => {
      try {
        // Get JWT from cookie store
        // const cookies = await cookieStore.getAll();
        // const jwtCookie = cookies.find(cookie => cookie.name === 'auth_jwt');
        //  jwtValue = jwtCookie?.value || "";

        console.log("SecurityLayer Check | State:", currentStateValue, "| Loading:", isLoading, "| JWT:", jwt, "| Path:", location.pathname);

        // Skip if still loading
        if (isLoading) {
          hasNavigated.current = false;
          return;
        }

        // Handle authenticated state
        if (currentStateValue === AUTHENTICATED_STATE) {
          // Only redirect if on login/register pages or root
          const isPublicPage = location.pathname === '/' ||
            location.pathname.startsWith('/login') ||
            location.pathname.startsWith('/register');

          if (isPublicPage) {
            console.log("Auth passed on public page. Navigating to home.");
            navigateToRoute(ROUTES.HOME);
          } else {
            console.log("DUYLONG======================");
            console.log("Current state: " + currentStateValue);
            console.log("Auth passed. Staying on protected route:", location.pathname);
          }
        }
        // Handle unauthenticated state
        else if (currentStateValue === UNAUTHENTICATED_STATE) {
          console.log("Auth failed or no JWT. Navigating to login.");
          console.log("Current state: " + currentStateValue);
          navigateToRoute(ROUTES.LOGIN);
        }
        else if (currentStateValue === LOGOUT_STATES) {
          console.log("Auth failed or no JWT. Navigating to login.");


          console.log("Current state: " + currentStateValue);

          navigateToRoute(ROUTES.ENTRY);
        }
      } catch (error) {
        console.error("Error checking auth cookie:", error);
        // Fallback: navigate to login on error
        navigateToRoute(ROUTES.ENTRY);
      }
    };

    checkAuthAndNavigate();
  }, [currentStateValue, isLoading, location.pathname]);

  // Render loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl text-gray-700 bg-gray-100">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
          <p>Checking authentication status...</p>
        </div>
      </div>
    );
  }

  // Render protected content if authenticated
  if (currentStateValue === AUTHENTICATED_STATE) {
    return <Box>{children}</Box>;
  }

  // Fallback: wait for navigation
  return null;
};

export default SecurityLayer;
