package duylong.art.networklayer.protocol.Mail;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface MailDAO extends CrudRepository<MailEntity, Integer>
{

    @Query("SELECT m.mail FROM MailEntity m WHERE m.id=:id")
    String findMailById(Integer id);
    @Query("SELECT m.mail FROM MailEntity m WHERE m.person.id = :id")
    String findMailByPersonId(Integer id);
}
