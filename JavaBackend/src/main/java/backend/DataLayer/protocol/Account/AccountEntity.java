package backend.DataLayer.protocol.Account;

import backend.DataLayer.protocol.CreateUpdateTime;
import backend.DataLayer.protocol.Mail.EmailEntity;
import backend.DataLayer.protocol.Person.PersonEntity;
import backend.DataLayer.protocol.RoleTypes;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.ArrayList;

@Entity
@Table(name = "accounts", schema = "users")
@Getter
@Setter
public class AccountEntity implements AccountStructure, CreateUpdateTime
{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Added auto-generation
    @Column(name = "identity_id", nullable = false)
    private int identity_id;


    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mail", referencedColumnName = "email_address_id")
    private EmailEntity EmailEntity;

    @MapsId
    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @ColumnDefault("nextval('users.persons_person_id_seq')")
    @JoinColumn(name = "identity_id", nullable = false)
    private PersonEntity persons;

    @NotNull
    @Column(name = "password_hash", nullable = false, length = Integer.MAX_VALUE)
    private String passwordHash;

    @Column(name = "primary_email_id")
    private Integer primaryEmailId;

    @NotNull
    @ColumnDefault("false")
    @Column(name = "is_locked", nullable = false)
    private Boolean isLocked = false;

    @NotNull
    @ColumnDefault("0")
    @Column(name = "failed_login_attempts", nullable = false)
    private Integer failedLoginAttempts;

    @NotNull
    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "password_changed_at", nullable = false)
    private Instant passwordChangedAt;

    public String getMail(){
        return EmailEntity != null ? EmailEntity.getEmailAddress() : null;
    }
    ArrayList roleList;
    @Column(name = "username", nullable = false, unique = true)
    private String userName;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "first_name", referencedColumnName = "identity_id")
    private PersonEntity personEntity;




    @Column(name = "alias", nullable = false)
    private String alias;

    @Column(name = "passwordhash", nullable = false)
    private String passwordhash;

    @Column(name = "role")
    private String role;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "last_login_at")
    private LocalDateTime lastLoginAt;

    @Column(name = "is_enabled")
    private Boolean isEnabled;

    // Getters
    @Override
    public int getId() {
        return identity_id;
    }

    @Override
    public String getUserName() {
        return userName;
    }



    @Override
    public String getPasswordHash() {
        return passwordhash;
    }

    @Override
    public String getRole() {
        return role.toString();
    }

    @Override
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    @Override
    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    @Override
    public LocalDateTime getLastLogin() {
        return lastLoginAt;
    }

    public Boolean isEnabled() { // Fixed naming convention for boolean getter
        return isEnabled;
    }



    // Setters - Now properly implemented
    @Override
    public void setId(int id) {
        this.identity_id = id;
    }

    @Override
    public void setUserName(String userName) {
        this.userName = userName;
    }

    @Override
    public void setMail(String mail) {
        // Note: This method might not be appropriate since mail comes from EmailEntity
        // Consider removing this from the interface or implementing differently
        // For now, keeping it empty as mail is managed through the relationship
    }
    public void addRole(RoleTypes role)
    {
         roleList=new ArrayList();
        roleList.add(role);
    }

    @Override
    public void setPasswordHash(String value) {
        this.passwordhash = value;
    }

    @Override
    public void setRole(String role) {
        this.role = role;
    }

    @Override
    public void setFullName(String fullName)
    {

    }

    @Override
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    @Override
    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    @Override
    public void setLastLogin(LocalDateTime lastLogin)
    {

    }

    public void setAlias(String alias) {
        this.alias = alias;
    }
    public void setEmail(String email) {
        if (this.EmailEntity == null) {
            this.EmailEntity = new EmailEntity();
        }
        this.EmailEntity.setEmailAddress(email);
    }
    public void setFirstName(String firstName) {
        if (this.personEntity == null) {
            this.personEntity = new PersonEntity();
        }
        this.personEntity.setFirstName(firstName);
    }
    public void setLastName(String lastName) {
        if (this.personEntity == null) {
            this.personEntity = new PersonEntity();
        }
        this.personEntity.setLastName(lastName);
    }
    public void setLastLoginAt(LocalDateTime lastLoginAt) {
        this.lastLoginAt = lastLoginAt;
    }

    public void setEnabled(Boolean enabled) {
        this.isEnabled = enabled;
    }

    // Entity relationship setters
    public void setEmailEntity(EmailEntity EmailEntity) {
        this.EmailEntity = EmailEntity;
    }

    public void setPersonEntity(PersonEntity personEntity) {
        this.personEntity = personEntity;
    }

    // Getters for entity relationships
    public EmailEntity getEmailEntity() {
        return EmailEntity;
    }

    public PersonEntity getPersonEntity() {
        return personEntity;
    }



    // JPA lifecycle methods (optional but recommended)
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
    public String getFullName()
    {
        if (this.personEntity != null)
        {
            String fullName = this.personEntity.getFullName();
            if (fullName != null && !fullName.trim().isEmpty())
            {
                return fullName;
            } else
            {
                String firstName = this.personEntity.getFirstName() != null ? this.personEntity.getFirstName() : "";
                String lastName = this.personEntity.getLastName() != null ? this.personEntity.getLastName() : "";
                return (firstName + " " + lastName).trim();
            }
        }
        return "";
    }

    @Override
    public LocalDateTime getCreateTime()
    {
        return createdAt;
    }

    @Override
    public LocalDateTime getUpdateTime()
    {
        return updatedAt;
    }

    @Override
    public void setCreateTime(LocalDateTime createTime)
    {

    }

    @Override
    public void setUpdateTime(LocalDateTime updateTime)
    {

    }

    @Override
    public String getAllInformation(){
        return "AccountEntity{" +
                "account_id=" + identity_id +
                ", userName='" + userName + '\'' +
                ", mail='" + getMail() + '\'' +
                ", alias='" + alias + '\'' +
                ", password='" + passwordhash + '\'' +
                ", role='" + role + '\'' +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                ", lastLoginAt=" + lastLoginAt +
                ", isEnabled=" + isEnabled +
                '}';
    }

/*
 TODO [Reverse Engineering] create field to map the '\"ADMIN\"' column
 Available actions: Define target Java type | Uncomment as is | Remove column mapping
    @ColumnDefault("'ADMIN'")
    @Column(name = "\"ADMIN\"", columnDefinition = "user_role not null")
    private java.lang.Object admin;
*/
}