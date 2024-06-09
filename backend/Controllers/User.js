const User = require("../Models/User");
const generateToken = require("../Helpers/token");

const registerUser = async (req, res) => {
  const { name, email, password, pic } = req.body;

  if (!name || !email || !password) {
    res.status(400).send("Please enter all fields");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400).send("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    pic,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).send("User not created");
  }
};

const authUser = async (req, res) => {
  const { email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists && (await userExists.matchPassword(password))) {
    res.json({
      _id: userExists._id,
      name: userExists.name,
      email: userExists.email,
      pic: userExists.pic,
      token: generateToken(userExists._id),
    });
  } else {
    res.status(401).send("Invalid email or password");
  }
};

const allUsers = async (req, res) => {
  // const key = req.query.search;
  const keyword = req.query.search
    ? {
        name: { $regex: req.query.search, $options: "i" },
        // { email: { $regex: req.query.search, $options: "i" } },
      }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
};

module.exports = { registerUser, authUser, allUsers };
