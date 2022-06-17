package team1.toMyAnimal.service.pet;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import team1.toMyAnimal.domain.dto.pet.PetCreateRequest;
import team1.toMyAnimal.domain.dto.pet.PetCreateResponse;
import team1.toMyAnimal.domain.pet.Pet;
import team1.toMyAnimal.repository.member.MemberRepository;
import team1.toMyAnimal.repository.pet.PetRepository;
import team1.toMyAnimal.service.post.FileService;

import javax.transaction.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class PetService {
    private final PetRepository petRepository;
    private final MemberRepository memberRepository;
    private final FileService fileService;


    @Transactional
    public PetCreateResponse create(PetCreateRequest req){
        Pet pet = petRepository.save(PetCreateRequest.toEntity(req, memberRepository));
        return new PetCreateResponse(pet.getId());
    }
}
