import { UserStubWithDeletedAt } from '@/stubs/user';
import { ApiProperty } from '@nestjs/swagger';

export class DeletedOneUserResponseDTO {
  @ApiProperty({
    example: UserStubWithDeletedAt,
  })
  public readonly data: typeof UserStubWithDeletedAt;
}
