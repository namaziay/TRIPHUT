const Trip = require('../Models/TripModel');
const User = require('../Models/UserModel');

exports.getAllTrips = (req, res)=> {
  
  Trip.find({},null,{sort:{postedDate:-1}})
    .populate("postedBy", "_id username dp")
    .populate("likes", "_id username")
    .then(trips => {
      res.status(200).json({ trips })
    })
    .catch(err => console.log(err));
};

exports.updateLikes = (req, res) => {
  const { tripId } = req.body;
  Trip.findById(tripId, 'likes')
    .then(trip => {
      if (trip.likes.find(likeid => likeid.equals(req.user._id))){
        Trip.updateOne({_id:tripId}, {$pull:{likes:req.user._id}}).exec();
      } else{
        Trip.updateOne({_id:tripId}, {$push:{likes:req.user._id}}).exec();
      }
      res.json({message:'Task was completed'})
    })
    .catch(err => console.log(err))
};

exports.updatePhotos =(req,res) => {
  const {tripId} = req.body;
  Trip.findOne({ _id: tripId })
    .then(photo => {
      Trip.updateOne({_id:tripId}, {$push:{photos:req.body.photo}}).exec();
      photo.photos = req.body.photos;
      res.json({trip:photo})
    })
    .catch(err => console.log(err))
};

exports.getLikes = (req, res) => {
  Trip.findById(req.params.tripId)
    .populate('likes', 'username dp _id fullname followers')
    .exec()
    .then(likes => {
      
      if(likes) {res.json({likes})}
      else {res.status(422).json({error:"no one likes you"})}
    })
    .catch(error => console.log(error))
};

exports.createTrip = (req,res)=> {
  const {description, url , travelDate, title} = req.body;
  if(!description || !url ) return res.status(422).json({error:"Please enter all required data"})
  const trip = new Trip ({
    title,
    description,
    url,
    travelDate,
    postedBy: req.user
  })
  trip.save()
    .then(response => {
      User.updateOne({_id:req.user._id}, {$push : {trips:response._id}}).exec();
      res.json({post:response, message: 'Trip was successfully created'})
    })
    .catch(err => console.log(err))
};


exports.deleteTrip = (req,res)=> {
  Trip.findByIdAndDelete(req.params.tripId)
  .then(response=> {
    res.status(200).json({response})
  })
  .catch(err => res.status(400).json({error: err, message:"Could not delete trip"}))
};

exports.getTripByUser =(req,res) => {
  Trip.find({postedBy:req.params.id})
    .sort({postedDate:-1})
    .populate("postedBy", "_id username dp")
    .populate('likes', "_id username")
    .exec()
    .then(trips => {
      if(trips) {res.status(200).json({trips})}
      else{res.status(422).json({error:"Error getting user trips"})}
    })
    .catch(err => {
      console.log(err)
      res.status(400).json({err})
    })
};


exports.getTrip =(req, res) => {
  const {postId}  = req.body
  Trip.find({ _id: postId})
    .populate("postedBy", "_id username dp")
    .exec()
    .then (trip => {
      if(trip) {res.status(200).json({trip})} 
      else{res.status(422).json({error:"Error getting user trips"})}
    })
  .catch (err => {
    console.log(err)
    res.status(400).json({err})
  })
};