import { OmitType, PartialType } from '@nestjs/swagger';

import { UserDTO } from './user.dto';

export class UpdateOneUserByIdDTO extends PartialType(
  OmitType(UserDTO, [
    'id',
    'createdAt',
    'updatedAt',
    'deletedAt',
    'invite_code',
    'email',
  ]),
) {}
