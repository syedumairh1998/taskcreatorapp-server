export const validateUserData = (type) => {
  return (request, response, next) => {
    let requiredPayloadKeys = [];
    let body;
    switch (type) {
      case "user registeration":
        requiredPayloadKeys = [
          "user_name",
          "email",
          "password",
          "confirm_password",
        ];
        body = request.body;
        break;
      case "user login":
        requiredPayloadKeys = ["user_name", "password"];
        body = request.body;
        break;
      default:
        break;
    }
    for (let i = 0; i < requiredPayloadKeys.length; i++) {
      if (!body[requiredPayloadKeys[i]]) {
        return response.status(400).json({
          message: `${requiredPayloadKeys[i]} is required for ${type}`,
        });
      }
    }
    next();
  };
};
