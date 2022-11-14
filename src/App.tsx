import React, {useEffect, useState} from 'react';
import './App.css';
import Dropdown from "./components/Dropdown";

function App() {

    const [userLocation, setUserLocation] = useState<{latitude: number, longitude: number} | null>(null);
    const [allowLocation, setAllowLocation] = useState(false);
    const [sportsApiData, setSportsApiData] = useState<Object | null>(null);
    const [category, setCategory] = useState('water');

    function getUserLocation() {
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(getCoordinates, () => console.log("Must enable location"));
        }
    }

    function getCoordinates(position: GeolocationPosition) {
        setUserLocation({latitude: position.coords.latitude, longitude: position.coords.longitude});
        setAllowLocation(true);
    }

    async function fetchSportsNearLocation() {
        if(userLocation !== null) {
            const location = "-73.5826985,45.5119864";
            const response = await fetch("https://sports.api.decathlon.com/sports/search/" + category + "?coordinates=" + location);
            const data = await response.json();
            setSportsApiData(data);
        }
    }

    //Get location on component mounting
    useEffect(() => {
        getUserLocation();
    }, []);

    //Call to sport API when we have user location
    useEffect(() => {
        fetchSportsNearLocation();
    }, [userLocation])

    //Call to sport API when category changes
    useEffect(() => {
        fetchSportsNearLocation();
        console.log("Now showing data for: " + category);
    }, [category]);

    //Console log when user location changes
    useEffect(() => {
        if(userLocation) console.log("Location updated: " + userLocation.latitude + ", " + userLocation.longitude)
    }, [userLocation]);

    if(!allowLocation) {
        return (
            <div className="App">
                <h1>Allow Location</h1>
            </div>
        )
    }

    else if(sportsApiData !== null) return (
            <div className="App">
                <h1>Searching for sports around Queens, New York, USA</h1>
                <Dropdown setCategory={setCategory} category={category} data={sportsApiData}/>
            </div>
    )

    else {
        return (
            <div className="App">
                <h1>Fetching Location...</h1>
            </div>
        )
    }

}

export default App;
