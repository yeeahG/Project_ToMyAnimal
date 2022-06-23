package team1.toMyAnimal.controller.member;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import team1.toMyAnimal.aop.AssignMemberId;
import team1.toMyAnimal.controller.response.Response;
import team1.toMyAnimal.domain.dto.board.BoardReadCondition;
import team1.toMyAnimal.domain.dto.member.MemberReadCondition;
import team1.toMyAnimal.domain.dto.member.MemberUpdateRequest;
import team1.toMyAnimal.service.member.MemberService;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
@Slf4j
public class MemberController {

    private final MemberService memberService;

    @GetMapping("/api/members")
    @ResponseStatus(HttpStatus.OK)
    public Response read(@Valid MemberReadCondition cond) {
        return Response.success(memberService.read(cond));
    }


    @DeleteMapping("/api/members")
    @ResponseStatus(HttpStatus.OK)
    public Response delete(@Valid MemberReadCondition cond) {
        memberService.delete(cond);
        return Response.success();
    }

    @PutMapping("/api/members")
    @ResponseStatus(HttpStatus.OK)
    public Response update(@Valid MemberReadCondition cond, @Valid @RequestBody MemberUpdateRequest req) {
        memberService.update(cond, req);
        return Response.success();
    }


}