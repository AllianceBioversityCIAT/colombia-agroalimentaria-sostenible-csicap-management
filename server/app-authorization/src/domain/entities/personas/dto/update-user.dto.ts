import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({
    required: false,
    description: 'User first name',
    type: String,
    default: 'John',
  })
  public first_name: string;
  @ApiProperty({
    required: false,
    description: 'User last name',
    type: String,
    default: 'Doe',
  })
  public last_name: string;
}
