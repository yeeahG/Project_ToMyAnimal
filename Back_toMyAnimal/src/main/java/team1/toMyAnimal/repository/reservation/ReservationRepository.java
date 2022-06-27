package team1.toMyAnimal.repository.reservation;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import team1.toMyAnimal.domain.pet.Pet;
import team1.toMyAnimal.domain.reservation.Reservation;

import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    @Query("select r from Reservation r join fetch r.member where r.member.id = :id")
    List<Reservation> findWithMemberId(@Param("id") Long id);
}

