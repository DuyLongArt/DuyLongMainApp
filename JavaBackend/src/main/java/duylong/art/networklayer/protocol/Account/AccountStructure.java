package duylong.art.networklayer.protocol.Account;


import java.time.LocalDateTime;

public interface Account
{

    int getId();

    String getUserName();

    String getMail();

    String getPassword();

    String getRole();

    LocalDateTime getCreatedAt();

    LocalDateTime getUpdatedAt();
}