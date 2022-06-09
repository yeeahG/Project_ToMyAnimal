package com.example.tomyanimal.repository;

import com.example.tomyanimal.model.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByUserId(String userId);

    // 폰번호 또는 이름으로 찾기
    Optional<Member> findByUserPhoneNumberOrUserId(String userPhoneNumber, String userId);

    List<Member> findByIdIn(List<Long> userIds);

    Optional<Member> findByUserName(String userName);

    Boolean existsByUserId(String userId);

    Boolean existsByUserPhoneNumber(String userName);
}

