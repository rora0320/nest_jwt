import { isEmail, IsStrongPassword } from 'class-validator';

export class CreateUserDto {
  @isEmail()
  email: string;

  @IsStrongPassword()
  password: string;
}
