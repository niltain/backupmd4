package com.example.case_study.service;

import java.util.List;

public interface ICommon<E> {
    List<E> findAll();

    E save(E e);

    void delete(Long id);
}
