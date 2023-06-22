
import { validate } from 'class-validator';
import { Request, Response } from 'express';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto, LoginUserDto } from '../dtos';
import { mapErrors } from '../helpers/map-errors.helper';
import { generedJWT } from '../helpers/jwt.helper';
import { RequestWithUserId } from '../interfaces/request.interface';
import { User } from '../entities/user.entity';

export const register = async ( req: Request, res: Response) => {
    
    const createUserDto = new CreateUserDto( req.body )

    const errors = await validate(createUserDto);

    if ( errors.length > 0 ) {
        return res.status(400).json({ 
            status: false,
            errors: mapErrors(errors) 
        })
    }


    try {

        const user = new User();
            
        user.name = createUserDto.name;
        user.lastName = createUserDto.lastName;
        user.username = createUserDto.username;
        user.department = createUserDto.department;
        await user.save();

        const accessToken = await generedJWT( user.id! );

        res.status(200).json({
            status: true,
            user,
            accessToken
        }) 
    } catch (error) {
        handleExceptions(error, res);
    }

}




export const validateUsername = async ( req: Request, res: Response) => {

    const { username } = req.params;




    try {

        const user = await User.findOne({ username })


        if ( !user ) {
            return res.status(404).json({
                status: false,
                message: `User with username "${username}" not found`
            })
        }

        const accessToken = await generedJWT( user.id! );

        res.status(200).json({
            status: true,
            user,
            accessToken
        }) 

    } catch (error) {
        handleExceptions(error, res);
    }

}




export const login = async ( req: Request, res: Response) => {

    const { username } = new LoginUserDto( req.body )

    const errors = await validate({ username });

    if ( errors.length > 0 ) {
        return res.status(400).json({ 
            status: false,
            errors: mapErrors(errors) 
        })
    }


    try {

        const user = await User.findOne({ username })


        if ( !user ) {
            return res.status(404).json({
                status: false,
                message: `User with username "${username}" not found`
            })
        }

        const accessToken = await generedJWT( user.id! );

        res.status(200).json({
            status: true,
            user,
            accessToken
        }) 

    } catch (error) {
        handleExceptions(error, res);
    }

}



export const renew = async ( req: RequestWithUserId, res: Response) => {


    const id = req.id;

    const accessToken = await generedJWT( id! );

    const user = await User.findById(id);

    if ( !user ) {
        return res.status(404).json({
            status: false,
            message: `User with id "${ id }" not found`
        })
    }


    res.json({
        status: true,
        user,
        accessToken
    }) 

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




