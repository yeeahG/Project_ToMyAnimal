package team1.toMyAnimal.repository.pet;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import team1.toMyAnimal.domain.pet.Pet;

import java.util.List;
import java.util.Optional;

public interface PetRepository extends JpaRepository<Pet, Long> {
    @Query("select p from Pet p join fetch p.member where p.member.id = : id")
    List<Pet> findByIdWithMember(Long id);
}
