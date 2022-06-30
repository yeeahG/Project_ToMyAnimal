package team1.toMyAnimal.factory;

import team1.toMyAnimal.domain.board.Board;
import team1.toMyAnimal.domain.category.Category;
import team1.toMyAnimal.domain.image.BoardImage;
import team1.toMyAnimal.domain.member.Member;

import java.util.List;

import static team1.toMyAnimal.factory.CategoryFactory.createCategory;
import static team1.toMyAnimal.factory.MemberFactory.createMember;

public class BoardFactory {
    public static Board createBoard() {
        return createBoard(createMember(), createCategory());
    }

    public static Board createBoard(Member member, Category category) {
        return new Board("title", "content", 0, member, category, List.of());
    }

    public static Board createBoardWithImages(Member member, Category category, List<BoardImage> images) {
        return new Board("title", "content", 0, member, category, images);
    }

    public static Board createBoardWithImages(List<BoardImage> images) {
        return new Board("title", "content", 0, createMember(), createCategory(), images);
    }
}