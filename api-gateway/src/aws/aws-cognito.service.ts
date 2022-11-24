import { Injectable, Logger } from '@nestjs/common';
import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser,
  AuthenticationDetails,
} from 'amazon-cognito-identity-js';
import { SignInDto } from 'src/modules/autentication/dto/auth-login-user.dto';
import { SignUpDto } from 'src/modules/autentication/dto/auth-register-user.dto';
import { AwsCognitoConfig } from './aws-cognito.config';

@Injectable()
export class AwsCognitoService {
  private readonly logger = new Logger(AwsCognitoService.name);
  private readonly userPool: CognitoUserPool;

  constructor(private readonly authConfig: AwsCognitoConfig) {
    this.userPool = new CognitoUserPool({
      UserPoolId: this.authConfig.UserPoolId,
      ClientId: this.authConfig.ClientId,
    });
  }

  async signUp(signUpDto: SignUpDto): Promise<CognitoUser | Error> {
    const { email, password } = signUpDto;
    const attributes: CognitoUserAttribute[] = [
      new CognitoUserAttribute({
        Name: 'email',
        Value: email,
      }),
    ];

    return new Promise<CognitoUser | Error>((resolve, reject) => {
      this.userPool.signUp(email, password, attributes, null, (err, result) => {
        if (err) {
          this.logger.error(err);
          return reject(err);
        } else {
          this.logger.log('Usuário criado com sucesso no Amazon Cognito!');
          resolve(result.user);
        }
      });
    });
  }

  async signIn(signInDto: SignInDto): Promise<string> {
    const { email, password } = signInDto;

    const authenticationDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    const userData = {
      Username: email,
      Pool: this.userPool,
    };

    const cognitoUser = new CognitoUser(userData);

    return new Promise<string>((resolve, reject) => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (response) =>
          resolve(response.getAccessToken().getJwtToken()),
        onFailure: (response) => reject(response),
      });
    });
  }
}
