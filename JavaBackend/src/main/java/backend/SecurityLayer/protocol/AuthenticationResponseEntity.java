package backend.SecurityLayer;

import backend.DataLayer.protocol.Account.AccountEntity;

public class AuthenticationResponseEntity
{

    public AuthenticationResponseEntity(AccountEntity account)
    {
        this.accountEntity = account;
    }
    private final AccountEntity accountEntity;
    String getAccessToken()
    {
        return null;
    }

//    String getRefreshToken();
//    String getTokenType();
//    long getExpiresIn();

    String getInformation()
    {
        return accountEntity.getAllInformation();
    }
}
