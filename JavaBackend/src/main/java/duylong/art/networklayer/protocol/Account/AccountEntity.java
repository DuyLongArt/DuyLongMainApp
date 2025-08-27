package duylong.art.networklayer.protocol.Account;

import duylong.art.networklayer.protocol.Mail.MailEntity;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "person_account", schema = "person")
public class AccountEntity implements AccountStructure
{
    @Column(name = "id", nullable = false)
    private int id;
    @Column(name = "username", nullable = false)
    private String userName;


    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mail_id", referencedColumnName = "mail")
    private MailEntity mailEntity;

    @Override
    public String getMail() {
        return mailEntity != null ? mailEntity.getMail() : null;
    }
    @Column(name="password",nullable=false)
    private String password;
    private String role;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @Id
    @Override
    public int getId()
    {
        return id;
    }

    @Override
    public String getUserName()
    {
        return userName;
    }


    @Override
    public String getPassword()
    {
        return password;
    }

    @Override
    public String getRole()
    {
        return role;
    }

    @Override
    public LocalDateTime getCreatedAt()
    {
        return createdAt;
    }

    @Override
    public LocalDateTime getUpdatedAt()
    {
        return updatedAt;
    }
}
