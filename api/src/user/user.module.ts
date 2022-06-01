import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guards';
import { JwtStrategy } from 'src/auth/guards/jwt-strategy';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserController } from './controller/user.controller';
import { UserEntity } from './models/user.entity';
import { UserService } from './service/user.service';


@Module({
  imports:[
    TypeOrmModule.forFeature([UserEntity]),
    AuthModule
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}
