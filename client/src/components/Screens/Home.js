import React, {useState,useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {useSelector} from 'react-redux';
import CreateTrip from './createTrip';
import Trip from '../subcomponents/Trip'
import Discover from '../subcomponents/Discover';
import APIService from '../../apiService'
import './styles/home.css'

const Home = () => {
  const {id, postId} = useParams();
  const loggedUser = useSelector(state => state.loggedUser)
  const isAuth = useSelector(state => state.isLogged);
  const isUpdate = useSelector(state => state.isUpdate);
  const trips = useSelector(state => state.ishTrips);
  const [followingTrips, setFollowingTrips] = useState([])

  useEffect(() => {

    async function getFollowing (){
      const response = await APIService.getFollowing(loggedUser.username)
      const allTrips = [];
      response.following.forEach(profile => {
        profile.trips.forEach(trip => allTrips.push(trip))
      })
      setFollowingTrips(allTrips);
    }
    
    getFollowing()
    
    // eslint-disable-next-line
}, [isAuth, isUpdate, id, postId]);  


  return(
    <div className="home trip-card">
    {
      isAuth &&
      trips && // Only display the block if user is logged in and post array has data from fetch API.
      <div>
        <div>Top Trips</div>
        <div>
          <Discover />
          </div>
          <div className="homepage" style={{ position: "relative", }}>
            {(!id && !postId) && <CreateTrip />}
            { // Mapping through the post state array to display all the trips on Page.
            followingTrips.map(trip => <Trip id={trip} key={trip} post={trip} />)
            }
        </div>
      </div>
    }
    </div>
  )
}

export default Home