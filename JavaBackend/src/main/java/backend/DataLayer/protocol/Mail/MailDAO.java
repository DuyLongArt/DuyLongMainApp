package backend.DataLayer.protocol.Mail;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface MailDAO extends CrudRepository<EmailEntity, Integer>
{

    @Query("SELECT m.emailAddress FROM EmailEntity m WHERE m.id=:id")
    String findMailById(Integer id);
//    @Query("SELECT m.emailAddress FROM EmailEntity m WHERE m.person.identity_id = :id")
//    String findMailByPersonId(Integer id);
}
