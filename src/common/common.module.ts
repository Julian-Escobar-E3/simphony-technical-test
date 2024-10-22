import { Global, Module } from '@nestjs/common';
import { ErrorService } from './services/error.service';

@Global()
@Module({
  imports: [],
  providers: [
    ErrorService,
  ],
  exports: [ErrorService],
})
export class CommonModule { }
