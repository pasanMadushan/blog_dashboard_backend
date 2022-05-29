import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/models/user.interface';
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
     
    constructor(private readonly jwtService:JwtService){}

    async generateJWT(user:User){
        try {
            return await this.jwtService.signAsync({user});
        } 
        catch (error) {
            throw error;
        }
    }

    hashPassword(password:string){
        try {
            bcrypt.hash(password, 12)
        } 
        catch (error) {
            throw error
        }
    }

    comparePassword(password:string, hash:string){
        try {
            bcrypt.compare(password,hash);
        } 
        catch (error) {
            throw error
        }
    }
}
