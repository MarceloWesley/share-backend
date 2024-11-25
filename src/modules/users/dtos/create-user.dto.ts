import { IsNotEmpty, IsOptional } from 'class-validator';

import { UserDTO } from './user.dto';
import { IntersectionType, PickType } from '@nestjs/swagger';

class DefaultCreatedCustomerDTO extends PickType(UserDTO, [
  'name',
  'email',
  'password',
] as const) {}

class NewCreateCustomerDTO extends PickType(UserDTO, [
  'name',
  'email',
  'password',
] as const) {
  @IsNotEmpty()
  public readonly name: string;

  @IsNotEmpty()
  public readonly email: string;

  @IsNotEmpty()
  public readonly password: string;

  @IsOptional()
  public readonly registered_code: string;
}

export class CreateUserDTO extends IntersectionType(
  DefaultCreatedCustomerDTO,
  NewCreateCustomerDTO,
) {}
