
package backend.SecurityLayer.protocol;

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
   
    private RoleTypes role;
    private String email;
    private String firstName;
    private String lastName;

    private String bio;
    public RegistrationCredentials() {
    }

    public RegistrationCredentials(String userName, String password, RoleTypes role, String email, String firstName,
                                   String bio,
                                   String lastName) {
        this.userName = userName;
        this.password = password;
        this.role = role;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.bio = bio;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public RoleTypes getRole() {
        return role;
    }

    public void setRole(RoleTypes role) {
        this.role = role;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
}