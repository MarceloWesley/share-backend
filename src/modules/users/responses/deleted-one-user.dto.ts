import { ApiProperty } from '@nestjs/swagger';
import { UserStubWithDeletedAt } from 'src/stubs/user';

export class DeletedOneUserResponseDTO {
  @ApiProperty({
    example: UserStubWithDeletedAt,
  })
  public readonly data: typeof UserStubWithDeletedAt;
}
