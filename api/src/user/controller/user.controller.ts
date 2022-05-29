import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { User } from '../models/user.interface';
import { UserService } from '../service/user.service';

@Controller('user')
export class UserController {

    constructor(private userService: UserService){}

    @Post()
    create(@Body() user:User):Promise<User | Object>{
        return this.userService.create(user).then(
            (user:User) => user
        ).catch(error => ({ err : error.message}))
    }

    @Post('login')
    login(@Body() user:User):Promise<Object>{
        return this.userService.login(user).then(
            (jwt:string) => {
                return { access_token : jwt }
            }
        )
    }

    @Get(':id')
    async findOne(@Param() params){
        try {
            return{
                success:true,
                message: "Successfully fetched user data",
                data: await this.userService.findOne(params.id)
            }
        } catch (error) {
            return{
                success:false,
                message: "Couldn't find user",
                error:error
            }
        }
    }

    @Get()
    async findAll(){
        try {
            return{
                success:true,
                message: "Successfully fetched users",
                data: await this.userService.findAll()
            }
        } catch (error) {
            return{
                success:false,
                message: "Couldn't fetch users",
                error:error
            }
        }
    }

    @Delete(':id')
    async deleteOne(@Param() params){
        try {
            return{
                success:true,
                message: "Successfully deleted the user",
                data: await this.userService.deleteOne(params.id)
            }
        } catch (error) {
            return{
                success:false,
                message: "Couldn't delete the user",
                error:error
            }
        }
    }

    @Put(':id')
    async updateOne(@Param() params, @Body() user:User){
        try {
            return{
                success:true,
                message: "Successfully updated the user",
                data: await this.userService.updateOne(params.id, user)
            }
        } catch (error) {
            return{
                success:false,
                message: "Couldn't update the user",
                error:error
            }
        }
    }






}
