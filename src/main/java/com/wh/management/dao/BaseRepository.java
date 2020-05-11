package com.wh.management.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.NoRepositoryBean;

/**
 * on 2019-06-03 23:33
 */
@NoRepositoryBean
public interface BaseRepository<Entity, ID> extends JpaRepository<Entity, ID>, JpaSpecificationExecutor<Entity> {
}