package team1.toMyAnimal.domain.dto.animal;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class AnimalUpdateRequest {
    private String registrationNumber;
    private String name;
    private double weight;
    private String type;
    private List<MultipartFile> addedImages = new ArrayList<>();
    private List<Long> deletedImages = new ArrayList<>();
}
