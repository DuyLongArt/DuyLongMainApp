package backend.DataLayer.protocol.Credential;

import backend.DataLayer.protocol.Role.RoleEntity;
import backend.SecurityLayer.JWTEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping
@PreAuthorize("hasAnyRole('ADMIN', 'USER')")
public class CredentialController
{
    JWTEntity jwtEntity = new JWTEntity();
    jwtEntity.generateToken();
}