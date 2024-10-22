import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AssignServicesDto, CreateUserDto, LoginUserDto, UpdateUserDto } from '../DTOs/auth-dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'entities/user.entity';
import { ILoginResponse } from 'auth/interfaces/login-response';
import { IMessageResponse } from 'common/interfaces/message-response.interface';
import { ILoginResponseDto } from 'DTOs/auth-dto/login-user.dto';
import { Auth } from 'auth/decorators';
import { ValidRoles } from 'auth/enum/valid-roles';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  @ApiOperation({
    summary: 'Register a new user',
    description: 'Creates a new user with the provided details.',
  })
  @ApiResponse({ status: 201, description: 'User created successfully.', type: User })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.authService.register(createUserDto);
  }

  @Post('login')
  @ApiOperation({
    summary: 'Login user',
    description: 'Authenticates a user and returns a JWT token.',
  })
  @ApiResponse({ status: 200, description: 'User logged in successfully.', type: ILoginResponseDto })
  @ApiResponse({ status: 401, description: 'Invalid credentials.' })
  async login(@Body() loginUserDto: LoginUserDto): Promise<ILoginResponse> {
    return this.authService.login(loginUserDto);
  }

  @Get('all-users')
  @Auth(ValidRoles.admin)
  @ApiOperation({
    summary: 'Get all users',
    description: 'Retrieves a list of all users in the system.',
  })
  @ApiResponse({ status: 200, description: 'List of users retrieved successfully.', type: [User] })
  async findAll(): Promise<User[]> {
    return this.authService.findAll();
  }

  @Get('one-user/:id')
  @Auth(ValidRoles.admin, ValidRoles.user)
  @ApiOperation({
    summary: 'Get a user by ID',
    description: 'Retrieves details of a specific user by ID.',
  })
  @ApiResponse({ status: 200, description: 'User details retrieved successfully.', type: User })
  @ApiResponse({ status: 404, description: 'User not found.' })
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<User> {
    return this.authService.findOneById(id);
  }

  @Patch('update-user/:id')
  @Auth(ValidRoles.admin, ValidRoles.user)

  @ApiOperation({
    summary: 'Update a user by ID',
    description: 'Updates the details of a specific user by ID.',
  })
  @ApiResponse({ status: 200, description: 'User updated successfully.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAuthDto: UpdateUserDto,
  ): Promise<IMessageResponse> {
    return this.authService.update(id, updateAuthDto);
  }

  @Delete('delete-user/:id')
  @Auth(ValidRoles.admin)
  @ApiOperation({
    summary: 'Delete a user by ID',
    description: 'Performs a soft delete of a specific user by ID.',
  })
  @ApiResponse({ status: 200, description: 'User deleted successfully.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<IMessageResponse> {
    return this.authService.remove(id);
  }

  @Post('restore-user/:id')
  @Auth(ValidRoles.admin)
  @ApiOperation({
    summary: 'Restore a deleted user by ID',
    description: 'Restores a previously deleted (soft delete) user.',
  })
  @ApiResponse({ status: 200, description: 'User restored successfully.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  restore(@Param('id', ParseUUIDPipe) id: string): Promise<IMessageResponse> {
    return this.authService.restoreUser(id);
  }

  @Post('assign-services-to-user/:id')
  @Auth(ValidRoles.admin, ValidRoles.user)
  @ApiOperation({
    summary: 'Assign services to a user',
    description: 'Assigns multiple services to a specific user by ID.',
  })
  @ApiResponse({ status: 200, description: 'Services assigned to user successfully.' })
  @ApiResponse({ status: 404, description: 'User or services not found.' })
  async assignServices(
    @Param('id', ParseUUIDPipe) userId: string,
    @Body() assignServicesDto: AssignServicesDto,
  ): Promise<User> {
    return this.authService.assignServices(userId, assignServicesDto.serviceIds);
  }
}
