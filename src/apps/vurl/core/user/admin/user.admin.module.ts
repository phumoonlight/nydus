import { Module } from '@nestjs/common';
import { UserService } from './user.admin.service';
import { UserAdminController } from './user.admin.controller';

@Module({
  controllers: [UserAdminController],
  providers: [UserService],
})
export class UserAdminModule {}
