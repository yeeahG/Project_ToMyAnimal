package team1.toMyAnimal.service.pet;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import team1.toMyAnimal.domain.dto.pet.PetCreateRequest;
import team1.toMyAnimal.domain.dto.pet.PetCreateResponse;
import team1.toMyAnimal.domain.dto.pet.PetDto;
import team1.toMyAnimal.domain.pet.Pet;
import team1.toMyAnimal.exception.PetNotFoundException;
import team1.toMyAnimal.repository.member.MemberRepository;
import team1.toMyAnimal.repository.pet.PetRepository;
import team1.toMyAnimal.service.post.FileService;



@Service
@Transactional(readOnly = true)
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

    public PetDto read(Long id) {
        return PetDto.toDto(petRepository.findById(id).orElseThrow(PetNotFoundException::new));
    }

    @Transactional
    public void delete(Long id) {
        Pet pet = petRepository.findById(id).orElseThrow(PetNotFoundException::new);
        petRepository.delete(pet);
    }

}
