package backend.DataLayer.protocol.Account;

import backend.DataLayer.protocol.CreateUpdateTime;
import backend.DataLayer.protocol.Mail.MailEntity;
import backend.DataLayer.protocol.Person.PersonEntity;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "accounts", schema = "person")
public class AccountEntity implements AccountStructure, CreateUpdateTime
{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Added auto-generation
    @Column(name = "account_id", nullable = false)
    private int account_id;

    @Column(name = "username", nullable = false, unique = true)
    private String userName;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mail", referencedColumnName = "mail_id")
    private MailEntity mailEntity;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "first_name", referencedColumnName = "id")
    private PersonEntity personEntity;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "person", referencedColumnName = "person_id")
    private PersonEntity personEntity;



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
    public String getMail() {
        return mailEntity != null ? mailEntity.getMail() : null;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getRole() {
        return role;
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

    public String getFullName() {
        return personEntity != null ? personEntity.getFullName() : null;
    }

    // Setters - Now properly implemented
    @Override
    public void setId(int id) {
        this.id = id;
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

    @Override
    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public void setRole(String role) {
        this.role = role;
    }

    @Override
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    @Override
    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
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

    @Override
    public String getInformation() {
        return "AccountEntity{" +
                "id=" + id +
                ", userName='" + userName + '\'' +
                ", mail='" + getMail() + '\'' +
                ", role='" + role + '\'' +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                ", lastLoginAt=" + lastLoginAt +
                ", isEnabled=" + isEnabled +
                '}';
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
    String getFullName()
    {
        return this.personEntity != null ? this.personEntity.getFullName()||this.personEntity.getFirstName()+this.personEntity.getLastName() : null;
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
}