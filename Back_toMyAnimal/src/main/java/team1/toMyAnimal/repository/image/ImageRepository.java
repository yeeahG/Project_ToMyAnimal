package team1.toMyAnimal.repository.image;

import org.springframework.data.jpa.repository.JpaRepository;
import team1.toMyAnimal.domain.image.BoardImage;

public interface ImageRepository extends JpaRepository<BoardImage, Long> {
}
