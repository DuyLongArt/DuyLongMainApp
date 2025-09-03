package backend.DataLayer.protocol.Person;
import backend.DataLayer.protocol.Account.AccountEntity;
import jakarta.persistence.*;

import java.time.LocalDate;
@Entity

@Table(name = "persons" ,schema = "person_improve")

public class PersonEntity implements PersonStructure
{
    @Id
    @Column(name = "person_id", nullable = false)
    private Integer person_id;


    @Column(name = "full_name", length = 100, nullable = false)
    private String fullName;

    @Column(name = "first_name", length = 100, nullable = false)
    private String firstName;

    @Column(name = "last_name", length = 100, nullable = false)
    private String lastName;

    @Column(name = "birthday")
    private LocalDate birthday;

    @Column(name = "sex", length = 15)
    private String sex;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "accounts", referencedColumnName = "account_id")
    private AccountEntity accounts;



    public Integer getId()
    {
        return id;
    }

    public void setId(Integer id)
    {
        this.id = id;
    }

    public String getFullName()
    {
        return this.fullName;
    }

    public void setFullName(String fullName)
    {
        this.fullName = fullName;
    }

    public LocalDate getBirthday()
    {
        return birthday;
    }

    public void setBirthday(LocalDate birthday)
    {
        this.birthday = birthday;
    }

    public String getSex()
    {
        return sex;
    }

    @Override
    public String getProfileImageUrl()
    {
        return "";
    }

    @Override
    public int getAccountId()
    {
        return 0;
    }

    @Override
    public int getRoleId()
    {
        return 0;
    }

    @Override
    public int getMailId()
    {
        return 0;
    }

    @Override
    public int getPhoneId()
    {
        return 0;
    }

    @Override
    public int getAddressId()
    {
        return 0;
    }

    @Override
    public void setName(String name)
    {

    }

    public void setSex(String sex)
    {
        this.sex = sex;
    }

    @Override
    public void setProfileImageUrl(String profileImageUrl)
    {

    }

    @Override
    public void setAddressId(String firstName)
    {

    }

    public String getFirstName(){
        return firstName;
    }

    public void setFirstName(String firstName)
    {
        this.firstName = firstName;
    }
    public String getLastName(){
        return lastName;
    }
    public void setLastName(String lastName)
    {
        this.lastName = lastName;
    }
}

