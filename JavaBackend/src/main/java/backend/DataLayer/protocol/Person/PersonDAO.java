package backend.DataLayer.protocol.Person;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

/**
 * Repository interface for PersonEntity data access.
 * Provides CRUD operations and custom queries for Person entities.
 */
@Repository
public interface PersonDAO extends JpaRepository<PersonEntity, Integer>
{

    @Query("SELECT p FROM PersonEntity p JOIN AccountEntity a ON p.id=a.identity.id WHERE a.username= :username")
    PersonEntity findPersonEntityByUserName(String username);
}

