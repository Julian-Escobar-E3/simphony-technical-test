import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from '../auth/interfaces/jwt-payload.interface';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto, LoginUserDto, UpdateUserDto } from '../DTOs/auth-dto';
import { plainToInstance } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import { User } from '../entities/user.entity';
import { ErrorService } from 'common/services/error.service';
import { IMessageResponse } from 'common/interfaces/message-response.interface';
import { ServiceService } from './service.service';
import { ILoginResponse } from 'auth/interfaces/login-response';


@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly _userRepository: Repository<User>,
    private readonly _errorService: ErrorService,
    private readonly _serviceService: ServiceService,
    private readonly _jwtService: JwtService
  ) {

  }

  async register(createUserDto: CreateUserDto): Promise<User> {
    try {
      const { password, ...userData } = createUserDto;
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = this._userRepository.create({
        ...userData,
        password: hashedPassword,
      });
      const userAdded = await this._userRepository.save(newUser);
      return userAdded;
    } catch (error) {
      this._errorService.handleDBErrors(error, AuthService.name)
    }
  }

  async findAll(): Promise<User[]> {
    try {
      const users = await this._userRepository.find({
        where: { deletedAt: null }, relations: ['services'], order: { createdAt: 'DESC' } //Se muestran en orden desde el ultimo que se creó
      })
      return users;
    } catch (error) {
      this._errorService.handleDBErrors(error, AuthService.name)
    }
  }

  async findOneById(id: string): Promise<User> {
    const user = await this._userRepository.findOne({
      where: { id, deletedAt: null }, relations: ['services'],
    });
    if (!user) throw new NotFoundException('User not found.');
    return user;
  }


  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<IMessageResponse> {
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    const preUser = await this._userRepository.preload({ id, ...updateUserDto });
    if (!preUser) throw new NotFoundException({ EN: 'User not found.', ES: 'Usuario no encontrado.' });
    try {
      await this._userRepository.save(preUser);
      return { message: 'User updated successfully.' };
    } catch (error) {
      this._errorService.handleDBErrors(error, AuthService.name);
    }
  }

  async remove(id: string): Promise<IMessageResponse> {
    await this.findOneById(id);
    await this._userRepository.softDelete(id);
    return { message: 'User was deleted.' }
  }

  async restoreUser(id: string): Promise<IMessageResponse> {
    const result = await this._userRepository.restore(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User not found`);
    }
    return { message: 'User restored.' }
  }


  async assignServices(id: string, serviceIds: string[]): Promise<User> {
    const user = await this.findOneById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const services = await this._serviceService.findIds(serviceIds);
    try {
      user.services.push(...services);
      await this._userRepository.save(user);
      return user;
    } catch (error) {
      this._errorService.handleDBErrors(error, AuthService.name)
    }
  }


  async login(loginUserDto: LoginUserDto): Promise<ILoginResponse> {
    const { password, email } = loginUserDto;
    const loginUser = await this._userRepository.findOne({
      where: { email },
      select: {
        id: true,
        name: true,
        password: true,
        rol: true,
        email: true,
      },
      relations: ['services'],
    });

    if (!loginUser) {
      throw new UnauthorizedException('Not valid credentials (email)',
      );
    }

    if (!bcrypt.compareSync(password, loginUser.password))
      throw new UnauthorizedException('Not valid credentials (password)');

    const user = plainToInstance(User, loginUser);
    const loginResponse = {
      user,
      token: await this.getJwt({ id: loginUser.id }),
    };
    return loginResponse;
  }

  async getJwt(payload: JwtPayload): Promise<string> {
    const token = await this._jwtService.signAsync(payload, {
      expiresIn: '1h',
    });
    return token;
  }
}
