package com.example.tomyanimal.repository;

import com.example.tomyanimal.model.Board;
import org.springframework.ui.Model;

import java.util.List;

public interface BoardRepository {
    List<Board> selectList();

    Board selectOne(int bno);

    int selectIdx();

    void insert(Board board);

    void update(Board board, int bno);

    void delete(int bno);

    void updateCnt(Board board, int bno);


}
