const express = require('express');
const userRouter = express.Router();
const isLogged = require('../Middlewares/LogIn');
const userController = require('../Controller/userController');

userRouter.get('/user/:username', userController.getUser);
userRouter.get('/:userId/:task', userController.getFollows);

userRouter.put('/updateProfilePhoto', isLogged,userController.updateProfilePhoto);

userRouter.get('/user/:username', userController.getUser)
userRouter.get('/user/:username/followers', userController.getFollows) 
userRouter.get('/user/:username/following', userController.getFollowing)

userRouter.put('/updateProfilePhoto', isLogged,userController.updateProfilePhoto)

userRouter.post('/signup',userController.registerUser)
userRouter.post('/signin',userController.signIn)
userRouter.post('/updateUser', isLogged,userController.updateUser)
userRouter.post('/user/:username/follow', isLogged, userController.pushFollows)


module.exports = userRouter;