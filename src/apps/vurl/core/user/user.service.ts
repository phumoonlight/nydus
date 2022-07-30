import { createToken } from '@/common/jwt';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FirebaseService } from '../firebase/firebase.service';
import { User, UserDocument } from './user.entity';
import { CreateUserDto, LoginDto, LoginType, UpdateUserDto } from './user.type';

@Injectable()
export class UserService {
  constructor(
    private firebaseService: FirebaseService,
    @InjectModel(User.name)
    private userModel: Model<UserDocument>
  ) {}

  async getById(uid: string) {
    const result = await this.userModel.findById(uid);
    return result;
  }

  async signIn(dto: LoginDto) {
    if (![LoginType.Guest, LoginType.Google].includes(dto.type)) {
      return new HttpException('invalid login type', HttpStatus.UNAUTHORIZED);
    }
    if (dto.type === LoginType.Google) {
      const decodedToken = await this.firebaseService.verifyIdToken(dto.token);
      return decodedToken.sub;
    }
    // default: sign in as guest
    const user = await this.userModel.findOne({ username: dto.token });
    if (!user) {
    }
    const token = createToken({
      sub: user.id,
    });
    return token;
  }

  async signUp(dto: LoginDto) {
    if (![LoginType.Guest, LoginType.Google].includes(dto.type)) {
      return new HttpException('invalid login type', HttpStatus.UNAUTHORIZED);
    }
    if (dto.type === LoginType.Google) {
      const decodedToken = await this.firebaseService.verifyIdToken(dto.token);
      const newUser = await this.userModel.create({
        uname: this.generateNewUsername('google'),
        dname: decodedToken.name,
        auth_type: LoginType.Google,
      });
      const token = createToken({
        sub: newUser.id,
        auth_type: 'google',
      });
      return token;
    }
    const newUser = await this.userModel.create({
      uname: this.generateNewUsername(),
      dname: 'Guest',
    });
    const token = createToken({
      sub: newUser.id,
      auth_type: 'guest',
    });
    return token;
  }

  async update(id: string, dto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  generateNewUsername(prefix = 'guest') {
    const randomizedNumber = Math.random().toString().slice(2, 7);
    const username = `${prefix}.${randomizedNumber}.${Date.now()}`;
    return username;
  }
}
