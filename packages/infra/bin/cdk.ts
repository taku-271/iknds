#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { IkndsStack } from '../lib/iknds-stack';
import { IkndsFrontendStack } from '../lib/iknds-frontend-stack';

const app = new cdk.App();

new IkndsStack(app, 'IkndsStack');
new IkndsFrontendStack(app, 'IkndsFrontendStack');
