import { ApiProperty } from '@nestjs/swagger';
import { UserStub } from 'src/stubs/user';

export class UpdatedOneUserResponseDTO {
  @ApiProperty({
    example: UserStub,
  })
  public readonly data: typeof UserStub;
}
