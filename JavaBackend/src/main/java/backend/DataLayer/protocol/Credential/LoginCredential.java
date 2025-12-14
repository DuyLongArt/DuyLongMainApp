package backend.DataLayer.protocol.Credential;


import backend.DataLayer.protocol.RoleTypes;

import java.time.LocalDateTime;

public interface Credential
{
    String getUserName();
    String getPassword(); // Assuming this is also defined
    String getDevice();
    String getDeviceIP();

    RoleTypes getRole();

    default String jsonWebToken() { return ""; }
    //optionanl field

    default LocalDateTime createdAt() { return LocalDateTime.now(); }
}
