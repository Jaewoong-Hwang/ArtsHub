package com.example.demo.project.dto;

import com.example.demo.project.entity.Project;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MyProjectDto {
    private Long id;
    private String title;
    private String slug;
    private String status;
    private int capacity;
    private int currentParticipants;
    private String thumbnail;

    public static MyProjectDto from(Project p) {
        return new MyProjectDto(
                p.getId(),
                p.getTitle(),
                p.getSlug(),
                p.getStatus(),
                p.getCapacity(),
                p.getParticipants().size(),
                p.getThumbnail()
        );
    }
}
