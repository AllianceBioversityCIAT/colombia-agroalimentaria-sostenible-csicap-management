import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    required: true,
    description: 'User email',
    type: String,
    default: 'JohnDoe@cgiar.org',
  })
  public email: string;

  @ApiProperty({
    required: true,
    description: 'User First Name',
    type: String,
    default: 'John',
  })
  public first_name: string;

  @ApiProperty({
    required: true,
    description: 'User Last Name',
    type: String,
    default: 'Doe',
  })
  public last_name: string;

  @ApiProperty({
    required: true,
    description: 'User Role Id. Only application roles are allowed',
    type: Number,
    default: 1,
  })
  public role_id?: number;
}
