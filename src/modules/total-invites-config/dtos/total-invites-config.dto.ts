import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { CommonFields } from 'src/shared/dtos';

export class TotalInvitesConfigDTO extends OmitType(CommonFields, [
  'deletedAt',
]) {
  @ApiProperty({
    description: 'Number of total invites available',
    example: '5',
  })
  @IsString()
  public readonly total_invites: number;
}
