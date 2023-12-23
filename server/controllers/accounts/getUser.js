const joi = require("joi");
const Account = require("../../models/Account");

async function getUser(request, response, next) {
  try {
    // Validate request data
    await joi
      .object({
        username: joi.string().required(),
        password: joi.string().required(),
      })
      .validateAsync(request.body);
  } catch (error) {
    return response.status(400).json({
      error: "ValidationError",
      message: error.message,
    });
  }

  try {
    let user;
    const { username } = request.body;

    try {
      user = await Account.find({ username: username }, "-password");
    } catch (error) {
      return response.status(500).json({
        error: "Could not find any users",
        message: error.message,
      });
    }

    if (user === undefined) {
      return response.status(500).json({
        error: "No such user found",
        message: error.message,
      });
    }

    response.status(200).json({
      message: "Got user from database",
      user: user,
    });
  } catch (error) {
    console.error(error);
    return response.status(500).send();
  }
}

module.exports = getUser;
