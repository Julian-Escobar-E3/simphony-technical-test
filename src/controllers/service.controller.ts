import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { CreateServiceDto } from '../DTOs/service-dto/create-service.dto';
import { UpdateServiceDto } from '../DTOs/service-dto/update-service.dto';
import { ServiceService } from '../services/service.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { Service } from 'entities/service.entity';
import { IMessageResponse } from 'common/interfaces/message-response.interface';
import { Auth } from '../auth/decorators/auth.decorator';
import { ValidRoles } from '../auth/enum/valid-roles';

@ApiTags('Services')
@Controller('service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) { }

  @Post('create-service')
  @Auth(ValidRoles.admin)
  @ApiOperation({
    summary: 'Create a new service',
    description: 'Creates a new service with the provided data.',
  })
  @ApiResponse({
    status: 201,
    description: 'Service created successfully.',
    type: Service,  // Esto asume que `Service` es la entidad de respuesta
  })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  create(@Body() createServiceDto: CreateServiceDto): Promise<Service> {
    return this.serviceService.create(createServiceDto);
  }

  @Get('all-services')
  @Auth(ValidRoles.admin)
  @ApiOperation({
    summary: 'Get all services',
    description: 'Returns a list of all available services.',
  })
  @ApiResponse({
    status: 200,
    description: 'List of services retrieved successfully.',
    type: [Service],
  })
  findAll(): Promise<Service[]> {
    return this.serviceService.findAll();
  }

  @Get('one-service/:id')
  @Auth(ValidRoles.admin)
  @ApiOperation({
    summary: 'Get one service by ID',
    description: 'Returns a specific service based on its ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the service',
    type: 'string',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'Service retrieved successfully.',
    type: Service,
  })
  @ApiResponse({ status: 404, description: 'Service not found.' })
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Service> {
    return this.serviceService.findOneById(id);
  }

  @Patch('update-service/:id')
  @Auth(ValidRoles.admin)
  @ApiOperation({
    summary: 'Update a service by ID',
    description: 'Updates the details of a specific service based on its ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the service',
    type: 'string',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'Service updated successfully.',
  })
  @ApiResponse({ status: 404, description: 'Service not found.' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateServiceDto: UpdateServiceDto,
  ): Promise<IMessageResponse> {
    return this.serviceService.update(id, updateServiceDto);
  }

  @Delete('delete-service/:id')
  @Auth(ValidRoles.admin)
  @ApiOperation({
    summary: 'Delete a service by ID',
    description: 'Performs a soft delete on a specific service based on its ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the service',
    type: 'string',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'Service deleted successfully.',
  })
  @ApiResponse({ status: 404, description: 'Service not found.' })
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<IMessageResponse> {
    return this.serviceService.remove(id);
  }

  @Post('restore-service/:id')
  @Auth(ValidRoles.admin)
  @ApiOperation({
    summary: 'Restore a service by ID',
    description: 'Restores a soft-deleted service based on its ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the service',
    type: 'string',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'Service restored successfully.',
  })
  @ApiResponse({ status: 404, description: 'Service not found.' })
  restore(@Param('id', ParseUUIDPipe) id: string): Promise<IMessageResponse> {
    return this.serviceService.restoreService(id);
  }
}