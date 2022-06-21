package team1.toMyAnimal.domain.dto.pet;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class PetUpdateRequest {
    private String registrationNumber;
    private String petName;
    private double weight;
    private List<MultipartFile> addedImages = new ArrayList<>();
    private List<Long> deletedImages = new ArrayList<>();
}
