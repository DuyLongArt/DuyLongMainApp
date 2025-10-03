package backend.SecurityLayer;

import backend.DataLayer.protocol.Account.AccountEntity;
import backend.DataLayer.protocol.Credential.LoginCredential;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
@ComponentScan(basePackages = "backend.DataLayer.protocol")
public class JWTUtility
{

    @Value("${app.jwt.secret}")
    private String secret;

    @Value("${app.jwt.expiration}")
    private Long jwtExpiration;

    @Value("${app.jwt.refresh-expiration}")
    private Long refreshExpiration;

    /**
     * Get secret key for signing JWT tokens
     */
    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(secret.getBytes());
    }

    /**
     * Extract username from JWT token
     */
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    /**
     * Extract expiration date from JWT token
     */
    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    /**
     * Extract specific claim from JWT token
     */
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    /**
     * Extract all claims from JWT token
     */

    private Claims extractAllClaims(String token) {
        try {
            return Jwts.parser()
                    .setSigningKey(getSigningKey())
                    .parseClaimsJwt(token).getBody();

        } catch (ExpiredJwtException e) {
            throw new RuntimeException("JWT token is expired", e);
        } catch (UnsupportedJwtException e) {
            throw new RuntimeException("JWT token is unsupported", e);
        } catch (MalformedJwtException e) {
            throw new RuntimeException("JWT token is malformed", e);
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("JWT token compact of handler are invalid", e);
        }
    }

    /**
     * Check if JWT token is expired
     */
    private boolean isTokenExpired(String token) {
        return (boolean) extractExpiration(token).before(new Date());
    }

    /**
     * Generate JWT token for user
     */
    public String generateToken(LoginCredential loginCredential) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("device", loginCredential.getDevice());
        claims.put("ip", loginCredential.getDeviceIP());
        claims.put("role", loginCredential.getRole().toString());

        return createToken(claims, loginCredential.getUserName(), jwtExpiration);
    }

    /**
     * Generate refresh token for user
     */
    public String generateRefreshToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("type", "refresh");
        return createToken(claims, userDetails.getUsername(), refreshExpiration);
    }

    /**
     * Create JWT token with claims and expiration
     */


    private String createToken(Map<String, Object> claims, String subject, Long expiration) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + expiration);

        return Jwts.builder()

                .addClaims(claims)
                .setSubject(subject)// Add all claims from the map// Set the subject
                .setIssuedAt(now)                     // Set issued at
                .setExpiration(expiryDate)            // Set expiration
                .signWith(getSigningKey())         // Sign with key (remove the empty .signWith())
                .compact();
    }

    /**
     * Validate JWT token
     */
    public boolean validateToken(String token, AccountEntity accountEntity) {
        try {
            final String username = extractUsername(token);
            return (username.equals(accountEntity.getUserName()) && !isTokenExpired(token));
        } catch (Exception e) {
            return false;
        }
    }

    /**
     * Validate JWT token without UserDetails
     */
    public boolean validateToken(String token) {
        try {
            extractAllClaims(token);
            return  !(isTokenExpired(token));
        } catch (Exception e) {
            return false;
        }
    }

    /**
     * Get remaining time until token expiration
     */
    public Long getExpirationTime(String token) {
        Date expiration = extractExpiration(token);
        return (Long) (expiration.getTime() - new Date().getTime());
    }
}