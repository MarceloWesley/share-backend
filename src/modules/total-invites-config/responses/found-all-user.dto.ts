import { ApiProperty } from '@nestjs/swagger';
import { TotalInvitesConfigDTO } from '../dtos';

export class FoundAllTotalInvitesConfigResponseDTO {
  @ApiProperty({ type: TotalInvitesConfigDTO, isArray: true })
  public readonly data: TotalInvitesConfigDTO[];
}
