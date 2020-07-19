/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService {

    constructor(@InjectModel('User') private UserModel: Model<User>) {}

    addOneUser(user: User) {
        const c = new this.UserModel({...user});
        return c.save();
    }

    getAllUsers(page: number, limit: number) {
        return this.UserModel.find().limit(limit).skip( (page-1) * limit );
    }

    async getUserById(_id) {
        const pr = await this.UserModel.findById(_id);
        if(!pr) {
            throw new NotFoundException();
        }
        return pr;
    }

    updateUserById(_id, body) {
        return this.UserModel.findByIdAndUpdate( _id, body);
    }

    partialUpdateUserById(_id, props) {
        return this.UserModel.update( { _id }, { $set: props });
    }
    
    deleteUserById(_id) {
        return this.UserModel.deleteOne({_id});
    }
}
