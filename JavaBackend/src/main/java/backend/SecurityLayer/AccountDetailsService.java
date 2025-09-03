
package backend.SecurityLayer;

import backend.DataLayer.protocol.Account.AccountDAO;
import backend.DataLayer.protocol.Account.AccountEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service("customUserDetailsService")

@Transactional(readOnly = true)
public class AccountDetailsService implements UserDetailsService {

//    private static final Logger logger = LoggerFactory.getLogger(CustomUserDetailsService.class);

    private final AccountEntity accountEntity;
    private final AccountDAO accountDAO;

    // Constructor injection (recommended over @Autowired)
    public CustomUserDetailsService(AccountDAO accountDAO) {
        this.accountEntity = accountDAO;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        logger.debug("Attempting to load user: {}", username);

        if (username == null || username.trim().isEmpty()) {
            logger.warn("Username is null or empty");
            throw new UsernameNotFoundException("Username cannot be null or empty");
        }

        try {
            AccountEntity account = accountEntity.findByUsername(username.trim())
                    .orElseThrow(() -> {
                        logger.warn("User not found: {}", username);
                        return new UsernameNotFoundException("User not found: " + username);
                    });

            logger.debug("Successfully loaded user: {}", username);
            return account; // Account must implement UserDetails

        } catch (Exception e) {
            logger.error("Error loading user: {}", username, e);
            throw new UsernameNotFoundException("Error loading user: " + username, e);
        }
    }

    /**
     * Alternative method to load user by email
     */
    public AccountEntity loadUserByEmail(String email) throws UsernameNotFoundException {
        logger.debug("Attempting to load user by email: {}", email);

        if (email == null || email.trim().isEmpty()) {
            logger.warn("Email is null or empty");
            throw new UsernameNotFoundException("Email cannot be null or empty");
        }

        try {
            AccountEntity account = accountEntity.findByEmail(email.trim())
                    .orElseThrow(() -> {
                        logger.warn("User not found by email: {}", email);
                        return new UsernameNotFoundException("User not found: " + email);
                    });

            logger.debug("Successfully loaded user by email: {}", email);
            return account;

        } catch (Exception e) {
            logger.error("Error loading user by email: {}", email, e);
            throw new UsernameNotFoundException("Error loading user by email: " + email, e);
        }
    }
}