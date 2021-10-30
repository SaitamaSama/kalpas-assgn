import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";

export class Form {
  public constructor(init?: Partial<Form>) {
    Object.assign(this, init);
  }

  @IsString()
  @IsNotEmpty({ message: "Please enter your first name" })
  public firstName: string;

  @IsString()
  @IsNotEmpty({ message: "Please enter your last name" })
  public lastName: string;

  @IsString()
  public address: string;

  @IsString()
  @IsNotEmpty({ message: "Please enter a valid country" })
  public country: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail({}, { message: "Please enter a valid email" })
  public email: string;

  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber("IN", {
    message: "Please enter a valid phone number",
  })
  public phoneNumber: string;
}
