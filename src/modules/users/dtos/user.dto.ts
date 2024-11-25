import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';
import { CommonFields } from 'src/shared/dtos';

export class UserDTO extends CommonFields {
  @ApiProperty({
    description: 'Username',
    example: 'John Doe',
  })
  @IsString()
  public readonly name: string;

  @ApiProperty({
    description: 'User E-mail',
    example: 'john_doe@hotmai.com',
  })
  @IsString()
  @IsEmail()
  public readonly email: string;

  @ApiProperty({
    description: 'User password',
    example: 'Example123*',
  })
  @IsString()
  @MinLength(6)
  @MaxLength(512)
  @IsStrongPassword()
  public readonly password: string;

  @ApiProperty({
    description: 'User remaining invites',
    example: 3,
  })
  @IsNumber()
  public readonly remaining_invites: number;

  @ApiProperty({
    description: 'User invite code',
    example: 'CHJKR8',
  })
  @IsString()
  @MaxLength(6)
  public readonly invite_code: string;

  @ApiProperty({
    description: 'Registration code sender',
    example: 12,
    nullable: true,
  })
  @IsNumber()
  @IsOptional()
  public readonly invited_by: number | null;
}
