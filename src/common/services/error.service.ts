import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { errorMap } from 'common/utilities/error-mapper';

@Injectable()
export class ErrorService {

  handleDBErrors(error: any, fileName: string): never {
    // Creamos el logger con el contexto proporcionado (el nombre del archivo)
    const logger = new Logger(fileName);
    const errorInfo = errorMap[error.code];
    if (errorInfo)
      throw new errorInfo.exception(errorInfo.message, error.detail);

    // Registro de errores no mapeados
    logger.error(
      `Unhandled DB Error: ${error.detail || error.message} ${error.code || error.status}`,
    );
    throw new InternalServerErrorException(
      'Unexpected error, please check server logs.',
    );
  }
}
