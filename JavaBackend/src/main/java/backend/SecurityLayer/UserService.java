package backend.SecurityLayer;
import backend.DataLayer.protocol.Account.AccountEntity;
import backend.DataLayer.protocol.Account.AccountDAO;
import backend.DataLayer.protocol.RoleTypes;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

/**
 * USER SERVICES - Business logic layer for user operations
 *
 * PURPOSE: Handle business rules, validation, and orchestrate data operations
 * RESPONSIBILITIES:
 * - Authentication logic
 * - User registration and management
 * - Security rules enforcement
 * - Coordinate between credentials input and DAO storage
 */
@Service
@Transactional
public class UserService {

    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    // Dependencies
    private final AccountDAO accountDAO;           // Data access
    private final AuthenticationManager authManager; // Spring Security
    private final PasswordEncoder passwordEncoder;   // Password hashing
    private final JWTService jwtServiceUtil;                   // Token generation

    public UserService(AccountDAO accountDAO,
                       AuthenticationManager authManager,
                       PasswordEncoder passwordEncoder,
                       JWTService jwtServiceUtil) {
        this.accountDAO = accountDAO;
        this.authManager = authManager;
        this.passwordEncoder = passwordEncoder;
        this.jwtServiceUtil = jwtServiceUtil;

    }

    /**
     * AUTHENTICATE USER - Coordinates credentials with DAO
     */
    public AuthenticationResponseEntity authenticate(UserCredentialEntity credentials) {
        logger.info("Authentication attempt for user: {}", credentials.getUsername());

        try {
            // 1. Validate credentials input
            validateCredentials(credentials);

            // 2. Check user status via DAO BEFORE authentication
            AccountEntity account = accountDAO.findByUsername(credentials.getUsername())
                    .orElseThrow(() -> new BadCredentialsException("User not found"));


            checkAccountStatus(account);

            // 3. Perform authentication using credentials
            Authentication authToken = new UsernamePasswordAuthenticationToken(
                    credentials.getUsername(),
                    credentials.getPassword()
            );

            Authentication authResult = authManager.authenticate(authToken);

            // 4. Post-authentication: Update user data via DAO
            updateUserAfterSuccessfulLogin(account, credentials);

            // 5. Generate response
            String accessToken = jwtServiceUtil.generateToken((UserDetails) authResult.getPrincipal());
            String refreshToken = jwtServiceUtil.generateRefreshToken((UserDetails) authResult.getPrincipal());

            // 6. Clear sensitive credential data
            credentials.clearSensitiveData();

            logger.info("Authentication successful for user: {}", credentials.getUsername());

            return new AuthenticationResponseEntity(
                    account
            );

        } catch (Exception e) {
            // Handle failed authentication
            handleFailedAuthentication(credentials.getUsername());
            credentials.clearSensitiveData();

            logger.warn("Authentication failed for user: {}", credentials.getUsername());
            throw new BadCredentialsException("Authentication failed", e);
        }
    }

    /**
     * REGISTER NEW USER - Create user from credentials
     */
    public UserRegistrationResponseEntity registerUser(RegistrationCredentialEntity credentials) {
        logger.info("Registration attempt for user: {}", credentials.getUsername());

        // 1. Validate registration credentials
        validateRegistrationCredentials(credentials);

        // 2. Check if user already exists via DAO
        if (accountDAO.existsByUsername(credentials.getUsername())) {
            throw new RuntimeException("Username already exists");
        }

        if (accountDAO.existsByEmail(credentials.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        // 3. Create new account entity from credentials
        AccountEntity newAccount = createAccountFromCredentials(credentials);

        // 4. Save via DAO
        AccountEntity savedAccount = accountDAO.save(newAccount);

        // 5. Clear sensitive data
        credentials.clearSensitiveData();

        logger.info("User registered successfully: {}", credentials.getUsername());

        return new UserRegistrationResponse(
                "User registered successfully",
                savedAccount.getUsername(),
                savedAccount.getEmail()
        );
    }

    /**
     * GET USER PROFILE - Service method using DAO
     */


    @Transactional(readOnly = true)
    public UserProfileResponse getUserProfile(String username) {
        logger.debug("Getting profile for user: {}", username);

        AccountEntity account = accountDAO.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found: " + username));

        return new UserProfileResponse(account);
    }

    /**
     * UPDATE USER PROFILE - Service method coordinating updates
     */
    public UserProfileResponse updateUserProfile(String username, UserProfileUpdateRequest updateRequest) {
        logger.info("Updating profile for user: {}", username);

        AccountEntity account = accountDAO.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found: " + username));

        // Apply updates to entity
        updateAccountFromRequest(account, updateRequest);

        // Save via DAO
        AccountEntity updatedAccount = accountDAO.save(account);

        return new UserProfileResponse(updatedAccount);
    }

    /**
     * GET USER STATISTICS - Service method using DAO
     */
    @Transactional(readOnly = true)
    public UserStatistics getUserStatistics() {
        logger.debug("Generating user statistics");

        Long totalUsers = accountDAO.countTotalUsers();
        Long activeUsers = accountDAO.countActiveUsers();
        Long adminUsers = accountDAO.countUsersByRole(RoleTypes.ADMIN);
        List<Account> recentUsers = accountDAO.findRecentlyActiveUsers(
                LocalDateTime.now().minusDays(30)
        );

        return new UserStatistics(totalUsers, activeUsers, adminUsers, recentUsers.size());
    }

    // ========================================================================================
    // PRIVATE HELPER METHODS - Business logic
    // ========================================================================================

    private void validateCredentials(UserCredentialEntity credentials) {
        if (credentials.getUsername() == null || credentials.getUsername().trim().isEmpty()) {
            throw new IllegalArgumentException("Username is required");
        }

        if (credentials.getPassword() == null || credentials.getPassword().length() < 6) {
            throw new IllegalArgumentException("Password must be at least 6 characters");
        }
    }

    private void validateRegistrationCredentials(RegistrationCredentialEntity credentials) {
        validateCredentials(credentials);

        if (!credentials.isPasswordMatch()) {
            throw new IllegalArgumentException("Passwords do not match");
        }

        if (!credentials.isAcceptTerms()) {
            throw new IllegalArgumentException("Must accept terms and conditions");
        }
    }

    private void checkAccountStatus(AccountEntity account) {
        if (!account.getIsEnabled()) {
            throw new RuntimeException("Account is disabled");
        }

    }

    private void updateUserAfterSuccessfulLogin(AccountEntity account, UserCredentialEntity credentials) {
        account.setLastLogin(LocalDateTime.now());
        account.setFailedLoginAttempts(0);
        account.setLastLoginIp(credentials.getIpAddress());
        account.setLastLoginDevice(credentials.getDeviceId());

        accountDAO.save(account);
    }

    private void handleFailedAuthentication(String username) {
        accountDAO.findByUsername(username).ifPresent(account -> {
            account.incrementFailedLoginAttempts();

            if (account.getFailedLoginAttempts() >= 5) {
                account.lockAccount(30); // Lock for 30 minutes
            }

            accountDAO.save(account);
        });
    }

    private Account createAccountFromCredentials(RegistrationCredentials credentials) {
        AccountEntity account = new Account();
        account.setUsername(credentials.getUsername());
        account.setEmail(credentials.getEmail());
        account.setFirstName(credentials.getFirstName());
        account.setLastName(credentials.getLastName());
        account.setPassword(passwordEncoder.encode(credentials.getPassword()));
        account.addRole(RoleTypes.USER); // Default role

        return account;
    }

    private void updateAccountFromRequest(Account account, UserProfileUpdateRequest request) {
        if (request.getFirstName() != null) {
            account.setFirstName(request.getFirstName());
        }
        if (request.getLastName() != null) {
            account.setLastName(request.getLastName());
        }
        if (request.getEmail() != null) {
            account.setEmail(request.getEmail());
        }

        account.setUpdatedAt(LocalDateTime.now());
    }
}

