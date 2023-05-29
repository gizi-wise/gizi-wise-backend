import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AdminService } from '../admin/admin.service';
import { JwtService } from '@nestjs/jwt';
import { HashService } from '@common/utilities/hash/hash.service';
import { UserService } from '@gizi-wise/user/user.service';
import { FirebaseService } from '@common/firebase/firebase.service';
import { FirebaseVerifyTokenResultDto } from '@common/firebase/firebase.dto';
import { CreateUserDto } from '@gizi-wise/user/dto/create-user.dto';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class AuthService {
  private readonly errorMessages = {
    notFound: 'User not found',
    deleted: 'User is deleted',
    expiredJwt: 'Expired JWT token',
  };
  constructor(
    private readonly adminService: AdminService,
    private readonly jwtService: JwtService,
    private readonly hashService: HashService,
    private readonly userService: UserService,
    private readonly firebaseService: FirebaseService,
  ) {}

  async validateAdmin(username: string, pass: string) {
    try {
      const { password, ...result } = await this.adminService
        .findOneByEmailOrUsername(username, true)
        .catch(() => {
          throw new BadRequestException('Credential is not valid');
        });
      const isPasswordMatching = await this.hashService.compare(pass, password);
      if (!isPasswordMatching) {
        throw new BadRequestException('Credential is not valid');
      }
      return result;
    } catch (error) {
      throw error;
    }
  }

  async login(admin: any) {
    return {
      id: admin.id,
      role: admin.role,
      accessToken: this.jwtService.sign(admin),
    };
  }

  async verifyIdToken(idToken: string) {
    try {
      const decodedToken = (await this.firebaseService.verifyIdToken(
        idToken,
      )) as FirebaseVerifyTokenResultDto;
      const currentTime = new Date().getTime() / 1000;
      if (!decodedToken.exp || decodedToken.exp < currentTime) {
        throw new UnauthorizedException(this.errorMessages.expiredJwt);
      }
      const createUserDto: CreateUserDto = {
        email: decodedToken.email,
        name: decodedToken.name,
        image: decodedToken.picture,
        id: decodedToken.uid,
      };
      const { user, isNewAccount } = await this.userService.findOrCreate(
        createUserDto,
      );
      if (!user) {
        throw new NotFoundException(this.errorMessages.deleted);
      }
      return {
        id: user.id,
        name: user.name,
        role: user.role,
        isNewAccount,
        accessToken: this.jwtService.sign(instanceToPlain(user)),
      };
    } catch (error) {
      throw error;
    }
  }
}
