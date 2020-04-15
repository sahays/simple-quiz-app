/* eslint-disable-line */ const aws = require("aws-sdk");

exports.handler = async (event, context, callback) => {
  const cognitoidentityserviceprovider = new aws.CognitoIdentityServiceProvider(
    { apiVersion: "2016-04-18" }
  );

  const { clientMetadata } = event.request;
  const { email } = event.request.userAttributes;

  let targetGroup = "users";

  if (clientMetadata && clientMetadata.app.indexOf("sqa-admin") > -1) {
    if (email && email.indexOf("@amazon.com") > -1) {
      targetGroup = "admins";
    }
  }

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
