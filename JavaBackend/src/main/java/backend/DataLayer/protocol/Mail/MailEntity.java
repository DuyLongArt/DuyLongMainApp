package backend.DataLayer.protocol.Mail;

import backend.DataLayer.protocol.Person.PersonEntity;
import jakarta.persistence.*;

@Entity
@Table(name = "person_mail")
public class MailEntity implements MailStructure
{

    @Id
    @Column(name = "mail_id")
    private Integer mail_id;

    @Column(name = "mail", nullable = false)
    private String mail;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "person_id")
    private PersonEntity person;

    @Column(name = "type")
    private String type;

    public String getType()
    {
        return type;
    }

    public void setType(String type)
    {
        this.type = type;
    }

    public PersonEntity getPerson()
    {
        return person;
    }

    public void setPerson(PersonEntity person)
    {
        this.person = person;
    }

    public String getMail()
    {
        return mail;
    }

    public void setMail(String mail)
    {
        this.mail = mail;
    }

    public void setId(Integer id)
    {
        this.id = id;
    }


    public Integer getId()
    {
        return id;
    }
}
