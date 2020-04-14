/* eslint-disable-line */ const aws = require("aws-sdk");

exports.handler = async (event, context, callback) => {
  const cognitoidentityserviceprovider = new aws.CognitoIdentityServiceProvider(
    { apiVersion: "2016-04-18" }
  );

  const {
    userAttributes: { email },
  } = event.request;

  let targetGroup = "users";

  if (email.indexOf("@amazon.com") > -1) {
    targetGroup = "admins";
  }

  console.log(email, targetGroup);

  const groupParams = {
    GroupName: targetGroup,
    UserPoolId: event.userPoolId,
  };

  const addUserParams = {
    GroupName: targetGroup,
    UserPoolId: event.userPoolId,
    Username: event.userName,
  };

  try {
    await cognitoidentityserviceprovider.getGroup(groupParams).promise();
  } catch (e) {
    await cognitoidentityserviceprovider.createGroup(groupParams).promise();
  }

  try {
    await cognitoidentityserviceprovider
      .adminAddUserToGroup(addUserParams)
      .promise();
    callback(null, event);
  } catch (e) {
    callback(e);
  }
};
