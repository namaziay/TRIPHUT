const APIService = {};
const BASE_URL = 'http://localhost:3001';

APIService.authenticate = (token) => {
  return fetch(`${BASE_URL}/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + token,
    },
  })
  .then(res => res.json())
  .catch(err => console.log(err));
}

APIService.signIn = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method:'POST',
    headers:{
      'Content-Type':'application/json'
      
    },
    body:JSON.stringify({
      email,
      password
    })
  })
  .then(res => res.json())
  .catch(err =>console.log(err))
}


APIService.getProfileInfo = (username, token ) => {
  return fetch(`${BASE_URL}/user/${username}`,{
    headers:{
      'Content-Type':'application/json',
      'authorization':"Bearer " + token
    }
  })
  .then(res =>res.json())
  .catch(err => console.log(err))
}

APIService.getFollowers = (userID) => {
  return fetch (`${BASE_URL}/user/${userID}/followers`, {
    headers: {
      "Content-Type":'application/json',
    }
  })
  .then(res => res.json())
  .catch(err => console.log(err));
} 

APIService.getFollowing = (username) => {
  return fetch (`${BASE_URL}/user/${username}/following`, {
    headers: {
      "Content-Type":'application/json',
    }
  })
  .then(res => res.json())
  .catch(err => console.log(err));
} 

APIService.follow = (username, token) => {
  return fetch(`${BASE_URL}/user/${username}/follow`,{
    method: 'POST',
    headers: {
      "Content-Type":'application/json',
      'authorization':"Bearer " + token
    }
  })
  .then(res => res.json())
  .catch(err => console.log(err));
}

APIService.createUser = (email, fullname, username, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify({
      email,
      fullname,
      password,
      username
    })
  })
  .then(res => res.json())
  .catch(err => console.log(err));
};


APIService.postPhoto = (send, postId, token) =>{
  return fetch(`${BASE_URL}/photos`,{
    method:'POST',
    headers:{
      'Content-Type':'application/json',
      "authorization": "Bearer " + token
    },
    body:JSON.stringify({
      photo:send,
      tripId:postId
    })
  })
  .then(res => res.json())
  .catch(err => console.log(err));
}

APIService.editProfile = (id, data, token) =>{
  return fetch(`${BASE_URL}/updateUser`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "authorization": "Bearer " + token
    },
    body: JSON.stringify({ id, data })
  })
  .then(res => res.json())
  .catch(err => console.log(err));
}

APIService.updateProfilePhoto = (username, send, token) => {
  return fetch(`${BASE_URL}/updateProfilePhoto`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "authorization": "Bearer " + token
    },
    body: JSON.stringify({
      dp: send,
      username
    })
  })
  .then(res => res.json())
  .catch(err => console.log(err));
};

APIService.like = (tripId, token) => {
  return fetch(`${BASE_URL}/like`, {
    method:'POST',
    headers:{
      'Content-Type':'application/json',
      "authorization": "Bearer " + token
    },
    body:JSON.stringify({tripId})
  })
  .catch(err => console.log(err))
}


APIService.deleteTrip = (id) => {
  return fetch (`${BASE_URL}/${id}/delete`, {
    method:'DELETE',
    headers:{
      'Content-Type':'application/json',
      'authorization': "Bearer " + localStorage.getItem('jwt')
    }
  })
  .then(res => res.json())
  .catch(err => console.log(err));
}

APIService.getAllTrips = () => {
  return fetch(`${BASE_URL}/alltrips`, {
    headers: {
      "Content-Type": "application/json",
    }
  })
  .then(res => res.json())
  .catch(err => console.log(err));
}

APIService.createTrip = (url, description, title, token) => {
  return fetch(`${BASE_URL}/createtrip`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "authorization": "Bearer " + token
    },
    body: JSON.stringify({
      url: url,
      description: description,
      title: title,
    })
  })
  .then(res => res.json())
  .catch(err => console.log(err))
}

APIService.populateTrips = (id, postId, token) => {
  return fetch((id) ? `${BASE_URL}/user/${id}/trips` : (postId) ? `${BASE_URL}/myCollections` : `${BASE_URL}/alltrips`, {
    method: (id) ? "POST" : "GET",
    headers: {
      "Content-Type": "application/json",
      "authorization": "Bearer " + token 
    }
  })
  .then(res => res.json())
  .catch(err => console.log(err))
}

APIService.getTripInfo = (postId, token) => {
  return fetch(`${BASE_URL}/trips`,{
    method: 'POST',
    headers:{
      'Content-Type':'application/json',
      "authorization": "Bearer " + token
    },
    body: JSON.stringify({postId})
  })
  .then(resp => resp.json())
  .catch(err => console.log(err));
};

module.exports = APIService;