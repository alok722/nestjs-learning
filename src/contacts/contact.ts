import { Length, IsString, IsNotEmpty, IsEmail } from "class-validator";

export class Contact {

    @IsNotEmpty()
    @Length(3,25)
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    @IsString()
    email: string;

}
