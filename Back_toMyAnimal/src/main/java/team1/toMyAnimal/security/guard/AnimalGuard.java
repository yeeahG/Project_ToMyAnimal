package team1.toMyAnimal.security.guard;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Component;
import team1.toMyAnimal.domain.member.RoleType;
import team1.toMyAnimal.domain.animal.Animal;
import team1.toMyAnimal.repository.animal.AnimalRepository;

@Component
@RequiredArgsConstructor
@Slf4j
public class AnimalGuard {
    private final AuthHelper authHelper;
    private final AnimalRepository animalRepository;

    public boolean check(Long id) {
        return authHelper.isAuthenticated() && hasAuthority(id);
    }
    private boolean hasAuthority(Long id) {
        return hasAdminRole() || isResourceOwner(id);
    }
    private boolean isResourceOwner(Long id) {
        Animal animal = animalRepository.findById(id).orElseThrow(() -> { throw new AccessDeniedException(""); });
        Long memberId = authHelper.extractMemberId();
        return animal.getMember().getId().equals(memberId);
    }

    private boolean hasAdminRole() {
        return authHelper.extractMemberRoles().contains(RoleType.ROLE_ADMIN);
    }
}
