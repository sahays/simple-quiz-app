exports.handler = (event, context, callback) => {
  console.log(event);

  const {
    userAttributes: { email },
  } = event.request;

  if (email.indexOf("@amazon.com") > -1) {
    // Return to Amazon Cognito without confirming
    console.log(email);
  } else {
    // Confirm the user
    event.response.autoConfirmUser = true;

    // Set the email as verified if it is in the request
    if (event.request.userAttributes.hasOwnProperty("email")) {
      event.response.autoVerifyEmail = true;
    }

    // Set the phone number as verified if it is in the request
    if (event.request.userAttributes.hasOwnProperty("phone_number")) {
      event.response.autoVerifyPhone = true;
    }
  }
  callback(null, event);
};
