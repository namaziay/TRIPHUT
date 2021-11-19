const assert = require('chai').assert;
const express = require('express');
const tripRouter = require('./server/Routes/trip');
const userRouter = require('./server/Routes/user');
const supertest = require('supertest');
const mongoose = require('mongoose');
const httpMocks = require('node-mocks-http');
const User = require('./server/Models/UserModel')
//BeforeAll or BeforeEach
describe('Server', () => {

  describe('Trips', async () => { 
    
    const app = express();
    app.use(express.json());
    app.use(tripRouter);
    const request = supertest(app);
    const mockID = '61967a8166babde4eb5eeb2f';
    const tripController = require('./server/Controller/tripController');
  
    before(async() => {
      const dbLink = 'mongodb+srv://marshal:mongo@cluster0.8o9m6.mongodb.net/chat_db?authSource=admin&replicaSet=atlas-m5opbu-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true';
      await mongoose.connect(dbLink, {useNewUrlParser: true});
    });
    
    it('/alltrips route should return array of objects', (done) => {
      request.get('/alltrips').then(trips => {
        const result = trips.body.trips;
        assert.typeOf(result, 'array');
        assert.typeOf(result[0]._id, 'string');
        done();
      });
    });
    
  
    it('/trips/:id route should return corresponding trip', (done) => {
      request.get(`/trips/${mockID}`).then(result => {
        assert.equal(result.body.trip[0]._id, mockID);
        done();
      });
    });
  });
  
  describe('Users', async () => {
    const app = express();
    app.use(express.json());
    app.use(userRouter);
    const request = supertest(app);
    const mockUsername = '1234';
    const mockUserID = '619677bf66babde4eb5eea78';
    
  
    before(async() => {
      const dbLink = 'mongodb+srv://marshal:mongo@cluster0.8o9m6.mongodb.net/chat_db?authSource=admin&replicaSet=atlas-m5opbu-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true';
      await mongoose.connect(dbLink, {useNewUrlParser: true});
    });
    
  
    it('/user/:username route should return corresponding user', (done) => {
      request.get(`/user/${mockUsername}`).then(result => {
        assert.equal(result.body.user.username, mockUsername);
        done();
      });
    });
  
    it('/:userId/:task should return an array of followers', (done) =>{
      request.get(`/${mockUserID}/followers`).then(result => {
        assert.equal(result.body.followers._id, mockUserID);
        assert.typeOf(result.body.followers.followers, 'array');
        assert.typeOf(result.body.followers.followers[0]._id, 'string');
        done();
      });
    });
    
    it('should save a new user to the database', async () => {
      // email, fullname, username, password
        const email = 'test1@gmail.com';
        const fullname = 'John Doe Test';
        const username = 'JohnTest';
        const password = '123456';

        await request.post('/signup', )
        .send({email, fullname, username, password})

        const user = await User.findOne({username})
        assert.equal(user.username, username)
        await User.findOneAndDelete({username})
    });
  });
});