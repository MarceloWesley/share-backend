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

// class DefaultUpdatedCustomerDTO extends OmitType(UserDTO, [
//   'id',
//   'createdAt',
//   'updatedAt',
//   'deletedAt',
//   'invite_code',
//   'email',
// ] as const) {}

// class NewUpdateCustomerDTO extends OmitType(UserDTO, [
//   'id',
//   'createdAt',
//   'updatedAt',
//   'deletedAt',
//   'invite_code',
//   'email',
// ] as const) {
//   @IsOptional()
//   public readonly name: string;

//   @IsOptional()
//   public readonly password: string;

//   @IsOptional()
//   public readonly remaining_invites: number;
// }

// export class UpdateOneUserByIdDTO extends IntersectionType(
//   DefaultUpdatedCustomerDTO,
//   NewUpdateCustomerDTO,
// ) {}
