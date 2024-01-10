package com.mobile.server.lab5.mapper;

import com.mobile.server.lab5.dto.ActivityDto;
import com.mobile.server.lab5.entity.ActivityEntity;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ActivityMapper {
    ActivityEntity toEntity(ActivityDto activityDto);
    ActivityDto toDto(ActivityEntity activityEntity);
    List<ActivityDto> toDtos(List<ActivityEntity> activityEntities);
}
