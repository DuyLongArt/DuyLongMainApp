package backend.SecurityLayer;

import backend.DataLayer.protocol.Account.AccountEntity;

public class AuthenticationResponseEntity
{
    public AuthenticationResponseEntity(AccountEntity account)
    {
        this.account = account;
    }
    private AccountEntity account;
    String getAccessToken()
    {
        return null;
    }

//    String getRefreshToken();
//    String getTokenType();
//    long getExpiresIn();

    String getInformation()
    {
        return account.getInformation();
    }
}
