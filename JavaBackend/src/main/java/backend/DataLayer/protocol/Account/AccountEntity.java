package backend.DataLayer.protocol.Account;

import backend.DataLayer.protocol.CreateUpdateTime;
import backend.DataLayer.protocol.Mail.MailEntity;
import backend.DataLayer.protocol.Person.PersonEntity;
import backend.DataLayer.protocol.RoleTypes;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;

@Entity
@Table(name = "accounts", schema = "person")
@Getter
@Setter
public class AccountEntity implements AccountStructure, CreateUpdateTime
{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Added auto-generation
    @Column(name = "account_id", nullable = false)
    private int account_id;


    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mail", referencedColumnName = "mail_id")
    private MailEntity mailEntity;

   public String getMail(){
        return mailEntity != null ? mailEntity.getMail() : null;
    }
    ArrayList roleList;
    @Column(name = "username", nullable = false, unique = true)
    private String userName;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "first_name", referencedColumnName = "person_id")
    private PersonEntity personEntity;




    @Column(name = "alias", nullable = false)
    private String alias;

    @Column(name = "password", nullable = false)
    private String password;

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
        return account_id;
    }

    @Override
    public String getUserName() {
        return userName;
    }



    @Override
    public String getPassword() {
        return password;
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
        this.account_id = id;
    }

    @Override
    public void setUserName(String userName) {
        this.userName = userName;
    }

    @Override
    public void setMail(String mail) {
        // Note: This method might not be appropriate since mail comes from MailEntity
        // Consider removing this from the interface or implementing differently
        // For now, keeping it empty as mail is managed through the relationship
    }
    public void addRole(RoleTypes role)
    {
         roleList=new ArrayList();
        roleList.add(role);
    }

    @Override
    public void setPassword(String password) {
        this.password = password;
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
        if (this.mailEntity == null) {
            this.mailEntity = new MailEntity();
        }
        this.mailEntity.setMail(email);
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
    public void setMailEntity(MailEntity mailEntity) {
        this.mailEntity = mailEntity;
    }

    public void setPersonEntity(PersonEntity personEntity) {
        this.personEntity = personEntity;
    }

    // Getters for entity relationships
    public MailEntity getMailEntity() {
        return mailEntity;
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
                "account_id=" + account_id +
                ", userName='" + userName + '\'' +
                ", mail='" + getMail() + '\'' +
                ", alias='" + alias + '\'' +
                ", password='" + password + '\'' +
                ", role='" + role + '\'' +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                ", lastLoginAt=" + lastLoginAt +
                ", isEnabled=" + isEnabled +
                '}';
    }

}