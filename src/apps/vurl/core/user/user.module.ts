import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { userEntityModule } from './user.entity';
import { FirebaseModule } from '../firebase/firebase.module';

@Module({
  imports: [userEntityModule, FirebaseModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
