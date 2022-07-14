package team1.toMyAnimal.repository.service.reservation;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import team1.toMyAnimal.domain.dto.reservation.*;
import team1.toMyAnimal.domain.reservation.Reservation;
import team1.toMyAnimal.exception.ReservationNotFoundException;
import team1.toMyAnimal.repository.member.MemberRepository;
import team1.toMyAnimal.repository.animal.AnimalRepository;
import team1.toMyAnimal.repository.reservation.ReservationRepository;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ReservationService {
    private final ReservationRepository reservationRepository;
    private final MemberRepository memberRepository;

    private final AnimalRepository animalRepository;

    //C
    @Transactional
    public ReservationCreateResponse create(ReservationCreateRequest req) {
        Reservation reservation = reservationRepository.save(
                ReservationCreateRequest.toEntity(
                        req,
                        memberRepository,
                        animalRepository
                )
        );
        return new ReservationCreateResponse(reservation.getId());
    }
    //R
    public ReservationDto read(Long id){
        return ReservationDto.toDto(reservationRepository.findById(id).orElseThrow(ReservationNotFoundException::new));
    }

    // member read
    public List<ReservationDto> readAll(ReservationReadCondition cond){
        return ReservationDto.toDtoList(reservationRepository.findWithMemberId(cond.getMemberId()));
    }

    //U
    @Transactional
    public ReservationUpdateResponse update (Long id, ReservationUpdateRequest req) {
        Reservation reserv = reservationRepository.findById(id).orElseThrow(ReservationNotFoundException::new);
        reserv.update(req);
        return new ReservationUpdateResponse(id);
    }

    //D
    @Transactional
    public void delete(Long id) {
        Reservation reserv = reservationRepository.findById(id).orElseThrow(ReservationNotFoundException::new);
        reservationRepository.delete(reserv);
    }
}
