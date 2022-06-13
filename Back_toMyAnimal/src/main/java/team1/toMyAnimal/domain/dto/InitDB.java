package team1.toMyAnimal.domain.dto;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import team1.toMyAnimal.domain.member.Role;
import team1.toMyAnimal.domain.member.RoleType;
import team1.toMyAnimal.repository.role.RoleRepository;

import javax.annotation.PostConstruct;
import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
@Slf4j
public class InitDB {
    private final RoleRepository roleRepository;

    @PostConstruct
    public void initDB() {
        log.info("initialize database");
        initRole();
    }

    private void initRole() {
        roleRepository.saveAll(
                List.of(RoleType.values()).stream().map(roleType -> new Role(roleType)).collect(Collectors.toList())
        );
    }
}
