package backend.DataLayer.protocol.Credential;

import backend.DataLayer.protocol.RoleTypes;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

// Note: Assuming 'Credential' is an interface that defines the getter methods
// and is located in the same package structure 'backend.DataLayer.protocol.Credential'.

@Setter
@Getter

public class LoginCredential implements Credential
{

    // Lombok will generate:
    // public String getUsername() { return this.username; }
    // public void setUsername(String username) { this.username = username; }
    private String userName;

    // Lombok will generate:
    // public String getPassword() { return this.password; }
    // public void setPassword(String password) { this.password = password; }
    private String password;
    private RoleTypes role;

    // Lombok will generate:
    // public String getDevice() { return this.device; }
    // public void setDevice(String device) { this.device = device; }
    private String device;

    // Lombok will generate:
    // public String getDeviceIP() { return this.deviceIP; }
    // public void setDeviceIP(String deviceIP) { this.deviceIP = deviceIP; }
    private String deviceIP;

    private LocalDateTime createdAt;

    private String jsonWebToken;


    // Remove the manual override methods here to let Lombok do its job!
    // @Override
    // public String getUserName() { return ""; }
    // @Override
    // public String getDevice() { return ""; }
    // @Override
    // public String getDeviceIP() { return ""; }
}