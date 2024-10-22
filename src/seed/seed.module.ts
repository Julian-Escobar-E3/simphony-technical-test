import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { AuthModule } from 'modules/auth.module';
import { ServiceModule } from 'modules/service.module';

@Module({
  imports: [AuthModule, ServiceModule],
  controllers: [SeedController],
  providers: [SeedService],
})
export class SeedModule {}
