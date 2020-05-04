/* Amplify Params - DO NOT EDIT
	API_SQAAPI_GRAPHQLAPIENDPOINTOUTPUT
	API_SQAAPI_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */
require("es6-promise").polyfill();
require("isomorphic-fetch");
const AWS = require("aws-sdk");
const gql = require("graphql-tag");
const AWSAppSyncClient = require("aws-appsync").default;
require("es6-promise").polyfill();
require("isomorphic-fetch");
const AUTH_TYPE = require("aws-appsync/lib/link/auth-link").AUTH_TYPE;

const url = process.env.API_SQAAPI_GRAPHQLAPIENDPOINTOUTPUT;
const region = process.env.REGION;

AWS.config.update({
  region: region,
  credentials: new AWS.Credentials({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  }),
});
const credentials = AWS.config.credentials;

const appsyncClient = new AWSAppSyncClient({
  url,
  region,
  auth: {
    type: AUTH_TYPE.AWS_IAM,
    credentials: credentials,
  },
  disableOffline: true,
});

const listQuestions = /* GraphQL */ `
  query ListQuestions(
    $filter: ModelQuestionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listQuestions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        question
        type
        choices {
          id
          text
        }
        answers
        tags
        explanation
        owner
      }
      nextToken
    }
  }
`;

exports.handler = async (event) => {
  console.log(event.arguments.quizId, process.env);
  try {
    const query = gql(listQuestions);
    const client = await appsyncClient.hydrated();
    const data = await client.query({ query, fetchPolicy: "network-only" });
    return data;
  } catch (e) {
    console.log("Error: ", e);
  }
  return null;
};
