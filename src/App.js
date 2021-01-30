import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./containers/LandingPageContainer/NavBar";
import LandingPage from "./containers/LandingPageContainer/LandingPage";
import ChoicePage from "./containers/LoadCreateContainer/ChoicePage";
import CreatePage from "./containers/LoadCreateContainer/CreatePage";
import LoadPage from "./containers/LoadCreateContainer/LoadPage";
import Character from "./containers/CharacterContainer/Character";



const App = ()=> {

  const [loggedInUsername, setLoggedInUsername] = useState();
  const [loggedInPassword, setLoggedInPassword] = useState();
  const [userData, setUserData] = useState({});
  const [currentCharacter, setCurrentCharacter] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);


  const animals = [
    {id: 1, animal_type: {dog: {
      appetite: 0.5, grooming: 0.6, cheeriness: 0.2, activity_level: 0.9
    }}, images: ["https://art.pixilart.com/a407c6ad7e177d2.png"],
    name: "Jellibobs", health: 20, happiness:20, cleanliness:20,
    fitness:20, hunger:20
    },
    {id: 2, animal_type: {cat: {
      appetite: 0.3, grooming: 0.2, cheeriness: 0.7, activity_level: 0.6
    }}, images: ["../assets/images/cat.png"],
    name: "Kitty Fursbags", health: 20, happiness:20, cleanliness:20,
    fitness:20, hunger:20
    },
    {id: 3, animal_type: {monkey: {
      appetite: 0.9, grooming: 0.7, cheeriness: 0.5, activity_level: 1
    }}, images: ["../assets/images/cat.png"],
    name: "Cheeky Chops", health: 20, happiness:20, cleanliness:20,
    fitness:20, hunger:20
    },
    {id: 4, animal_type: {unicorn: {
      appetite: 0.5, grooming: 0.9, cheeriness: 0.6, activity_level: 0.7
    }}, images: ["../assets/images/cat.png"],
    name: "Dolly", health: 20, happiness:20, cleanliness:20,
    fitness:20, hunger:20
    },
    {id: 5, animal_type: {dragon: {
      appetite: 0.9, grooming: 0.1, cheeriness: 0.1, activity_level: 0.7
    }}, images: ["../assets/images/cat.png"],
    name: "Mr. Flamez", health: 20, happiness:20, cleanliness:20,
    fitness:20, hunger:20
    },
    {id: 6, animal_type: {penguin: {
      appetite: 0.5, grooming: 0.9, cheeriness: 0.6, activity_level: 0.7
    }}, images: ["../assets/images/cat.png"],
    name: "Beany", health: 20, happiness:20, cleanliness:20,
    fitness:20, hunger:20
  }  
  ]
  //dummy data
  const usernameAndPassword = [
    {id: 100, username: "Emily", password: "3mily", animals: [animals[0]]},
    {id: 99, username: "Stuart", password: "5tuart",  animals: [animals[1]]},
    {id: 98, username: "Ruth", password: "7uth", animals: [animals[2], animals[3]]},
    {id: 97, username: "Michael", password: "m1chael", animals: [animals[4]]},
    {id: 96, username: "Andy", password: "4ndy", animals: [animals[5]]}
  ]
  //if they need a lot of food, appetite = high
  //if they get dirty quickly/don't groom often, grooming = high
  //if they are unhappy animals, cheeriness = high
  //if they need a lot of exercise, activity level = high
  

  const handleSubmit = (data) => {
    usernameAndPassword.forEach(element => {
      if (element.username === data.username && element.password === data.password){
        console.log("Success");
        setLoggedInUsername(data.username)
        setLoggedInPassword(data.password)
        setLoggedIn(true);
      }else{
        console.log("Failure");
      }
    });
  }

  const selectCurrentCharacter = (characterId) => {
    setCurrentCharacter(animals.find(animal => animal.id === characterId))
  }

  const getUserData = () => {
    console.log("getting user data");
    if (loggedIn){
      setUserData(usernameAndPassword.find(element => element.username === loggedInUsername))
    }
//this would mean there cannot be duplicate usernames!

    // fetch(`https://localhost:3000/tamagotchi?username=${loggedInUsername}`)
    // .then(res => res.json())
    // .then(data => setUserData(data))
    // .then(() => setLoaded(true))
}

  useEffect(() => {
    getUserData();
  }, [loggedInUsername])

  
  return (
    <Router>
      <>
        <NavBar />
        <Switch>
        <Route exact path="/" render={() => loggedIn? <Redirect to= "/choicepage" /> : <LandingPage onSubmit = {handleSubmit}></LandingPage>} />
        <Route path="/choicepage" component={ChoicePage} />
        <Route path="/createpage" render={() => <CreatePage userAnimals={userData.animals}/>}/>
        <Route path="/loadpage"  render={() => <LoadPage userAnimals={userData.animals} selectCurrentCharacter={selectCurrentCharacter}/>} />
        <Route path="/character" render={() => <Character currentCharacter={currentCharacter}/>}/>
        
        </Switch>
      </>
    </Router>
  )

}

export default App;
