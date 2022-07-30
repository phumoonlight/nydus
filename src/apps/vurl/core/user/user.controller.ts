import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { Authorization } from '../../vurl.auth';
import { UserService } from './user.service';
import { CreateUserDto, LoginDto, UpdateUserDto } from './user.type';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  async getData(@Authorization() userId: string) {
    const result = await this.userService.getById(userId);
    return {
      value: result,
    };
  }

  @Post('signin')
  async signIn(@Body() dto: LoginDto) {
    const token = await this.userService.signIn(dto);
    return {
      token,
    };
  }

  @Post('signup')
  async signUp(@Body() dto: LoginDto) {
    const token = await this.userService.signUp(dto);
    return {
      token,
    };
  }

  @Patch()
  async update(@Authorization() userId: string, @Body() dto: UpdateUserDto) {
    const result = await this.userService.update(userId, dto);
    return {
      result,
    };
  }
}
