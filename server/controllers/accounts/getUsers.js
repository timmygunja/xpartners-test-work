const joi = require("joi");
const Account = require("../../models/Account");

async function getUsers(request, response, next) {
  //   try {
  //     // Validate request data
  //     await joi
  //       .object({
  //         username: joi.string().required(),
  //         password: joi.string().required(),
  //         email: joi.string().required(),
  //         dateOfBirth: joi.string().required(),
  //         image: joi.any(),
  //       })
  //       .validateAsync(request.body);
  //   } catch (error) {
  //     return response.status(400).json({
  //       error: "ValidationError",
  //       message: error.message,
  //     });
  //   }

  try {
    let users;
    const { username } = request.body;

    try {
      users = await Account.find({}, "-password");
    } catch (error) {
      return response.status(500).json({
        error: "Could not find any users",
        message: error.message,
      });
    }

    if (users.length === 0) {
      return response.status(500).json({
        error: "There are no users in database",
        message: error.message,
      });
    }

    response.status(200).json({
      message: "Got users from database",
      users: users.map((user) => user.toObject({ getters: true })),
    });
  } catch (error) {
    console.error(error);
    return response.status(500).send();
  }
}

module.exports = getUsers;
