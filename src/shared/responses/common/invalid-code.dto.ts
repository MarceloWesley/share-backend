import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

class GoneErrorResponse {
  @ApiProperty({
    description: 'Error message',
    example: 'Invalid code',
  })
  public readonly message: string;

  @ApiProperty({
    description: 'Error Status Code',
    example: HttpStatus.GONE,
  })
  public readonly statusCode: HttpStatus.GONE;
}

export class GoneResponseDTO {
  @ApiProperty({
    description: 'Error Status Code',
    example: GoneErrorResponse,
  })
  public readonly error: GoneErrorResponse;
}
