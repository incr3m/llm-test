import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as s3Deployment from "aws-cdk-lib/aws-s3-deployment";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as origins from "aws-cdk-lib/aws-cloudfront-origins";

const viteDistPath = "./../frontend_demo";

export class WebStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create an S3 bucket for hosting the website
    const siteBucket = new s3.Bucket(this, "StaticSiteBucket", {
      websiteIndexDocument: "index.html",
      websiteErrorDocument: "error.html",
      publicReadAccess: true,
      blockPublicAccess: new s3.BlockPublicAccess({
        blockPublicAcls: false,
        blockPublicPolicy: false,
        ignorePublicAcls: false,
        restrictPublicBuckets: false,
      }),
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    // Deploy website files to the S3 bucket
    new s3Deployment.BucketDeployment(this, "DeployStaticSite", {
      sources: [s3Deployment.Source.asset(viteDistPath)],
      destinationBucket: siteBucket,
    });

    // Optionally set up CloudFront for the S3 bucket
    const distribution = new cloudfront.Distribution(
      this,
      "StaticSiteDistribution",
      {
        defaultBehavior: {
          origin: new origins.S3Origin(siteBucket),
          viewerProtocolPolicy:
            cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        },
        defaultRootObject: "index.html",
      }
    );

    new cdk.CfnOutput(this, "BucketWebsiteURL", {
      value: siteBucket.bucketWebsiteUrl,
      description: "The URL of the static website hosted in S3.",
    });

    new cdk.CfnOutput(this, "CloudFrontURL", {
      value: distribution.distributionDomainName,
      description: "The CloudFront distribution URL.",
    });
  }
}
