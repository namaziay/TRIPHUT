import React, {useEffect, useState} from 'react';
import {Link, useParams, useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import APIService from '../../apiService';
import './styles/tripPage.css'

const TripPage = ()=> {
  const [trip,setTrip] = useState();
  const [loaded,setLoaded] = useState(null);
  const [token] = useState(localStorage.getItem('jwt'))
  
  const {postId} = useParams()
  const navigate = useNavigate();
  const isAuth = useSelector(state=>state.isLogged)
  const loggedUser = useSelector(state => state.loggedUser);
  const isUpdate = useSelector(state=>state.isUpdate)

  useEffect(() => {
    APIService.getTripInfo(postId, token)
      .then(data => {
        if(!data.error){
          setTrip(data.trip[0])
          setLoaded(true)
          console.log("trip: " + trip)
        }else{
          navigate('/')
        }
      }).catch(e=> console.log(e))
  },[isUpdate, navigate, postId, trip, token]);

  return(
    isAuth && loaded ? (
      <div className="profile card-home home">
      {/* Top part with user dp & username */}
      <div className="profile-info row">
        <div className="col s4 left">
          {trip.url && <img className="profile-img" src={trip.url} alt="profile-img" />}
        </div>
        <div className="col s8 profile-data">
          <div className={"profile-flex"} >
            <span className="username profile-flex-item">{trip.title}</span>
          </div>
        </div>
        <div>
          <Link to={`/user/${trip.postedBy.username}`}> 
            <h3>{trip.postedBy.username}</h3>
          </Link>
        </div>
      </div>
      {(loggedUser._id === trip.postedBy._id) ?
        <div>
          <Link to={`/photos/${postId}`} >< div className="btn black" style={{ width: '48%', marginLeft: '2%', borderRadius: '0.3rem' }}><strong className="white-text">Add Photo</strong></div></Link>
        </div>
        :null
        }
        <hr className="hr-profile" />
        {
          (trip.photos.length > 0) ? 
          trip.photos.map(photo=> {
            return(<img src={photo} key={photo.title} alt="img" width="100%" className = "display-img-card" />)
          })
          
          :null
      }
      </div>
    )
    :
    null
  )
};

export default TripPage;