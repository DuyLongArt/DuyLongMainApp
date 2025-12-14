package backend.DataLayer.protocol.CVInformation;

import backend.DataLayer.protocol.Person.PersonEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "cv_informations", schema = "users", uniqueConstraints = {
        @UniqueConstraint(name = "cv_informations_identity_id_key", columnNames = {"identity_id"})
})
public class CvInformationEntity
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cv_information_id", nullable = false)
    private Integer id;

    @NotNull
    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "identity_id", nullable = false)
    private PersonEntity identity;

    @Column(name = "github_url", length = Integer.MAX_VALUE)
    private String githubUrl;

    @Column(name = "website_url", length = Integer.MAX_VALUE)
    private String websiteUrl;

    @Column(name = "company", length = Integer.MAX_VALUE)
    private String company;

    @Column(name = "university", length = Integer.MAX_VALUE)
    private String university;

    @NotNull
    @ColumnDefault("'HaNoi'")
    @Column(name = "location", nullable = false, length = Integer.MAX_VALUE)
    private String location;

    @ColumnDefault("'VietNam'")
    @Column(name = "country", length = Integer.MAX_VALUE)
    private String country;

    @Column(name = "bio", length = Integer.MAX_VALUE)
    private String bio;

    @Column(name = "occupation", length = Integer.MAX_VALUE)
    private String occupation;

    @Column(name = "education_level", length = Integer.MAX_VALUE)
    private String educationLevel;

    @Column(name = "linkedin_url", length = Integer.MAX_VALUE)
    private String linkedinUrl;

    @NotNull
    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "created_at", nullable = false)
    private Instant createdAt;

    @NotNull
    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;

}