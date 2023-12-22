import * as path from 'node:path';

import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as nodeLambda from 'aws-cdk-lib/aws-lambda-nodejs';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const nestServerLambda = new nodeLambda.NodejsFunction(
      this,
      'NestServerLambda',
      {
        runtime: lambda.Runtime.NODEJS_18_X,
        entry: path.join(__dirname, '../lambda/nest-server.ts'),
        handler: 'index.nestServer',
      },
    );

    const restApi = new apigateway.RestApi(this, 'NestLambdaApi', {
      restApiName: 'NestLambdaApi',
      defaultCorsPreflightOptions: {
        allowHeaders: ['*'],
        allowOrigins: ['*'],
        allowMethods: apigateway.Cors.ALL_METHODS,
      },

      defaultIntegration: new apigateway.LambdaIntegration(nestServerLambda),
    });

    const api = restApi.root.addResource('api');

    const profile = api.addResource('profile');
    profile.addMethod(lambda.HttpMethod.GET);

    const cart = profile.addResource('cart');
    cart.addMethod(lambda.HttpMethod.GET);
    cart.addMethod(lambda.HttpMethod.PUT);
    cart.addMethod(lambda.HttpMethod.DELETE);

    const checkout = cart.addResource('checkout');
    checkout.addMethod(lambda.HttpMethod.POST);
  }
}
