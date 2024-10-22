import { IsDecimal, IsIn, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateServiceDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty()
    @IsDecimal({ decimal_digits: '0,2' })
    @IsNotEmpty()
    cost: number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @IsIn(['Tecnología', 'Salud', 'Hogar'], { each: true })
    category: string;


}
