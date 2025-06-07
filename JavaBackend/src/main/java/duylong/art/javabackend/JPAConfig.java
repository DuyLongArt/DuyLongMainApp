package duylong.art.javabackend;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@EnableJpaRepositories(basePackages = "duylong.art.javabackend")
@EntityScan(basePackages = "duylong.art.javabackend")
@EnableTransactionManagement
public class JPAConfig {
    // This empty class with annotations is sufficient for Spring Boot's autoconfiguration
    // to set up the EntityManagerFactory

}