import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Service } from 'entities/service.entity';
import { User } from 'entities/user.entity';
import { Repository } from 'typeorm';
import { initialData } from './data/data';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async runSeed() {
    await this.#deleteTables();
    await this._insertUsers();
    await this._insertServices();
    return 'SEED EXECUTED';
  }

  async #deleteTables() {
    const serviceQueryBuilder = this.serviceRepository.createQueryBuilder();
    await serviceQueryBuilder.delete().where({}).execute();

    const userQueryBuilder = this.userRepository.createQueryBuilder();
    await userQueryBuilder.delete().where({}).execute();
  }

  private async _insertUsers() {
    const seedUsers = initialData.users;
    const users: User[] = [];
    seedUsers.forEach((user) => {
      users.push(this.userRepository.create(user));
    });
    const dbUsers = await this.userRepository.save(seedUsers);
    return dbUsers[0];
  }

  private async _insertServices() {
    const seedServices = initialData.services;
    const services: Service[] = [];
    seedServices.forEach((service) => {
      services.push(this.serviceRepository.create(service));
    });
    const dbServices = await this.serviceRepository.save(seedServices);
    return dbServices[0];
  }
}
