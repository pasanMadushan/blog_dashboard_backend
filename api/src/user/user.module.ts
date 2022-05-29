import { Module } from '@nestjs/common';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { UserEntity } from 'models/user.entity';
import { TypeOrmModule } from 'typeorm';

@Module({
  imports:[
    TypeOrmModule.forFeature([UserEntity])
  ]
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}
