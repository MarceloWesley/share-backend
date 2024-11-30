import { UserStub } from '@/stubs/user';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatedOneUserResponseDTO {
  @ApiProperty({
    example: UserStub,
  })
  public readonly data: typeof UserStub;
}
