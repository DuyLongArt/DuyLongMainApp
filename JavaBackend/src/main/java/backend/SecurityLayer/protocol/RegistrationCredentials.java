
package backend.SecurityLayer;

import backend.DataLayer.protocol.Credential.Credential;
import backend.DataLayer.protocol.RoleTypes;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegistrationCredentials implements Credential
{

    private String userName;
    private String password;
    private String deviceIP;
    private String device;
    private RoleTypes role;
    private String email;
    private String firstName;
    private String lastName;

}