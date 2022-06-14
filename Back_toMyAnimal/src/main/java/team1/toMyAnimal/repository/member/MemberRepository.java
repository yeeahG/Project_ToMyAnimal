package team1.toMyAnimal.repository.member;

import org.springframework.data.jpa.repository.JpaRepository;
import team1.toMyAnimal.domain.member.Member;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {

    Optional<Member> findByUserId(String userId);
    Optional<Member> findByUserPhoneNumber(String userPhoneNumber);

    boolean existsByUserId(String userId);
    boolean existsByUserPhoneNumber(String userPhoneNumber);
}
