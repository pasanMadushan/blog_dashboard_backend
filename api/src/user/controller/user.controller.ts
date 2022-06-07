import { Body, Controller, DefaultValuePipe, Delete, Get, HttpServer, HttpStatus, Param, ParseIntPipe, Post, Put, Query, Res, UseGuards } from '@nestjs/common';
import { hasRoles } from 'src/auth/decorator/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guards';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserRole } from '../models/user.entity';
import { User } from '../models/user.interface';
import { UserService } from '../service/user.service';
import { Pagination } from 'nestjs-typeorm-paginate';

@Controller('user')
export class UserController {

    constructor(private userService: UserService){}

    @Post()
    create(@Body() user:User):Promise<User | Object>{
        delete(user.role);
        return this.userService.create(user).then(
            (user:User) => user
        ).catch(error => ({ err : error.message}))
    }

    @Post('login')
    async login(@Body() user:User, @Res() res){

        let tempUser = await this.userService.findByMail(user.email)
        if (tempUser){
            let userStatus = await this.userService.checkUserStatus(user.email)
            if (userStatus){
                let loginUser = await this.userService.login(user)
                if (loginUser == 'Wrong Credentials'){
                    return res.status(HttpStatus.BAD_REQUEST).send("Wrong password")
                }
                return  res.status(HttpStatus.OK).json({"token":loginUser})
            }
            return res.status(HttpStatus.UNAUTHORIZED).send("User inactive");
        }
        return res.status(HttpStatus.BAD_REQUEST).send("User not exist");
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


    // get all users with pagination

    // @hasRoles(UserRole.ADMIN)
    // @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('')
    async index(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
        ): Promise<Pagination<User>> {
            limit = limit > 100 ? 100 : limit;
            return this.userService.paginate({
                page,
                limit,
                route: '/user',
            });
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
            delete(user.role)
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

    @hasRoles(UserRole.ADMIN)
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Put('update-role/:id')
    async makeAdmin(@Param() params){
        try {
            return{
                success:true,
                message: "Successfully make the user as admin",
                data: await this.userService.updateOne(params.id, {role:UserRole.ADMIN})
            }
        } catch (error) {
            return{
                success:false,
                message: "Couldn't update the user",
                error:error
            }
        }
    }

    @hasRoles(UserRole.ADMIN)
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Put('activate-user/:id')
    async activateUser(@Param() params){
        try {
            return{
                success:true,
                message: "Successfully activated the user",
                data: await this.userService.updateOne(params.id, {active:true})
            }
        } catch (error) {
            return{
                success:false,
                message: "Couldn't activate the user",
                error:error
            }
        }
    }






}
