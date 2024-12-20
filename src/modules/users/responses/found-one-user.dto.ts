import { ApiProperty } from '@nestjs/swagger';
import { UserStub } from 'src/stubs/user';

export class FoundOneUserResponseDTO {
  @ApiProperty({
    example: UserStub,
  })
  public readonly data: typeof UserStub;
}
