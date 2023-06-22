

import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";


export class CreateUserDto {


    constructor( createUserDto: CreateUserDto ){
        this.username = createUserDto.username;
        this.name = createUserDto.name;
        this.lastName = createUserDto.lastName;
        this.department = createUserDto.department;
    }

    @IsString()
    username: string;


    @IsString()
    @MinLength(1)
    name: string;

    @IsString()
    @MinLength(1)
    lastName: string;

    
    @IsString()
    @MinLength(1)
    department: string;


}