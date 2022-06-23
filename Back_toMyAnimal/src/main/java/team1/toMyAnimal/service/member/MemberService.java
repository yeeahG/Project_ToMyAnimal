package team1.toMyAnimal.service.member;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import team1.toMyAnimal.domain.dto.member.MemberDto;
import team1.toMyAnimal.domain.dto.member.MemberReadCondition;
import team1.toMyAnimal.domain.dto.member.MemberUpdateRequest;
import team1.toMyAnimal.domain.dto.member.MemberUpdateResponse;
import team1.toMyAnimal.domain.member.Member;
import team1.toMyAnimal.exception.MemberNotFoundException;
import team1.toMyAnimal.repository.member.MemberRepository;

@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class MemberService {
    private final MemberRepository memberRepository;

    public MemberDto read(MemberReadCondition cond) {
        return MemberDto.toDto(memberRepository.findById(cond.getMemberId()).orElseThrow(MemberNotFoundException::new));
    }

    @Transactional
    public void delete(MemberReadCondition cond) {
        Member member = memberRepository.findById(cond.getMemberId()).orElseThrow(MemberNotFoundException::new);
        memberRepository.delete(member);
    }

    @Transactional
    public MemberUpdateResponse update(MemberReadCondition cond, MemberUpdateRequest req) {
        Member member = memberRepository.findById(cond.getMemberId()).orElseThrow(MemberNotFoundException::new);
        member.updateUserInfo(req);
        return new MemberUpdateResponse(cond.getMemberId());

    }

}
