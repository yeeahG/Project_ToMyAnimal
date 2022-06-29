package team1.toMyAnimal.controller.member;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import team1.toMyAnimal.aop.AssignMemberId;
import team1.toMyAnimal.controller.response.Response;
import team1.toMyAnimal.domain.dto.board.BoardReadCondition;
import team1.toMyAnimal.domain.dto.mail.MailDto;
import team1.toMyAnimal.domain.dto.member.MemberReadCondition;
import team1.toMyAnimal.domain.dto.member.MemberUpdateRequest;
import team1.toMyAnimal.domain.member.Member;
import team1.toMyAnimal.service.member.MemberService;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;

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


    @DeleteMapping("/api/members/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Response delete(@PathVariable Long id) {
        memberService.delete(id);
        return Response.success();
    }

    @PutMapping("/api/member/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Response update(@PathVariable Long id, @Valid @RequestBody MemberUpdateRequest req) {
        memberService.update(id, req);
        return Response.success();
    }

}