import {
  ConflictException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';

//* Mapa de códigos de error con sus mensajes y excepciones asociadas

export const errorMap: {
  [key: string]: { exception: any; message: string };
} = {
  '23505': {
    exception: ConflictException,
    message: 'Duplicate entry in the database.',
  },
  '23503': {
    exception: BadRequestException,
    message: 'Foreign key constraint violation.',
  },
  '23514': {
    exception: ForbiddenException,
    message: 'Check constraint violation.',
  },
  '42703': {
    exception: BadRequestException,
    message: 'Query Failed Error',
  },
};
