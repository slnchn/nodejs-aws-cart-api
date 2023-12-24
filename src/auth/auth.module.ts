import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthService } from './auth.service';
import { BasicStrategy, JwtStrategy, LocalStrategy } from './strategies';

import { JWT_CONFIG } from '../constants';
import { UsersModule } from '../users/users.module';
import { User as UserEntity } from 'src/entities/User.entity';

const { secret, expiresIn } = JWT_CONFIG;

@Module({
  imports: [
    UsersModule,
    PassportModule, //.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({ secret, signOptions: { expiresIn } }),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  providers: [AuthService, JwtStrategy, LocalStrategy, BasicStrategy],
  exports: [AuthService],
})
export class AuthModule {}
