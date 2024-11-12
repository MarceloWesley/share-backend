import { ApiProperty } from '@nestjs/swagger';

import { UserDTO } from '../dtos';
import { PaginationMetaDTO } from 'src/shared/dtos';

export class FoundAllUserResponseDTO {
  @ApiProperty({ type: UserDTO, isArray: true })
  public readonly data: UserDTO[];

  @ApiProperty()
  public readonly meta: PaginationMetaDTO;
}
