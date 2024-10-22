import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceController } from '../controllers/service.controller';
import { ServiceService } from 'services/service.service';
import { Service } from 'entities/service.entity';
import { CommonModule } from 'common/common.module';
import { AuthService } from 'services/auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([Service]), CommonModule],
  controllers: [ServiceController],
  providers: [AuthService, ServiceService],
  exports: [TypeOrmModule,ServiceService]
})
export class ServiceModule { }
