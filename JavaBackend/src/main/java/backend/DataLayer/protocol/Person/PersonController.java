package backend.DataLayer.protocol.Person;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/backend/person/")

public class PersonController
{
    @Autowired
    private PersonDAO personDAO;
//    @org.springframework.transaction.annotation.Transactional(readOnly = true)
    @Transactional
    @GetMapping("information")
    public ResponseEntity<PersonEntity> getInformation(@AuthenticationPrincipal UserDetails userDetails)
    {

        String currentUsername = userDetails.getUsername();

        // Now find the person based on the username/email instead of ID 1
//        PersonEntity person = personDAO.(currentUsername).orElse(null);
        PersonEntity person=personDAO.findPersonEntityByUserName(currentUsername);
//        return ResponseEntity.ok(person);
        return ResponseEntity.ok(person);
    }

}
