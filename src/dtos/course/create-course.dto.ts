

import { IsString, Matches, MaxLength, MinLength } from "class-validator";


export class CreateCourseDto {


    constructor( createCourseDto: CreateCourseDto ){
        this.title = createCourseDto.title;
        this.objective = createCourseDto.objective;
        this.period = createCourseDto.period;
        this.hours = createCourseDto.hours;
        this.instructor = createCourseDto.instructor;
        this.place = createCourseDto.place;
        this.target = createCourseDto.target;
        this.prerequisites = createCourseDto.prerequisites;
    }

    @IsString()
    title: string;

    @IsString()
    objective: string;

    @IsString()
    period: string;

    @IsString()
    place: string;

    hours: number;

    @IsString()
    instructor: string;

    @IsString()
    target: string;
    
    @IsString()
    prerequisites: string;


}