import { ApiProperty } from '@nestjs/swagger';
import { UserStub } from 'src/stubs/user';

export class SignUpCustomerResponseDTO {
  @ApiProperty({
    example: UserStub,
  })
  public readonly data: typeof UserStub;
}
