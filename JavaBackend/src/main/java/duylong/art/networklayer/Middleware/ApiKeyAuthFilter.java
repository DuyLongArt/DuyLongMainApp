package duylong.art.networklayer.Middleware;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component // Registers the filter as a Spring bean
public class ApiKeyAuthFilter implements Filter {

    private static final String API_KEY_HEADER = "X-API-KEY";
    private static final String EXPECTED_API_KEY = "my-secret-key";

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest httpRequest = (HttpServletRequest) request;
        HttpServletResponse httpResponse = (HttpServletResponse) response;

        // Get the API key from the request header
        String apiKey = httpRequest.getHeader(API_KEY_HEADER);

        // Check if the API key is present and valid
        if (EXPECTED_API_KEY.equals(apiKey)) {
            // Key is valid, so let the request proceed to the next filter or controller
            chain.doFilter(request, response);
        } else {
            // Key is invalid or missing, block the request
            httpResponse.setStatus(HttpServletResponse.SC_FORBIDDEN); // Set 403 Forbidden status
            httpResponse.getWriter().write("Error: Invalid or Missing API Key.");
            // IMPORTANT: Do NOT call chain.doFilter() here
        }
    }
}