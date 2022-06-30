package team1.toMyAnimal.repository.member;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.dao.DataIntegrityViolationException;
import team1.toMyAnimal.domain.dto.member.MemberUpdateRequest;
import team1.toMyAnimal.domain.member.Member;
import team1.toMyAnimal.domain.member.MemberRole;
import team1.toMyAnimal.domain.member.Role;
import team1.toMyAnimal.domain.member.RoleType;
import team1.toMyAnimal.exception.MemberNotFoundException;
import team1.toMyAnimal.repository.member.MemberRepository;
import team1.toMyAnimal.repository.role.RoleRepository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import static java.util.Collections.emptyList;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

@DataJpaTest
class MemberRepositoryTest {

    MemberRepository memberRepository;
    RoleRepository roleRepository;
    @PersistenceContext EntityManager em;

    @Test
    void createAndReadTest() {
        // given
        Member member = createMember();

        // when
        memberRepository.save(member);
        clear();

        // then
        Member foundMember = memberRepository.findById(member.getId()).orElseThrow(MemberNotFoundException::new);
        assertThat(foundMember.getId()).isEqualTo(member.getId());
    }

    @Test
    void memberDateTest() {
        // given
        Member member = createMember();

        // when
        memberRepository.save(member);
        clear();

        // then
        Member foundMember = memberRepository.findById(member.getId()).orElseThrow(MemberNotFoundException::new);
        assertThat(foundMember.getCreatedAt()).isNotNull();
        assertThat(foundMember.getModifiedAt()).isNotNull();
        assertThat(foundMember.getCreatedAt()).isEqualTo(foundMember.getModifiedAt());
    }

    @Test
    void updateTest() {
        // given
        MemberUpdateRequest req = new MemberUpdateRequest();
        Member member = memberRepository.save(createMember());
        clear();

        // when
        Member foundMember = memberRepository.findById(member.getId()).orElseThrow(MemberNotFoundException::new);
        foundMember.updateMemberInfo(req);
        clear();

        // then
        Member updatedMember = memberRepository.findById(member.getId()).orElseThrow(MemberNotFoundException::new);
        assertThat(updatedMember.getName()).isEqualTo(req);
    }

    @Test
    void deleteTest() {
        // given
        Member member = memberRepository.save(createMember());
        clear();

        // when
        memberRepository.delete(member);
        clear();

        // then
        assertThatThrownBy(() -> memberRepository.findById(member.getId()).orElseThrow(MemberNotFoundException::new))
                .isInstanceOf(MemberNotFoundException.class);
    }

    @Test
    void findByEmailTest() {
        // given
        Member member = memberRepository.save(createMember());
        clear();

        // when
        Member foundMember = memberRepository.findByEmail(member.getEmail());

        // then
        assertThat(foundMember.getEmail()).isEqualTo(member.getEmail());
    }

    @Test
    void findByIdentifierTest() {
        // given
        Member member = memberRepository.save(createMember());
        clear();

        // when
        Member foundMember = memberRepository.findByIdentifier(member.getIdentifier()).orElseThrow(MemberNotFoundException::new);

        // then
        assertThat(foundMember.getIdentifier()).isEqualTo(member.getIdentifier());
    }

    @Test
    void uniqueIdentifierTest() {
        // given
        Member member = memberRepository.save(createMember("identifier", "01012345678", "email@gmail.com", "password", "name"));
        clear();

        // when, then
        assertThatThrownBy(() -> memberRepository.save(createMember(member.getIdentifier(), "01023456789","email@naver.com", "password", "name")))
                .isInstanceOf(DataIntegrityViolationException.class);
    }

    @Test
    void uniqueEmailTest() {
        // given
        Member member = memberRepository.save(createMember("identifier", "01012345678", "email@gmail.com", "password", "name"));
        clear();

        // when, then
        assertThatThrownBy(() -> memberRepository.save(createMember("identifier", "01012345678", member.getEmail(), "password", "name")))
                .isInstanceOf(DataIntegrityViolationException.class);
    }

    @Test
    void existsByIdentifier() {
        // given
        Member member = memberRepository.save(createMember());
        clear();

        // when, then
        assertThat(memberRepository.existsByIdentifier(member.getIdentifier())).isTrue();
        assertThat(memberRepository.existsByIdentifier(member.getIdentifier() + "test")).isFalse();
    }

    @Test
    void existsByPhoneNumberTest() {
        // given
        Member member = memberRepository.save(createMember());
        clear();

        // when, then
        assertThat(memberRepository.existsByPhoneNumber(member.getPhoneNumber())).isTrue();
        assertThat(memberRepository.existsByPhoneNumber(member.getPhoneNumber() + "test")).isFalse();
    }

    @Test
    void memberRoleCascadePersistTest() {
        // given
        List<RoleType> roleTypes = List.of(RoleType.ROLE_USER, RoleType.ROLE_GUEST, RoleType.ROLE_ADMIN);
        List<Role> roles = roleTypes.stream().map(roleType -> new Role(roleType)).collect(Collectors.toList());
        roleRepository.saveAll(roles);
        clear();

        Member member = memberRepository.save(createMemberWithRoles(roleRepository.findAll()));
        clear();

        // when
        Member foundMember = memberRepository.findById(member.getId()).orElseThrow(MemberNotFoundException::new);
        Set<MemberRole> memberRoles = foundMember.getRoles();

        // then
        assertThat(memberRoles.size()).isEqualTo(roles.size());
    }

    @Test
    void memberRoleCascadeDeleteTest() {
        // given
        List<RoleType> roleTypes = List.of(RoleType.ROLE_USER, RoleType.ROLE_GUEST, RoleType.ROLE_ADMIN);
        List<Role> roles = roleTypes.stream().map(roleType -> new Role(roleType)).collect(Collectors.toList());
        roleRepository.saveAll(roles);
        clear();

        Member member = memberRepository.save(createMemberWithRoles(roleRepository.findAll()));
        clear();

        // when
        memberRepository.deleteById(member.getId());
        clear();

        // then
        List<MemberRole> result = em.createQuery("select mr from MemberRole mr", MemberRole.class).getResultList();
        assertThat(result.size()).isZero();
    }

    private void clear() {
        em.flush();
        em.clear();
    }

    private Member createMemberWithRoles(List<Role> roles) {
        return new Member("identifier", "01012345678", "name", "password", "email@naver.com",roles);
    }

    private Member createMember(String identifier, String phoneNumber ,String email, String password, String name) {
        return new Member(identifier, phoneNumber, name, password, email, emptyList());
    }

    private Member createMember() {
        return new Member("identifier", "01012345678", "name", "password", "email@naver.com",emptyList());
    }

}