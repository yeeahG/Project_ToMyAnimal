package team1.toMyAnimal.controller.reservation;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import team1.toMyAnimal.aop.AssignMemberId;
import team1.toMyAnimal.controller.response.Response;
import team1.toMyAnimal.domain.dto.reservation.ReservationCreateRequest;
import team1.toMyAnimal.domain.dto.reservation.ReservationReadCondition;
import team1.toMyAnimal.domain.dto.reservation.ReservationUpdateRequest;

import team1.toMyAnimal.service.reservation.ReservationService;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
@Slf4j
public class ReservationController {
    private final ReservationService reservationService;

    @PostMapping("/api/reservation")
    @ResponseStatus(HttpStatus.CREATED)
    @AssignMemberId
    public Response create(@Valid @ModelAttribute ReservationCreateRequest req) {
        return Response.success(reservationService.create(req));
    }

    @GetMapping("/api/reservation/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Response read(@PathVariable Long id) {
        return Response.success(reservationService.read(id));
    }

    @GetMapping("/api/my-reservation")
    @ResponseStatus(HttpStatus.OK)
    public Response readAll(@Valid ReservationReadCondition cond) {
        return Response.success(reservationService.readAll(cond));
    }

    @DeleteMapping("/api/reservation/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Response delete(@PathVariable Long id) {
        reservationService.delete(id);
        return Response.success();
    }

    @PutMapping("/api/reservation/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Response update(
            @PathVariable Long id,
            @Valid @ModelAttribute ReservationUpdateRequest req) {
        return Response.success(reservationService.update(id, req));
    }
}
