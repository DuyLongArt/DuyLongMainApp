package duylong.art.javabackend.Person;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface PersonDAO extends CrudRepository<PersonEntity, Integer>
{

    @Query("SELECT p.name FROM PersonEntity p WHERE p.id = :id")
    String findNameById(Integer id);

}
