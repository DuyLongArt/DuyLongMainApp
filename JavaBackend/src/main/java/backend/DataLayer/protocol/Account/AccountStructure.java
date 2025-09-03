package backend.DataLayer.protocol.Account;

import java.time.LocalDateTime;
import java.util.regex.Pattern;

/**
 * Core account structure interface defining user account properties and operations.
 * Implementations should ensure proper validation and security practices.
 */
public interface AccountStructure   {

    // Email validation pattern
    Pattern EMAIL_PATTERN = Pattern.compile("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$");

    // Username validation pattern (alphanumeric, underscore, hyphen, 3-50 chars)
    Pattern USERNAME_PATTERN = Pattern.compile("^[a-zA-Z0-9_-]{3,50}$");

    /**
     * Gets the unique identifier for this account.
     * @return the account ID
     */
    int getId();

    /**
     * Gets the username for this account.
     * @return the username, never null
     */
    String getUserName();

    /**
     * Gets the email address associated with this account.
     * @return the email address, never null
     */
    String getMail();

    /**
     * Gets the encrypted password hash for this account.
     * @return the password hash, never null
     */
    String getPassword();

    /**
     * Gets the role assigned to this account.
     * @return the role (e.g., "USER", "ADMIN", "MODERATOR")
     */
    String getRole();

    /**
     * Gets the account creation timestamp.
     * @return when the account was created
     */
    LocalDateTime getCreatedAt();

    /**
     * Gets the last modification timestamp.
     * @return when the account was last updated
     */
    LocalDateTime getUpdatedAt();

    LocalDateTime getLastLogin();
    /**
     * Sets the account ID.
     * @param id the unique identifier
     */
    void setId(int id);

    /**
     * Sets the username.
     * @param userName the username to set
     * @throws IllegalArgumentException if username is invalid
     */
    void setUserName(String userName);
    String getFullName();
    /**
     * Sets the email address.
     * @param mail the email address to set
     * @throws IllegalArgumentException if email format is invalid
     */
    void setMail(String mail);

    /**
     * Sets the password hash.
     * @param password the encrypted password hash
     * @throws IllegalArgumentException if password is null or empty
     */
    void setPassword(String password);

    /**
     * Sets the user role.
     * @param role the role to assign
     * @throws IllegalArgumentException if role is invalid
     */
    void setRole(String role);

    /**
     * Sets the creation timestamp.
     * @param createdAt when the account was created
     */
    void setCreatedAt(LocalDateTime createdAt);

    /**
     * Sets the last update timestamp.
     * @param updatedAt when the account was last modified
     */
    void setUpdatedAt(LocalDateTime updatedAt);

    /**
     * Validates if the username meets requirements.
     * @param userName the username to validate
     * @return true if username is valid
     */
    default boolean isValidUserName(String userName) {
        return userName != null && USERNAME_PATTERN.matcher(userName).matches();
    }

    /**
     * Validates if the email format is correct.
     * @param email the email to validate
     * @return true if email format is valid
     */
    default boolean isValidEmail(String email) {
        return email != null && EMAIL_PATTERN.matcher(email).matches();
    }

    /**
     * Checks if the account has all required fields properly set.
     * @return true if account is complete and valid
     */
    default boolean isValid() {
        return getId() > 0 &&
                isValidUserName(getUserName()) &&
                isValidEmail(getMail()) &&
                getPassword() != null && !getPassword().trim().isEmpty() &&
                getRole() != null && !getRole().trim().isEmpty() &&
                getCreatedAt() != null;
    }

    /**
     * Checks if the account is active (created and not in future).
     * @return true if account creation date is valid and not in future
     */
    default boolean isActive() {
        LocalDateTime now = LocalDateTime.now();
        return getCreatedAt() != null &&
                !getCreatedAt().isAfter(now) &&
                (getUpdatedAt() == null || !getUpdatedAt().isBefore(getCreatedAt()));
    }

    /**
     * Updates the last modified timestamp to current time.
     */
    default void touch() {
        setUpdatedAt(LocalDateTime.now());
    }

    /**
     * Checks if the account has administrative privileges.
     * @return true if role indicates admin access
     */
    default boolean isAdmin() {
        String role = getRole();
        return role != null &&
                (role.equalsIgnoreCase("ADMIN") ||
                        role.equalsIgnoreCase("ADMINISTRATOR") ||
                        role.equalsIgnoreCase("ROOT"));
    }

    /**
     * Gets the account age in days since creation.
     * @return number of days since account was created, or -1 if creation date is null
     */
    default long getAccountAgeInDays() {
        if (getCreatedAt() == null) return -1;
        return java.time.temporal.ChronoUnit.DAYS.between(getCreatedAt(), LocalDateTime.now());
    }

    /**
     * Creates a safe display string without sensitive information.
     * @return user-safe representation of the account
     */
    default String toSafeString() {
        return String.format("Account{id=%d, userName='%s', mail='%s', role='%s', created=%s}",
                getId(),
                getUserName(),
                maskEmail(getMail()),
                getRole(),
                getCreatedAt()
        );
    }

    /**
     * Masks email address for safe display.
     * @param email the email to mask
     * @return masked email (e.g., "j***@example.com")
     */
    default String maskEmail(String email) {
        if (email == null || !email.contains("@")) return "***";

        String[] parts = email.split("@");
        String localPart = parts[0];
        String domain = parts[1];

        if (localPart.length() <= 2) {
            return "*".repeat(localPart.length()) + "@" + domain;
        }

        return localPart.charAt(0) + "*".repeat(localPart.length() - 2) +
                localPart.charAt(localPart.length() - 1) + "@" + domain;
    }



     String getInformation();


}