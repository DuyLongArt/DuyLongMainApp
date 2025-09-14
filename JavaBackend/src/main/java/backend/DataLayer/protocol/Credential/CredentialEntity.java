package backend.DataLayer.protocol.Credential;

import jakarta.persistence.Entity;

@Entity
public class CredentialEntity implements CredentialStructure
{
    private String username;
    private String password;
    private boolean rememberMe;
    private String deviceid;
    private String ipAddress;
    private String accessJWT;
    public CredentialEntity(String username, String password, boolean rememberMe, String deviceid, String ipAddress)
    {
        this.username = username;
        this.password = password;
        this.rememberMe = rememberMe;
        this.deviceid = deviceid;
        this.ipAddress = ipAddress;
    }

    public String getUsername()
    {
        return username;
    }

    public String getPassword()
    {
        return password;
    }

    public boolean getRememberMe()
    {
        return rememberMe;
    }

    public String getDeviceid()
    {
        return deviceid;
    }

    public String getIpAddress()
    {
        return ipAddress;
    }

    public String getAccessJWT()
    {
        return accessJWT;
    }



    public void setAccessJWT(String accessJWT)
    {
        this.accessJWT = accessJWT;
    }
}
