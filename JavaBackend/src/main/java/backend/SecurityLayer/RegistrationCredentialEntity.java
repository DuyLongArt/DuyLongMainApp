package backend.SecurityLayer;

public class RegistrationCredentialEntity
{
    private String username;
    private String password;
    private String email;
    private String phone;
    private String fullname;
    private String firstName;
    private String lastName;
    public RegistrationCredentialEntity(String username, String password, String email, String phone, String firstName, String lastName)
    {
        this.username = username;
        this.password = password;
        this.email = email;
        this.phone = phone;
//        this.fullname = fullname;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    public String getUsername()
    {
        return username;
    }

    public String getPassword()
    {
        return password;
    }

    public String getEmail()
    {
        return email;
    }

    public String getPhone()
    {
        return phone;
    }

    public String getFirstName()
    {
        return firstName;
    }
    public String getLastName()
    {
        return lastName;
    }

    public void clearSensitiveData()
    {
        this.password = null;
        this.phone = null;
        this.email = null;
//        this.fullname = null;
        this.firstName = null;
        this.lastName = null;
        this.username = null;
    }
}
