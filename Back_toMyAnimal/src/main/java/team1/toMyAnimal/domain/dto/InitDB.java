package team1.toMyAnimal.domain.dto;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.annotation.Profile;
import org.springframework.context.event.EventListener;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import team1.toMyAnimal.domain.category.Category;
import team1.toMyAnimal.domain.member.Member;
import team1.toMyAnimal.domain.member.Role;
import team1.toMyAnimal.domain.member.RoleType;
import team1.toMyAnimal.domain.post.Post;
import team1.toMyAnimal.exception.RoleNotFoundException;
import team1.toMyAnimal.repository.category.CategoryRepository;
import team1.toMyAnimal.repository.member.MemberRepository;
import team1.toMyAnimal.repository.post.PostRepository;
import team1.toMyAnimal.repository.role.RoleRepository;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Component
@RequiredArgsConstructor
@Slf4j
@Profile("local")
public class InitDB {
    private final RoleRepository roleRepository;
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final CategoryRepository categoryRepository;
    private final PostRepository postRepository;

    @EventListener(ApplicationReadyEvent.class)
    @Transactional
    public void initDB() {
        log.info("initialize database");

        initRole();
        initTestAdmin();
        initTestMember();
        initCategory();
        initPost();
    }

    private void initRole() {
        roleRepository.saveAll(
                List.of(RoleType.values()).stream().map(roleType -> new Role(roleType)).collect(Collectors.toList())
        );
    }

    private void initTestAdmin() {
        memberRepository.save(

                new Member("admin", "01012345678", "admin", passwordEncoder.encode("admin"),
                        List.of(roleRepository.findByRoleType(RoleType.ROLE_USER).orElseThrow(RoleNotFoundException::new),
                                roleRepository.findByRoleType(RoleType.ROLE_ADMIN).orElseThrow(RoleNotFoundException::new)))
        );
    }


    private void initTestMember() {
        memberRepository.saveAll(
                List.of(

                        new Member("member1", "01012345679", "member1", passwordEncoder.encode("1234"),
                                List.of(roleRepository.findByRoleType(RoleType.ROLE_USER).orElseThrow(RoleNotFoundException::new))),
                        new Member("member2", "01012345680", "member2", passwordEncoder.encode("1234"),
                                List.of(roleRepository.findByRoleType(RoleType.ROLE_USER).orElseThrow(RoleNotFoundException::new))))
        );
    }

    private void initCategory() {
        Category c1 = categoryRepository.save(new Category("category1", null));
        Category c2 = categoryRepository.save(new Category("category2", c1));
        Category c3 = categoryRepository.save(new Category("category3", c1));
        Category c4 = categoryRepository.save(new Category("category4", c2));
        Category c5 = categoryRepository.save(new Category("category5", c2));
        Category c6 = categoryRepository.save(new Category("category6", c4));
        Category c7 = categoryRepository.save(new Category("category7", c3));
        Category c8 = categoryRepository.save(new Category("category8", null));
    }

    private void initPost() {
        Member member = memberRepository.findAll().get(0);
        Category category = categoryRepository.findAll().get(0);
        IntStream.range(0, 20)
                .forEach(i -> postRepository.save(
                        new Post("title" + i, "content" + i, member, category, List.of())
                ));
    }

}