import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AwsCognitoConfig {
  constructor(private configService: ConfigService) {}

  public UserPoolId: string = this.configService.get<string>(
    'COGNITO_USER_POOL_ID',
  );

  public ClientId: string = this.configService.get<string>('COGNITO_CLIENT_ID');

  public Region: string = this.configService.get<string>(
    'AWS_REGION_US_VIRGINIA',
  );

  public Authority = `https://cognito-idp.${this.Region}.amazonaws.com/${this.UserPoolId}`;
}
