package backend.SecurityLayer;

import backend.DataLayer.protocol.Account.AccountDAO;
import backend.DataLayer.protocol.Account.AccountEntity;
import backend.DataLayer.protocol.Credential.LoginCredential;
import backend.SecurityLayer.Authen.JWTUtility;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

// Remove @Service: A class cannot be both a @Service and a @RestController.
@RestController
// Set a base path for all methods in this controller
//DuyLongWriteMySelf
public class LoginController
{

    AccountDAO accountDAO;
    JWTUtility jwtUtility;

    public LoginController(JWTUtility jwtUtility)
    {

    }


    // The login process requires a POST method to send sensitive credentials.
    // It should accept a request body containing the login credentials.
    @PostMapping("/login")
    public String login(@RequestBody LoginCredential loginCredential)
    {

        // 1. Authenticate the user using a service/manager
        // 2. On success, generate a JWT
        // 3. Return the JWT string or a response object

        if (loginCredential.jsonWebToken().equals(""))
        {

            AccountEntity accountEntity = accountDAO.findAccountEntitiesByUserName(loginCredential.getUserName());
            if (loginCredential.getUserName().equals(accountEntity.getUserName()) && loginCredential.getPassword().equals(accountEntity.getPassword()))
            {
                // Authentication successful, generate JWT
                String newJwt = jwtUtility.generateToken(loginCredential);
                return newJwt;
            } else{
                return "Invalid username or password";
            }
        }else
        {

            return "GO";
        }

    }
}