package team1.toMyAnimal.repository.pet;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import team1.toMyAnimal.domain.pet.Pet;

import java.util.Optional;

public interface PetRepository extends JpaRepository<Pet, Long> , CustomPetRepository{
    @Query("select p from Pet p join fetch p.member where p.id = : id")
    Optional<Pet> findByIdWithMember(Long id);
}
