package duylong.art.networklayer.protocol.Mail;

import duylong.art.networklayer.protocol.Person.PersonEntity;

public interface MailStructure
{

    // ID methods
    Integer getId();

    void setId(Integer id);

    // Mail methods
    String getMail();

    void setMail(String mail);

    // Person relationship methods
    PersonEntity getPerson();

    void setPerson(PersonEntity person);

    // Type methods
    String getType();

    void setType(String type);
}