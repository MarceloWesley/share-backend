import { IsNotEmpty } from 'class-validator';

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
}

export class CreateUserDTO extends IntersectionType(
  DefaultCreatedCustomerDTO,
  NewCreateCustomerDTO,
) {}
