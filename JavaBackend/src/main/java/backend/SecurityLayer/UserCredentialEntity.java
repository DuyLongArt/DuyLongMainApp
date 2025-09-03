package backend.SecurityLayer;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/**
 * USER CREDENTIALS - Temporary login data submitted by user
 * This is what the user PROVIDES during login attempt
 */
public class UserCredentialEntity implements  UserCredentialStructure {

    @NotBlank(message = "Username is required")
    private String username;

    @NotBlank(message = "Password is required")
    @Size(min = 6, message = "Password must be at least 6 characters")
    private String password;

    private boolean rememberMe = false;

    // Optional: additional authentication factors
    private String twoFactorCode;
    private String deviceId;
    private String ipAddress;

    // Constructors
    public UserCredentialEntity() {}

    public UserCredentialEntity(String username, String password) {
        this.username = username;
        this.password = password;
    }

    // Getters and Setters
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getPassword() { return password; }

    @Override
    public boolean getRememberMe()
    {
        return false;
    }

    @Override
    public String getDeviceid()
    {
        return "";
    }

    public void setPassword(String password) { this.password = password; }

    public boolean isRememberMe() { return rememberMe; }
    public void setRememberMe(boolean rememberMe) { this.rememberMe = rememberMe; }

    public String getTwoFactorCode() { return twoFactorCode; }
    public void setTwoFactorCode(String twoFactorCode) { this.twoFactorCode = twoFactorCode; }

    public String getDeviceId() { return deviceId; }
    public void setDeviceId(String deviceId) { this.deviceId = deviceId; }

    public String getIpAddress() { return ipAddress; }
    public void setIpAddress(String ipAddress) { this.ipAddress = ipAddress; }

    /**
     * Security method - clear sensitive data after use
     */
    public void clearSensitiveData() {
        this.password = null;
        this.twoFactorCode = null;
    }

    @Override
    public String toString() {
        return "UserCredentials{" +
                "username='" + username + '\'' +
                ", rememberMe=" + rememberMe +
                ", deviceId='" + deviceId + '\'' +
                // NEVER include password in toString!
                '}';
    }
}