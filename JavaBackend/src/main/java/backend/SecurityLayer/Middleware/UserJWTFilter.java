package backend.SecurityLayer.Middleware;

import backend.DataLayer.protocol.Account.AccountDAO;
import backend.SecurityLayer.Authen.JWTUtility;
import backend.SecurityLayer.Authen.UserService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component

public class UserJWTFilter extends OncePerRequestFilter {

    private final JWTUtility jwtUtility;
    private UserService userDetailsService;
    private final AccountDAO accountDAO;

    // Dependencies are injected via the constructor

    public UserJWTFilter(JWTUtility jwtUtility, AccountDAO accountDAO, UserService userDetailsService) {
        this.jwtUtility = jwtUtility;
        this.userDetailsService = userDetailsService;
        // UserDetails userDetails=
        // userDetailsService.loadUserByUsername(accountEntity.getUserName());
        this.accountDAO = accountDAO;

    }

    @Override
    public void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain) throws ServletException, IOException {

        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String username;

        // 1. Check for JWT existence and format (Authorization: Bearer <token>)
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            // filterChain.doFilter(request, response);
            return; // Continue without authentication if no token is found
        }

        jwt = authHeader.substring(7);

        System.out.println("Request JWT: " + jwt);
        try {

            // 2. Extract Username/Subject from the token
            username = jwtUtility.extractUsername(jwt);

            // 3. Validate Token and Authenticate User
            // Check if username is present and not already authenticated
            if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {

                // Load UserDetails (including roles) using the username
                UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);

                // Validate the token against the loaded user details
                if (jwtUtility.validateToken(jwt, userDetails)) {

                    // Create an Authentication token
                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                            userDetails,
                            null,
                            userDetails.getAuthorities());

                    // Set Authentication in the SecurityContext
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                }
            }
        } catch (Exception e) {
            // Log the error (e.g., token expired, signature invalid)
            System.err.println("JWT Validation failed: " + e.getMessage());
            // Optionally clear context on error, though it shouldn't be set yet if
            // validation failed
            SecurityContextHolder.clearContext();
        }

        filterChain.doFilter(request, response);
    }

}