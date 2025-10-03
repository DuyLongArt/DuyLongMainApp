package backend.DataLayer.protocol.Mail;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface MailDAO extends CrudRepository<MailEntity, Integer>
{

    @Query("SELECT m.mail FROM MailEntity m WHERE m.mail_id=:id")
    String findMailById(Integer id);
    @Query("SELECT m.mail FROM MailEntity m WHERE m.person.person_id = :id")
    String findMailByPersonId(Integer id);
}
