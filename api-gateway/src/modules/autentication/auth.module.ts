// import { Module } from '@nestjs/common';
// import { AuthController } from './auth.controller';
// import { PassportModule } from '@nestjs/passport';
// import { JwtStrategy } from './strategies/jwt.strategy';
// import { AwsModule } from 'src/aws/aws.module';

// @Module({
//   imports: [AwsModule, PassportModule.register({ defaultStrategy: 'jwt' })],
//   providers: [JwtStrategy],
//   controllers: [AuthController],
//   exports: [JwtStrategy],
// })
// export class AuthModule {}
