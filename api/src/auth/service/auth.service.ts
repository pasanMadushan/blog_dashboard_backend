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

    async hashPassword(password:string){
        try {
            return await bcrypt.hash(password, 12)
        } 
        catch (error) {
            throw error
        }
    }

    async comparePassword(password:string, hash:string):Promise<any | boolean>{
        try {
            return await bcrypt.compare(password,hash);
        } 
        catch (error) {
            throw error
        }
    }
}
