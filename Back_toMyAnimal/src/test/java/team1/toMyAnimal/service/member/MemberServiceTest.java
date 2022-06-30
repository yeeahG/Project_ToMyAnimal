package team1.toMyAnimal.service.member;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import team1.toMyAnimal.domain.dto.member.MemberDto;
import team1.toMyAnimal.domain.dto.member.MemberReadCondition;
import team1.toMyAnimal.domain.member.Member;
import team1.toMyAnimal.exception.MemberNotFoundException;
import team1.toMyAnimal.repository.member.MemberRepository;
import team1.toMyAnimal.service.member.MemberService;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class MemberServiceTest {
    @InjectMocks
    MemberService memberService;
    @Mock
    MemberRepository memberRepository;

    @Mock
    MemberReadCondition cond;

    @Test
    void readTest() {
        // given
        Member member = createMember();
        given(memberRepository.findById(anyLong())).willReturn(Optional.of(member));

        // when
        MemberDto result = memberService.read(cond);

        // then
        assertThat(result.getIdentifier()).isEqualTo(member.getIdentifier());
    }

    @Test
    void readExceptionByMemberNotFoundTest() {
        // given
        given(memberRepository.findById(any())).willReturn(Optional.ofNullable(null));

        // when, then
        assertThatThrownBy(() -> memberService.read(cond)).isInstanceOf(MemberNotFoundException.class);
    }

    void deleteTest() {
        // given
        given(memberRepository.findById(anyLong())).willReturn(Optional.of(createMember()));

        // when
        memberService.delete(1L);

        // then
        verify(memberRepository).delete(any());
    }

    @Test
    void deleteExceptionByMemberNotFoundTest() {
        // given
        given(memberRepository.findById(anyLong())).willReturn(Optional.ofNullable(null));

        // when, then
        assertThatThrownBy(() -> memberService.delete(1L)).isInstanceOf(MemberNotFoundException.class);
    }


    private Member createMember() {
        return new Member("id0", "01011112222", "username", "123456a!", "email@email.com",List.of());
    }
}
