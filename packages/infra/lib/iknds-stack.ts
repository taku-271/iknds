import * as cdk from 'aws-cdk-lib';
import * as ecr from 'aws-cdk-lib/aws-ecr';
import * as ecrdeploy from 'cdk-docker-image-deployment';
import path from 'path';
import { Construct } from 'constructs';

export class IkndsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    /* ecrの作成 */
    const ecrRepository = new ecr.Repository(this, 'iknds-repository', {
      repositoryName: 'iknds-repository',
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      emptyOnDelete: true,
      imageScanOnPush: true,
    });
    ecrRepository.addLifecycleRule({
      maxImageCount: 1,
    });

    // /* ecrにデプロイ */
    // new ecrdeploy.DockerImageDeployment(this, 'iknds-ecr-deployment', {
    //   source: ecrdeploy.Source.directory(path.resolve(__dirname, '../../backend')),
    //   destination: ecrdeploy.Destination.ecr(ecrRepository),
    // });
  }
}
