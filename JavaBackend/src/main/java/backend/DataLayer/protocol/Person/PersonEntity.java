package backend.DataLayer.protocol.Person;
import backend.DataLayer.protocol.Account.AccountEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.hibernate.annotations.ColumnDefault;

import java.time.Instant;
import java.time.LocalDate;
@Entity

@Table(name = "persons" ,schema = "users")

public class PersonEntity implements PersonStructure
{
    @Id
    @Column(name = "identity_id", nullable = false)
    private Integer identity_id;


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
    @JoinColumn(name = "accounts", referencedColumnName = "identity_id")
    private AccountEntity accounts;

    @Column(name = "date_of_birth")
    private Instant dateOfBirth;

    @Column(name = "gender", length = Integer.MAX_VALUE)
    private String gender;

    @Size(max = 20)
    @Column(name = "phone_number", length = 20)
    private String phoneNumber;

    @Column(name = "profile_image_url", length = Integer.MAX_VALUE)
    private String profileImageUrl;

    @NotNull
    @ColumnDefault("true")
    @Column(name = "is_active", nullable = false)
    private Boolean isActive = false;

    @NotNull
    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "created_at", nullable = false)
    private Instant createdAt;

    @NotNull
    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;

    public Instant getUpdatedAt()
    {
        return updatedAt;
    }

    public void setUpdatedAt(Instant updatedAt)
    {
        this.updatedAt = updatedAt;
    }

    public Instant getCreatedAt()
    {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt)
    {
        this.createdAt = createdAt;
    }

    public Boolean getIsActive()
    {
        return isActive;
    }

    public void setIsActive(Boolean isActive)
    {
        this.isActive = isActive;
    }



    public void setProfileImageUrl(String profileImageUrl)
    {
        this.profileImageUrl = profileImageUrl;
    }

    public String getPhoneNumber()
    {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber)
    {
        this.phoneNumber = phoneNumber;
    }

    public String getGender()
    {
        return gender;
    }

    public void setGender(String gender)
    {
        this.gender = gender;
    }

    public Instant getDateOfBirth()
    {
        return dateOfBirth;
    }

    public void setDateOfBirth(Instant dateOfBirth)
    {
        this.dateOfBirth = dateOfBirth;
    }


    public Integer getId()
    {
        return identity_id;
    }

    public void setId(Integer id)
    {
        this.identity_id = id;
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

