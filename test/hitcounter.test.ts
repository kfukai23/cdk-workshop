import { Template, Capture } from "aws-cdk-lib/assertions";
import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { HitCounter } from "../lib/hitcounter";

// Simply testing to ensure that the synthesized stack includes a DynamoDB table
test('DynamoDB Table Created', () => {
  const stack = new cdk.Stack();

  // WHEN
  new HitCounter(stack, 'MyTestConstruct', {
    downstream: new lambda.Function(stack, 'TestFunction', {
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: 'hello.handler',
      code: lambda.Code.fromAsset('lambda')
    })
  });

  const template = Template.fromStack(stack);
  // THEN
  template.resourceCountIs("AWS::DynamoDB::Table", 1);
})
