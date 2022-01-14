const User = require('../Models/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secretKey = 'SHHH this is a secret';

exports.getUser = (req,res) => {
  User.findOne({username:req.params.username})
  .populate('trips', "url _id description postedDate likes title")
  .exec()
  .then(result => {
    if(!result.username) {
      return res.status(422).json({error: 'Invalid Username'})
    }
    result.password = undefined;
    res.json({user: result})
  })
  .catch(err => res.status(400).json({error:err}));
};

exports.updateUser = (req,res) => {
  const { username, email, fullname } = req.body.data;
  if (!email || !username || !fullname) {
    return res.status(422).json({ error: "PLease enter all fields." })
  };

  User.updateOne({ _id: req.body.id }, { username, email, fullname })
    .exec()
    .then((result) => {
      if (!result) {
          return res.status(422).json({ error: "Invalid Username" })
      } else {
        User.findById({ _id: req.body.id })
          .populate("trips", "url _id")
          .exec()
          .then(foundUser => {
            if (foundUser) {
              foundUser.password = undefined;
               res.json({ user: foundUser })
            } 
          })
          .catch(er => console.log(er))
      };
    })
    .catch(er => console.log(er));
};

exports.updateProfilePhoto = (req,res) => {
  User.findOne({ username: req.body.username })
  .then((foundUser) => {
    if (!foundUser) {
      return res.status(422).json({ error: "Invalid Username" })
    } else {
      User.updateOne({ username: req.body.username }, { dp: req.body.dp }).exec();
      foundUser.dp = req.body.dp;
      res.json({ user: foundUser })
    };
  })
  .catch(er => console.log(er));
};

exports.registerUser = (req,res) => {
  const { username, email, password, fullname } = req.body;
    if (!email || !username || !password || !fullname) {
      return res.status(422).json({ error: "PLease enter all fields." })
    };
    
  User.findOne({ email: email })
    .then((foundUser) => {
      if (foundUser) {
        return res.status(422).json({ error: "User already existed.<br>If it belongs to you then Try Login instead." })
      }
      bcrypt.hash(password, 12)
        .then(hashedPassword => {
          const user = new User({
            email,
            password: hashedPassword,
            username,
            fullname
          })
          user.save()
            .then(user => {
              res.status(200).json({ message: "Successfully Signed Up.<br>Please Login now.", body:user })
            })
          .catch(err => console.log(err));
      })
    })
    .catch(err => console.log(err));
};

exports.signIn = (req,res) => {
  const { email, password } = req.body;
  if (!email || !password) {
      return res.status(422).json({ error: "Please enter all fields." })
  };

  User.findOne({ email: email })
    .populate("trips", "url _id description postedDate")
    .exec()
    .then(foundUser => {
      if (!foundUser) {
        return res.status(422).json({ error: "Invalid email or password." })
      }
      bcrypt.compare(password, foundUser.password)
        .then(doMatched => {
          if (doMatched) {
            const token = jwt.sign({ _id: foundUser._id }, secretKey);
            res.json({ token, message: "Successfully signed in.", user: foundUser });
          } else {
            return res.status(422).json({ error: "Invalid email or password." })
          }
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
};

exports.getFollows = (req, res)=> {
  User.findOne({username: req.params.username})
    .populate("followers", "username dp _id fullname followers")
    .exec()
    .then(result => {
      if (result) {
        res.json(result);
      } else {
        res.status(422).json({ error: "no followers found" });
      }
    })
    .catch(er => console.log(er));
};

exports.getFollowing = (req, res)=> {
  User.findOne({username: req.params.username})
    .populate("following", "username dp _id fullname followers trips")
    .exec()
    .then(result => {
      if (result) {
        res.json(result);
      } else {
        res.status(422).json({ error: "no profiles found" });
      }
    })
    .catch(er => console.log(er))
}

//write new controller for user Followers.js page

exports.pushFollows = (req,res) => {
  User.findOne({ username: req.params.username })
  .then((foundUser) => {
    if (!foundUser) {
        return res.status(422).json({ error: "Invalid Username" })
    } else {
      if (foundUser.followers.find(followerId => followerId.equals(req.user._id))) {
        User.updateOne({ username: req.params.username }, { $pull: { followers: req.user._id } }).exec();
        User.updateOne({ username: req.user.username }, { $pull: { following: foundUser._id } }).exec();
      } else {
        User.updateOne({ username: req.params.username }, { $push: { followers: req.user._id } }).exec();
        User.updateOne({ username: req.user.username }, { $push: { following: foundUser._id } }).exec();
      }
    }
  })
  .catch(er => console.log(er));
res.json({ message: "task completed." });
};