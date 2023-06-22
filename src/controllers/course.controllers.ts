
import { validate } from 'class-validator';
import { Request, Response } from 'express';
import * as bcrypt from 'bcryptjs';
import { mapErrors } from '../helpers/map-errors.helper';
import { generedJWT } from '../helpers/jwt.helper';
import { RequestWithUserId } from '../interfaces/request.interface';
import { Course } from '../entities/course.entity';
import { CreateCourseDto } from '../dtos/course/create-course.dto';
import { User } from '../entities/user.entity';

export const register = async ( req: Request, res: Response) => {
    
    const createCoruseDto = new CreateCourseDto( req.body )

    const errors = await validate(createCoruseDto);

    if ( errors.length > 0 ) {
        return res.status(400).json({ 
            status: false,
            errors: mapErrors(errors) 
        })
    }


    try {

        const course = new Course();
            
        course.title = createCoruseDto.title;
        course.objective = createCoruseDto.objective;
        course.place = createCoruseDto.place;
        course.period = createCoruseDto.period;
        course.target = createCoruseDto.target;
        course.hours = createCoruseDto.hours;
        course.instructor = createCoruseDto.instructor;
        course.prerequisites = createCoruseDto.prerequisites;

        await course.save();


        res.status(200).json({
            status: true,
            course,
        }) 
    } catch (error) {
        handleExceptions(error, res);
    }

}

export const signup = async (req: Request, res: Response) => {

    const {user, course} = req.body;

    try {
        const courseExists = await Course.findById(course);
        const userExists = await User.findById(user);

        if(!courseExists || !userExists){
           return res.status(404).json({
                status: false,
                message: 'Error',
            }) 
        }

        for(let i = 0; i < courseExists.users.length; i++){
            console.log(courseExists.users[i])
            if(courseExists.users[i].toString().includes(user)){
                return res.status(200).json({
                    status: false,
                    message: "Ya estás inscrito a este curso",
                }) 
            }
        }

        courseExists?.users.push(userExists.id);

        await courseExists.save();

        res.status(200).json({
            status: true,
            message: "Te has inscrito al curso: " + courseExists.title,
        }) 

    } catch (error) {
        handleExceptions(error, res);
    }
}

export const findAll = async (req: Request, res: Response) => {

    try {
        const courses = await Course.find({});


        res.status(200).json({
            status: true,
            courses,
        }) 
    } catch (error) {
        handleExceptions(error, res);
    }
}


export const findOne = async (req: Request, res: Response) => {

    const {id} = req.params;

    if(!id)
        return res.status(404).json({
            status: false,
            message: "Nope",
        }) 

    try {
        const course = await Course.findById(id);

        res.status(200).json({
            status: true,
            course,
        }) 
    } catch (error) {
        handleExceptions(error, res);
    }
}


const handleExceptions = ( error: any, res: Response ) => {
    if ( error.code == '23505' ) {
        return res.status(400).json({
            status: false,
            message: `${ error.detail }`
        })
    }

    console.log(error)

    return res.status(500).json({
        status: false,
        message: `Unexpected error, check server logs.`
    })
  }




