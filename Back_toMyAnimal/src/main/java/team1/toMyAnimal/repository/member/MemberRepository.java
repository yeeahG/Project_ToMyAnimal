package team1.toMyAnimal.repository.member;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import team1.toMyAnimal.domain.member.Member;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByIdentifier(String identifier);

    Member findByEmail(String email);
    @EntityGraph("Member.roles")
    Optional<Member> findWithRolesById(Long Id);

    boolean existsByIdentifier(String identifier);
    boolean existsByPhoneNumber(String phoneNumber);
    }
