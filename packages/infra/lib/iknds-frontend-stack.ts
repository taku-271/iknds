import * as cdk from 'aws-cdk-lib';
import path from 'path';
import { Construct } from 'constructs';

export class IkndsFrontendStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const nextLambda = new cdk.aws_lambda.DockerImageFunction(this, 'iknds-frontend-lambda', {
      code: cdk.aws_lambda.DockerImageCode.fromImageAsset(path.resolve(__dirname, '../../../'), {
        file: './packages/frontend/Dockerfile',
        exclude: ['**/cdk.out/*', '**/node_modules/*'],
      }),
    });

    const distribution = new cdk.aws_cloudfront.Distribution(this, 'iknds-frontend-distribution', {
      defaultBehavior: {
        viewerProtocolPolicy: cdk.aws_cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        origin: new cdk.aws_cloudfront_origins.FunctionUrlOrigin(
          nextLambda.addFunctionUrl({ authType: cdk.aws_lambda.FunctionUrlAuthType.NONE }),
        ),
      },
    });
  }
}
