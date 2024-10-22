import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class AssignServicesDto {
    @ApiProperty()
    @IsArray()
    @IsString({ each: true }) // Asegúrate de que cada elemento en el array sea una cadena
    serviceIds: string[];
}