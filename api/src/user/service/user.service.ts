import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/service/auth.service';
import { Repository } from 'typeorm';
import { UserEntity } from '../models/user.entity';
import { User } from '../models/user.interface';
import {
    paginate,
    Pagination,
    IPaginationOptions,
  } from 'nestjs-typeorm-paginate';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
        private authService:AuthService
    ){}


    create(user:User){
            return this.authService.hashPassword(user.password).then(
                (newPassword)=>{
                    const newUser = new UserEntity();
                    newUser.name = user.name;
                    newUser.username = user.username;
                    newUser.role = user.role;
                    newUser.email = user.email;
                    newUser.password = newPassword;

                    return this.userRepository.save(newUser).then(
                        (user:User) =>{
                            const {password, ...result} = user;
                            return result;
                        }
                    ) 
                    .catch(error => {throw error;})
                }
            )
            .catch(error => {throw error;})
    }


    findOne(id:number) : Promise<User>{ 
        return this.userRepository.findOneBy({id}).then(
            (user:User)=>{
                const {password, ...result} = user;
                return result; 
            }
        ).catch( error =>{throw error});
        }


    findAll() : Promise<User[]>{ 
            return this.userRepository.find().then(
                (users:User[]) =>{
                    users.forEach(function (v) { delete v.password });
                    return users;
                }
            ).catch( error =>{throw error});
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
    
    login(user:User){
        return this.validateUser(user.email, user.password).then(
            (user:User) =>{
                if (user){
                    return this.authService.generateJWT(user).then(
                        jwt => jwt
                    )
                }else{
                    return 'Wrong Credentials'
                }
            }
        )
    }

    validateUser(email:string, password:string):Promise<User>{
        return this.findByMail(email).then(
            (user:User)=>{
                return this.authService.comparePassword(password, user.password).then(
                    (match:boolean) =>{
                        if (match){
                            const {password, ...result} = user;
                            return result;
                        }
                    }
                )
            }
        )
    }

    checkUserStatus(email:string):Promise<boolean>{
        return this.findByMail(email).then(
            (user:User) =>{
                return user.active;
            }
        )
    }

    async findByMail(email:string) : Promise<User>{ 
        try{
            return await this.userRepository.findOneBy({email});
        }
        catch(err){
            throw err;
        }  
    }

    async paginate(options: IPaginationOptions): Promise<Pagination<User>> {
        return paginate<User>(this.userRepository, options).then(
            (users:Pagination<User>) =>{
                users.items.forEach(function (v) { delete v.password });
                return users;
            }
        )
        .catch( error =>{throw error});
      }

    
}
