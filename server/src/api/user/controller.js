const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('./model');
const { setError } = require('../../utils/error/handle.error');

const register = async (req, res, next) => {
  try {
    const newUser = new User(req.body);
    const userDuplicate = await User.findOne({ email: newUser.email });

    if (userDuplicate) return next('User alredy exists');

    await newUser.save();
    return res.json({
      status: 201,
      message: 'user registered',
      data: newUser,
    });
  } catch (err) {
    return next(setError(500, 'User register fail'));
  }
};

const login = async (req, res, next) => {
  try {
    const userInfo = await User.findOne({ email: req.body.email });
    if (bcrypt.compareSync(req.body.password, userInfo.password)) {
      userInfo.password = null;
      const token = jwt.sign(
        {
          id: userInfo._id,
          email: userInfo.email,
        },
        req.app.get('secretKey'),
        { expiresIn: '10h' }
      );
      return res.json({
        status: 200,
        message: 'welcome User',
        user: userInfo,
        token: token,
      });
    } else {
      return next('Incorrect password');
    }
  } catch (error) {
    return next(setError(500, 'User login fail'));
  }
};

module.exports = {
  register,
  login,
};
