import { UserStub } from '@/stubs/user';
import { ApiProperty } from '@nestjs/swagger';

export class FoundOneUserResponseDTO {
  @ApiProperty({
    example: UserStub,
  })
  public readonly data: typeof UserStub;
}
