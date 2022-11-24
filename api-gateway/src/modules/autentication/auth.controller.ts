// import {
//   Body,
//   Controller,
//   Logger,
//   Post,
//   UsePipes,
//   ValidationPipe,
// } from '@nestjs/common';
// import { ApiTags } from '@nestjs/swagger';
// import { AwsCognitoService } from 'src/aws/aws-cognito.service';
// import { SignInDto } from './dto/auth-login-user.dto';
// import { SignUpDto } from './dto/auth-register-user.dto';

// @ApiTags('auth')
// @Controller('auth')
// export class AuthController {
//   constructor(private readonly awsService: AwsCognitoService) {}

//   @Post('register')
//   @UsePipes(ValidationPipe)
//   async signUp(@Body() signUpDto: SignUpDto): Promise<any> {
//     return await this.awsService.signUp(signUpDto);
//   }

//   @Post('login')
//   @UsePipes(ValidationPipe)
//   async signIn(@Body() signInDto: SignInDto): Promise<{ accessToken: string }> {
//     const accessToken = await this.awsService.signIn(signInDto);
//     return { accessToken };
//   }
// }
