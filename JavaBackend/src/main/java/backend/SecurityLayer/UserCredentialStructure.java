package backend.SecurityLayer;

public interface UserCredentialStructure
{
    String getUsername();

    String getPassword();
    boolean getRememberMe();
    String getDeviceid();
    String getIpAddress();
}
