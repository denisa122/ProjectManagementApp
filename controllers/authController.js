const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const { registerValidation, loginValidation } = require("../validation");

const register = async (req, res) => {
  // Validate user input
  const { error } = registerValidation(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  // Check if email is taken
  const emailTaken = await User.findOne({ email: req.body.email });

  if (emailTaken) {
    return res.status(400).json({ error: "Email is already taken" });
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.password, salt);

  // Role of team member unless specified otherwise
  const role = req.body.role ? req.body.role : "team member";

  // Create user object and save it in the DB
  const userObject = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: password,
    role: role,
  });

  try {
    const savedUser = await userObject.save();

    res.json({ error: null, data: savedUser });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const login = async (req, res) => {
  // Validate user login credentials
  const { error } = loginValidation(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  // Login valid -- find the user
  const user = await User.findOne({ email: req.body.email });

  // Error if email is wrong (user not in DB)
  if (!user) {
    return res.status(400).json({ error: "Incorrect email or password" });
  }

  // User exists -- check password
  const validPassword = await bcrypt.compare(req.body.password, user.password);

  // Error if password is wrong
  if (!validPassword) {
    return res.status(400).json({ error: "Incorrect email or password" });
  }

  // Create and assign a token with email, id and role
  const token = jwt.sign(
    {
      email: user.email,
      id: user._id,
      role: user.role,
    },
    process.env.TOKEN_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  // Attach token to header
  res.header("auth-token", token).json({
    error: null,
    data: { token, role: user.role },
  });
};

const getLoginStatus = async (req, res) => {
  try {
    const token = req.header("auth-token");
    if (token) {
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
      const { role, id } = decoded;
      res.json({ isLoggedIn: true, role, id });
    } else {
      res.json({ isLoggedIn: false });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

const logout = async (req, res) => {
  try {
    res.header("auth-token", "").json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = {
  register,
  login,
  getLoginStatus,
  logout,
};
