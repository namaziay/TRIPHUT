const mongoose = require('mongoose');
const databaseName = 'TripHut'

<<<<<<< HEAD
mongoose.connect('mongodb+srv://marshal:mongo@cluster0.8o9m6.mongodb.net/chat_db?authSource=admin&replicaSet=atlas-m5opbu-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true',{
=======
mongoose.connect(`mongodb://127.0.0.1/${databaseName}`,{
>>>>>>> 9e78cecf527e5bef0f983fa6ba82923f6f6979e3
  useNewURLParser: true,
})
.then(()=>{
  console.log('Successfully connected to DB')
})
.catch((e)=>{
  console.log(e);
<<<<<<< HEAD
});
=======
})
>>>>>>> 9e78cecf527e5bef0f983fa6ba82923f6f6979e3

module.exports = mongoose;