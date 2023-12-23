const joi = require("joi");
const bcrypt = require("bcrypt");
const Account = require("../../models/Account");
const { signToken } = require("../../middlewares/jsonwebtoken");

async function edit(request, response, next) {
  try {
    // Validate request data
    await joi
      .object({
        username: joi.string().required(),
        password: joi.string().required(),
        newUsername: joi.string().required(),
        newPassword: joi.string().required(),
        newImage: joi.any(),
      })
      .validateAsync(request.body);
  } catch (error) {
    return response.status(400).json({
      error: "ValidationError",
      message: error.message,
    });
  }

  try {
    let { username, newUsername, newPassword, newImage } = request.body;

    // Verify new account username as unique
    const existingAccount = await Account.findOne({ username: newUsername });
    if (existingAccount && newUsername !== username) {
      return response.status(400).json({
        error: newUsername,
        message: "That username is already reserved",
      });
    }

    const currentAccount = await Account.findOne({ username });

    request.file !== null && request.file !== undefined
      ? (newImage = request.file.filename)
      : (newImage = currentAccount.image);

    // Encrypt password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newPassword, salt);

    // Change account info
    currentAccount.username = newUsername;
    currentAccount.password = hash;
    currentAccount.password_unsafe = newPassword;
    currentAccount.image = newImage;

    await currentAccount.save();

    // Remove password from response data
    currentAccount.password = undefined;
    delete currentAccount.password;

    // Generate access token
    const token = signToken({
      uid: currentAccount._id,
      role: currentAccount.role,
    });

    response.status(201).json({
      message: "Succesfully edited Account info",
      data: currentAccount,
      token,
    });
  } catch (error) {
    console.error(error);
    return response.status(500).send();
  }
}

module.exports = edit;
