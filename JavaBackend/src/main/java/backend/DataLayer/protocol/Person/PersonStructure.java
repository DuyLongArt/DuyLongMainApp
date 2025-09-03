package backend.DataLayer.protocol.Person;

import java.time.LocalDate;

public interface PersonStructure {

    // Getter methods
    Integer getId();
    String getFirstName();

    String getLastName();
    LocalDate getBirthday();
    String getSex();
    String getProfileImageUrl();

    int getAccountId();
    int getRoleId();
    int getMailId();
    int getPhoneId();
    int getAddressId();
    // Setter methods



    void setName(String name);
    void setBirthday(LocalDate birthday);
    void setSex(String sex);
    void setProfileImageUrl(String profileImageUrl);
    void setAddressId(String firstName);
}