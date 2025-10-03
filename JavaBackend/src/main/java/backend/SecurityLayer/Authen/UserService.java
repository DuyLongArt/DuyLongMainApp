package backend.SecurityLayer.Authen;

import backend.DataLayer.protocol.Account.AccountDAO;
import backend.DataLayer.protocol.Account.AccountEntity;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.core.userdetails.User; // Spring Security's built-in UserDetails implementation
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService implements UserDetailsService {

    private final AccountDAO accountDAO;

    public UserService(AccountDAO accountDAO) {
        this.accountDAO = accountDAO;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        // 1. Fetch the custom entity from the database
        AccountEntity accountEntity = accountDAO.findAccountEntitiesByUserName(username);

        if (accountEntity == null) {
            throw new UsernameNotFoundException("User not found: " + username);
        }

        // 2. Map the AccountEntity to a Spring Security UserDetails object

        // A. Convert the custom roles into a List of GrantedAuthority
        // Assuming your AccountEntity has a simple role string or a list of roles
        List<String> roles = Collections.singletonList(accountEntity.getRole()); // Example: ["ADMIN"] or ["USER"]

        List<SimpleGrantedAuthority> authorities = roles.stream()
                .map(role -> new SimpleGrantedAuthority(role))
                .collect(Collectors.toList());

        // B. Create and return the UserDetails object
        return new User(
                accountEntity.getUserName(),
                accountEntity.getPassword(), // The stored (hashed) password
                accountEntity.isEnabled(),   // Boolean flag for enabled status
                true, // accountNonExpired
                true, // credentialsNonExpired
                true, // accountNonLocked
                authorities // The list of roles/authorities
        );
    }
}