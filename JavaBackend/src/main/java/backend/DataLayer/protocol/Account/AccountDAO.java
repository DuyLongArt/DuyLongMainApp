package backend.DataLayer.protocol.Account;

import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Component;

@Component
public interface AccountDAO extends CrudRepository<AccountEntity, Integer>
{

    @Query("SELECT p.fullName FROM PersonEntity p WHERE p.identity_id = :id")
    String findNameById(Integer id);

    @Query("SELECT entity.alias FROM AccountEntity entity WHERE entity.alias = :alias")
    String findAccountByAlias(String alias);

    AccountEntity findAccountEntitiesByUserName(String userName);


}
