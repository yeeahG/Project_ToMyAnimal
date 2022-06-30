package team1.toMyAnimal.repository.animal;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import team1.toMyAnimal.domain.animal.Animal;

import java.util.List;

public interface AnimalRepository extends JpaRepository<Animal, Long> {
    @Query("select a from Animal a join fetch a.member where a.member.id =:id")
    List<Animal> findWithMemberById(@Param("id") Long id);
}
