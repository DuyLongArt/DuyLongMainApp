package backend.DataLayer.protocol.Credential;

public interface CredentialStructure
{
    String getUsername();

    String getPassword();
    boolean getRememberMe();
    String getDeviceid();
    String getIpAddress();
    //optionanl field

}
