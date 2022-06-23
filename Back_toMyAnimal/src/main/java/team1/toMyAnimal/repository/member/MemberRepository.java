package team1.toMyAnimal.repository.member;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import team1.toMyAnimal.domain.member.Member;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByUserId(String userId);
    Optional<Member> findByUserPhoneNumber(String userPhoneNumber);
    @EntityGraph("Member.roles")
    Optional<Member> findWithRolesById(Long Id);

    boolean existsByUserId(String userId);
    boolean existsByUserPhoneNumber(String userPhoneNumber);
    }
