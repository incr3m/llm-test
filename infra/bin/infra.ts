#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { ApiStack } from "../lib/api-stack";
import { WebStack } from "../lib/web-stack";

const app = new cdk.App();
new ApiStack(app, "retell-ApiStack");
new WebStack(app, "retell-WebStack");
