const User = require('../models/users.model');

exports.signup = async (req, res) => {
  try {
    const { name, password } = req.body;

    const accountNumber = Math.ceil(Math.random() * 900000) + 100000;

    const amount = 1000;

    const user = await User.create({ name, accountNumber, password, amount });
    res.status(200).json({
      status: 'success',
      message: 'The user has been created',
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'fail',
      message: 'Something went very wrong! 😖😡',
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { password, accountNumber } = req.body;

    const user = await User.findOne({
      where: {
        status: 'active',
        accountNumber,
        password,
      },
    });
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: `The user with this information doesn't exist`,
      });
    }
    res.status(200).json({
      status: 'success',
      message: 'User login',
      user,
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: 'Something went very wrong! 😖😡',
    });
  }
};
