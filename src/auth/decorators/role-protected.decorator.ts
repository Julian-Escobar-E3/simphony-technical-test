import { SetMetadata } from '@nestjs/common';
import { META_ROLES } from '../constants/meta-roles';
import { ValidRoles } from '../enum/valid-roles';

export const RoleProtected = (...args: ValidRoles[]) => {
  return SetMetadata(META_ROLES, args);
};
