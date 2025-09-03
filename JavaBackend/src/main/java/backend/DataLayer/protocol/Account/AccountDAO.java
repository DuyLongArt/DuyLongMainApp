package backend.DataLayer.protocol.Account;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface AccountDAO extends CrudRepository<AccountEntity, Integer>
{

    @Query("SELECT p.fullName FROM PersonEntity p WHERE p.id = :id")
    String findNameById(Integer id);

    Optional<AccountEntity> findByUsername(String username);

    Optional<AccountEntity> findByEmail(String email);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);
}
