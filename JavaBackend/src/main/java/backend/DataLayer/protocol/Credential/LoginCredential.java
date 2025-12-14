package backend.DataLayer.protocol.Credential;

import backend.DataLayer.protocol.RoleTypes;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginCredential implements Credential {
    private String userName;
    private String password;
    private String device;
    private String deviceIP;
    private RoleTypes role;
    private boolean isMock;

    @Override
    public String getUserName() {
        return userName;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getDevice() {
        return device;
    }

    @Override
    public String getDeviceIP() {
        return deviceIP;
    }
}
