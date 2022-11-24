// import { Injectable, Logger } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// import { ExtractJwt, Strategy } from 'passport-jwt';
// import { passportJwtSecret } from 'jwks-rsa';
// import { AwsCognitoConfig } from 'src/aws/aws-cognito.config';

// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
//   private readonly logger = new Logger(JwtStrategy.name);

//   constructor(private readonly authConfig: AwsCognitoConfig) {
//     super({
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

//       ignoreExpiration: false,

//       issuer: authConfig.Authority,

//       client_id: authConfig.ClientId,

//       algorithms: ['RS256'],

//       secretOrKeyProvider: passportJwtSecret({
//         jwksUri: `${authConfig.Authority}/.well-known/jwks.json`,

//         cache: true,

//         rateLimit: true,

//         jwksRequestsPerMinute: 3,
//       }),
//     });
//   }

//   public validate(payload: any): any {
//     this.logger.log(`payload: ${JSON.stringify(payload)}`);

//     return { userId: payload.sub, email: payload.email };
//   }
// }
