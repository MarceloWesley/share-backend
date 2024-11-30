import { UserStub } from '@/stubs/user';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpCustomerResponseDTO {
  @ApiProperty({
    example: UserStub,
  })
  public readonly data: typeof UserStub;
}
