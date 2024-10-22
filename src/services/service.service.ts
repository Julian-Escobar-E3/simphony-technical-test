import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IMessageResponse } from 'common/interfaces/message-response.interface';
import { ErrorService } from 'common/services/error.service';
import { CreateServiceDto } from 'DTOs/service-dto/create-service.dto';
import { UpdateServiceDto } from 'DTOs/service-dto/update-service.dto';
import { Service } from 'entities/service.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(Service) private readonly _serviceRepository: Repository<Service>,
    private readonly _errorService: ErrorService

  ) {

  }
  async create(createServiceDto: CreateServiceDto): Promise<Service> {
    try {
      const newService = this._serviceRepository.create(createServiceDto)
      return await this._serviceRepository.save(newService)
    } catch (error) {
      this._errorService.handleDBErrors(error, ServiceService.name)
    }
  }

  async findAll(): Promise<Service[]> {
    try {
      const services = await this._serviceRepository.find({ where: { deletedAt: null }, relations: ['users'] })
      return services;
    } catch (error) {
      this._errorService.handleDBErrors(error, ServiceService.name)
    }
  }

  async findIds(serviceIds: string[]) {
    const servicesByIds = await this._serviceRepository.findBy({ id: In([...serviceIds]) })
    if (servicesByIds.length === 0) throw new NotFoundException('Service not found.');
    return servicesByIds
  }

  async findOneById(id: string): Promise<Service> {
    const service = await this._serviceRepository.findOne({
      where: { id, deletedAt: null }, relations: ['users']
    });
    if (!service) throw new NotFoundException('Service not found.');
    return service;
  }

  async update(id: string, updateServiceDto: UpdateServiceDto): Promise<IMessageResponse> {
    const preService = await this._serviceRepository.preload({ id, ...updateServiceDto });
    if (!preService) throw new NotFoundException('Service not found.');
    try {
      await this._serviceRepository.save(preService);
      return { message: 'Service updated successfully.' };
    } catch (error) {
      this._errorService.handleDBErrors(error, ServiceService.name);
    }
  }

  async remove(id: string): Promise<IMessageResponse> {
    await this.findOneById(id);
    await this._serviceRepository.softDelete(id);
    return { message: 'Service was deleted.' }
  }

  async restoreService(id: string): Promise<IMessageResponse> {
    const result = await this._serviceRepository.restore(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Service not found`);
    }
    return { message: 'Service restored.' }
  }

}
