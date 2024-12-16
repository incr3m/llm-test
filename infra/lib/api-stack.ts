import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as lambdaNodeJs from "aws-cdk-lib/aws-lambda-nodejs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import path from "path";

export class ApiStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const { RETELL_AI_API_KEY = "" } = process.env || {};

    const lambdaAppDir = path.resolve(__dirname, "./../../example_backend");

    const fn = new lambdaNodeJs.NodejsFunction(this, "NodeFn", {
      projectRoot: lambdaAppDir,
      entry: path.resolve(lambdaAppDir, "index.js"),
      depsLockFilePath: path.resolve(lambdaAppDir, "package-lock.json"),
      runtime: lambda.Runtime.NODEJS_18_X,
      timeout: cdk.Duration.seconds(60),
      memorySize: 128,
      environment: {
        RETELL_AI_API_KEY,
      },
    });

    const fnUrl = fn.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.NONE,
      cors: {
        allowedHeaders: ["content-type", "authorization"],
        allowedMethods: [lambda.HttpMethod.ALL],
        allowedOrigins: ["*"],
      },
    });
  }
}
