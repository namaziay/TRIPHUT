const express = require('express');
const tripRouter = express.Router();
const isLogged = require('../Middlewares/LogIn');
const tripController = require('../Controller/tripController');

tripRouter.post('/', isLogged, (req,res)=> {
  res.json({ isLogged: true, user: req.user })
});

<<<<<<< HEAD
tripRouter.get('/user/:id/trips', isLogged, tripController.getTripByUser);
tripRouter.get('/trips/:id', tripController.getTrip);
tripRouter.get('/alltrips', tripController.getAllTrips);
tripRouter.get('/:tripId/likes', isLogged, tripController.getLikes);

tripRouter.post('/like', isLogged, tripController.updateLikes);
tripRouter.post('/createtrip', isLogged,tripController.createTrip);
tripRouter.post('/photos', tripController.updatePhotos);
=======
tripRouter.get('/user/:id/trips', isLogged, tripController.getTripByUser)
tripRouter.get('/alltrips', tripController.getAllTrips)
tripRouter.get('/:tripId/likes', isLogged, tripController.getLikes)

tripRouter.post('/trips', tripController.getTrip)
tripRouter.post('/like', isLogged, tripController.updateLikes)
tripRouter.post('/createtrip', isLogged,tripController.createTrip)
tripRouter.post('/photos', tripController.updatePhotos)
>>>>>>> 9e78cecf527e5bef0f983fa6ba82923f6f6979e3

tripRouter.delete('/:tripId/delete',isLogged, tripController.deleteTrip);

module.exports = tripRouter;