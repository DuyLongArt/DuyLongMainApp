package duylong.art.javabackend.Mail;

import duylong.art.javabackend.Person.PersonEntity;
import jakarta.persistence.*;

@Entity
@Table(name="person_mail")
public class MailEntity
{

    @Id
    @Column(name="id")
    private Integer id;

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
