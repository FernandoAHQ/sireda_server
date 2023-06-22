import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";


export class LoginUserDto {

    constructor( loginUserDto: LoginUserDto ) {
        this.username = loginUserDto.username;
    }

    @IsString()
    username: string;




}