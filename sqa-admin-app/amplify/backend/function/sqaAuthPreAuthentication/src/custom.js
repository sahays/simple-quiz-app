exports.handler = (event, context, callback) => {
  const { validationData } = event.request;
  const { email } = event.request.userAttributes;

  if (validationData && validationData.app === "sqa-admin") {
    if (email && email.indexOf("@amazon.com") > -1) {
      callback(null, event); // allow login
    } else {
      console.log("invalid login attempt", event.request.userAttributes);
      callback(
        new Error(
          "Invalid login attempt: You are not allowed to login to this portal"
        )
      ); // fail login
    }
  }
  callback(null, event);
};
