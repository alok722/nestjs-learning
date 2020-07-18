import { Length, IsString, IsNotEmpty, IsEmail, IsPhoneNumber } from "class-validator";
import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import {  } from "mongoose";

@Schema()
export class User {

    @Prop()
    @IsNotEmpty()
    @Length(3,25)
    @IsString()
    name: string;

    @Prop({unique: true})
    @IsEmail()
    @IsNotEmpty()
    @IsString()
    email: string;

    @Prop({unique: true})
    @IsPhoneNumber('ZZ')
    @IsNotEmpty()
    @IsString()
    phone: string;

    @Prop()
    city: string;
    @Prop()
    state: string;
    @Prop()
    country: string;
}

export const UserSchema = SchemaFactory.createForClass(User);