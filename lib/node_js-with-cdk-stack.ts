import * as cdk from 'aws-cdk-lib';

//import * as ecs from '@aws-cdk/aws-ecs';
//import * as ec2 from '@aws-cdk/aws-ec2';
//import * as ecsPatterns from '@aws-cdk/aws-ecs-patterns';
//import * as ecrAssets from '@aws-cdk/aws-ecr-assets';


import { Construct } from 'constructs';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecsPatterns from 'aws-cdk-lib/aws-ecs-patterns'
import * as ecrAssets from 'aws-cdk-lib/aws-ecr-assets';

export class NodeJsWithCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create a new VPC for our cluster
        const vpc = new ec2.Vpc(this, 'MyVpc', { maxAzs: 3 });

        // Create an ECS cluster
        const cluster = new ecs.Cluster(this, 'Cluster', { vpc });

        // Define an asset that represents our Docker image
         const dockerImage = new ecrAssets.DockerImageAsset(this, 'MyNodeJsAppImage', {
           directory: '/Users/hava/source/NodeJS-With-CDK',
         });


        // Instantiate an ECS Service using the Fargate launch type
        const fargateService = new ecsPatterns.ApplicationLoadBalancedFargateService(this, 'MyFargateService', {
          cluster,
          cpu: 256,
          desiredCount: 1,
          taskImageOptions: {
            image: ecs.ContainerImage.fromDockerImageAsset(dockerImage),
            containerPort: 80,
          },
          memoryLimitMiB: 512,
          publicLoadBalancer: true,
        });
  }
}


