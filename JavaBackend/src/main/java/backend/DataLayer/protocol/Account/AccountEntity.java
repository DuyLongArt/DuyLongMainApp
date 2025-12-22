package backend;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "accounts", schema = "users", uniqueConstraints = {
        @UniqueConstraint(name = "accounts_username_key", columnNames = {"username"})
})
public class AccountEntity
{
    @Id
    @Column(name = "identity_id", nullable = false)
    private Integer id;

    @MapsId
    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "identity_id", nullable = false)
    private PersonEntity persons;

    @Size(max = 50)
    @NotNull
    @Column(name = "username", nullable = false, length = 50)
    private String username;

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

    @Column(name = "last_login_at")
    private Instant lastLoginAt;

    @NotNull
    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "password_changed_at", nullable = false)
    private Instant passwordChangedAt;

    @NotNull
    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "created_at", nullable = false)
    private Instant createdAt;
    @NotNull
    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;

/*
 TODO [Reverse Engineering] create field to map the 'role' column
 Available actions: Define target Java type | Uncomment as is | Remove column mapping
    @ColumnDefault("'USER'")
    @Column(name = "role", columnDefinition = "user_role not null")
    private Object role;
*/
}