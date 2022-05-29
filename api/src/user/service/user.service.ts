import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from } from 'node-fetch/node_modules/form-data';
import { Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { UserEntity } from '../models/user.entity';
import { User } from '../models/user.interface';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>
    ){}

    async create(user:User): Promise<User>{
        try{
            return await this.userRepository.save(user);
        }
        catch(err){
            throw err;
        }   
    }

    async findOne(id:number) : Promise<User>{ 
        try{
            return await this.userRepository.findOne(id);
        }
        catch(err){
            throw err;
        }  
    }

    async findAll() : Promise<User[]>{ 
        try{
            return await this.userRepository.find();
        }
        catch(err){
            throw err;
        }  
    }
    
    async deleteOne(id:number) : Promise<any>{ 
        try{
            return await this.userRepository.delete(id);
        }
        catch(err){
            throw err;
        }  
    }

    async updateOne(id:number, user:User) : Promise<any>{ 
        try{
            return await this.userRepository.update(id,user);
        }
        catch(err){
            throw err;
        }  
    }
}
