package com.mobile.server.lab5.controller;

import com.mobile.server.lab5.dto.ActivityDto;
import com.mobile.server.lab5.dto.ResponseDto;
import com.mobile.server.lab5.service.ActivityService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/activity")
@CrossOrigin
public class ActivityController {
    private final ActivityService activityService;

    public ActivityController(ActivityService activityService){
        this.activityService = activityService;
    }

    @GetMapping("/get-activities")
    public ResponseEntity<List<ActivityDto>> getActivities(){
        return ResponseEntity.ok(this.activityService.getActivities());
    }

    @GetMapping("/get-activity")
    public ResponseEntity<ActivityDto> getActivity(@RequestParam Integer id){
        return ResponseEntity.ok(this.activityService.getActivity(id));
    }

    @PostMapping("/add-activity")
    public ResponseEntity<ActivityDto> addActivity(@RequestBody ActivityDto activityDto){
        return ResponseEntity.ok(this.activityService.addActivity(activityDto));
    }

    @DeleteMapping("/delete-activity")
    public ResponseEntity<ResponseDto> deleteActivity(@RequestParam String title){
        return ResponseEntity.ok(this.activityService.deleteActivityByTitle(title));
    }

    @PutMapping("/update-activity")
    public ResponseEntity<ActivityDto> updateActivity(@RequestBody ActivityDto activityDto){
        return ResponseEntity.ok(this.activityService.updateActivity(activityDto));
    }
}
