import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { userEntityModule } from './user.entity';

@Module({
  imports: [userEntityModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
