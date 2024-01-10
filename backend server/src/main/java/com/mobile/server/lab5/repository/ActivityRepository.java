package com.mobile.server.lab5.repository;

import com.mobile.server.lab5.entity.ActivityEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface ActivityRepository extends JpaRepository<ActivityEntity, Integer> {
    @Query(value="SELECT * FROM activities a WHERE a.title = ?1",nativeQuery = true)
    ActivityEntity findActivityByTitle(String title);

    @Modifying
    @Query(value="DELETE FROM activities WHERE title = ?1", nativeQuery = true)
    void deleteByTitle(String title);
}
