import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CreateUserDto {

  @ApiProperty({
    required: true,
    description: 'Is CGIAR user?',
    type: Boolean,
    default: 'true',
  })
  public is_cgiar: boolean;

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
    description: 'Organization ID',
    type: Number,
    default: 1,
  })
  public organizacion_id: number;

  @ApiProperty({
    required: true,
    description: 'User email',
    type: String,
    default: 'JohnDoe@cgiar.org',
  })
  public email: string;

  @ApiProperty({
    required: true,
    description: 'User Role Id',
    type: Number,
    default: 1,
  })
  public role_id: number;

  @IsOptional()
  @ApiProperty({
    required: false,
    description: 'Eje ID (optional)',
    type: Number,
    default: 1,
  })
  public eje_id?: number;
}
