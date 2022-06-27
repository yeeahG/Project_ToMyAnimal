package team1.toMyAnimal.service.reservation;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import team1.toMyAnimal.domain.dto.reservation.*;
import team1.toMyAnimal.domain.reservation.Reservation;
import team1.toMyAnimal.exception.ReservationNotFoundException;
import team1.toMyAnimal.repository.member.MemberRepository;
import team1.toMyAnimal.repository.pet.PetRepository;
import team1.toMyAnimal.repository.reservation.ReservationRepository;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ReservationService {
    private final ReservationRepository reservationRepository;
    private final MemberRepository memberRepository;

    private final PetRepository petRepository;

    //C
    public ReservationCreateResponse create(ReservationCreateRequest req) {
        Reservation reservation = reservationRepository.save(
                ReservationCreateRequest.toEntity(
                        req,
                        memberRepository,
                        petRepository
                )
        );
        return new ReservationCreateResponse(reservation.getId());
    }
    //R
    public ReservationDto read(Long id){
        return ReservationDto.toDto(reservationRepository.findById(id).orElseThrow(ReservationNotFoundException::new));
    }

    // member read
    public ReservationDto readAll(){

    }

    //U
    @Transactional
    public ReservationUpdateResponse update (Long id, ReservationUpdateRequest req) {

    }

    //D
    public void delete(Long id) {

    }
}
