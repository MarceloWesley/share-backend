import { ApiProperty } from '@nestjs/swagger';
import { UserStub } from 'src/stubs/user';

export class CreatedOneUserResponseDTO {
  @ApiProperty({
    example: UserStub,
  })
  public readonly data: typeof UserStub;
}
