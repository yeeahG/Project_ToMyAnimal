package team1.toMyAnimal.security.guard;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Component;
import team1.toMyAnimal.domain.member.RoleType;
import team1.toMyAnimal.domain.pet.Pet;
import team1.toMyAnimal.domain.post.Post;
import team1.toMyAnimal.repository.pet.PetRepository;

@Component
@RequiredArgsConstructor
@Slf4j
public class PetGuard {
    private final AuthHelper authHelper;
    private final PetRepository petRepository;

    public boolean check(Long id) {
        return authHelper.isAuthenticated() && hasAuthority(id);
    }
    private boolean hasAuthority(Long id) {
        return hasAdminRole() || isResourceOwner(id);
    }
    private boolean isResourceOwner(Long id) {
        Pet pet = petRepository.findById(id).orElseThrow(() -> { throw new AccessDeniedException(""); });
        Long memberId = authHelper.extractMemberId();
        return pet.getMember().getId().equals(memberId);
    }

    private boolean hasAdminRole() {
        return authHelper.extractMemberRoles().contains(RoleType.ROLE_ADMIN);
    }
}
