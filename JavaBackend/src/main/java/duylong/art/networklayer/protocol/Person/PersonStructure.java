package duylong.art.networklayer.protocol.Person;

import java.time.LocalDate;

public interface PersonStructure {

    // Getter methods
    Integer getId();
    String getName();
    LocalDate getBirthday();
    String getSex();

    // Setter methods
    void setId(Integer id);
    void setName(String name);
    void setBirthday(LocalDate birthday);
    void setSex(String sex);
}