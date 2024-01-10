package com.mobile.server.lab5.service;

import com.mobile.server.lab5.dto.ActivityDto;
import com.mobile.server.lab5.dto.ResponseDto;
import com.mobile.server.lab5.entity.ActivityEntity;
import com.mobile.server.lab5.mapper.ActivityMapper;
import com.mobile.server.lab5.repository.ActivityRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ActivityService {
    private final ActivityRepository activityRepository;
    private final ActivityMapper activityMapper;

    public ActivityService(ActivityRepository activityRepository, ActivityMapper activityMapper) {
        this.activityRepository = activityRepository;
        this.activityMapper = activityMapper;
    }

    public List<ActivityDto> getActivities(){
        return this.activityMapper.toDtos(this.activityRepository.findAll());
    }

    public ActivityDto getActivity(Integer id){
        return this.activityMapper.toDto(this.activityRepository.findById(id).get());
    }

    public ActivityDto addActivity(ActivityDto activityDto){
        return this.activityMapper.toDto(this.activityRepository.save(this.activityMapper.toEntity(activityDto)));
    }

    public ResponseDto deleteActivityById(Integer id){
        ResponseDto responseDto = new ResponseDto();
        if(!this.activityRepository.existsById(id)){
            responseDto.setErrorMessage("There is no activity with this id!");
            return responseDto;
        }
        this.activityRepository.deleteById(id);
        responseDto.setSuccessMessage("Activity with id=" + id + " successfully deleted!");
        return responseDto;
    }

    @Transactional
    public ResponseDto deleteActivityByTitle(String title){
        ResponseDto responseDto = new ResponseDto();
        this.activityRepository.deleteByTitle(title);
        responseDto.setSuccessMessage("Activity with title=" + title + " successfully deleted!");
        return responseDto;
    }

    public ActivityDto updateActivity(ActivityDto activityDto){
        ActivityEntity activityEntity = this.activityRepository.findActivityByTitle(activityDto.getTitle());
        activityEntity.setCategory(activityDto.getCategory());
        activityEntity.setDate(activityDto.getDate());
        activityEntity.setDescription(activityDto.getDescription());
        activityEntity.setLocation(activityDto.getLocation());
        activityEntity.setFeedback(activityDto.getFeedback());

        return this.activityMapper.toDto(this.activityRepository.save(activityEntity));
    }
}
