import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class LoginUserDto {

  @ApiProperty()
  @IsString()
  @MinLength(3)
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The password must have a Uppercase, lowercase letter and a number',
  })
  password: string;
}

export class ILoginResponseDto {
  @ApiProperty({ description: 'The user information', type: LoginUserDto })
  user: LoginUserDto;

  @ApiProperty({ description: 'JWT token for authenticated requests' })
  token: string;
}
