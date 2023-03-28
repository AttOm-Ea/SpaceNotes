import { useState, useEffect } from 'react';
import './App.css';
import Note from './components/Note';
import Author from './components/Author';


export default function App() {
  
  const [data, setData] = useState([]);
  const [phrase, setPhrase] = useState("Loader ...");
  const [author, setAuthor] = useState("Loader...");
  const [call, setCall] = useState(true);
  const [oldNumber, setOldNumber] = useState(0)
  const [newBg, setNewBg] = useState("bg4");
  const [numBg, setNumBg] = useState(1);
  
  const positionRandom = () => {
    return (Math.round(Math.random()*10)); 
  }

  const randomBg = () => {
    if (numBg == 4) {
      setNumBg(1);
    }else{
      setNumBg(numBg + 1);
    }
    setNewBg("bg"+numBg);
  }
  
  const getData=()=>{
    fetch('phrases.json')
    .then(response => response.json())
    .then(json => setData(json))
    .catch(err => console.log('Solicitud fallida', err));  
  }

  useEffect(()=>{
    getData();
  },[]);

  useEffect(()=>{
    let position = positionRandom();
    console.log(position);
    if (data.length > 0 && call) {
      setCall(false);
      setPhrase(data[position].phrase);
      setAuthor(data[position].author);
    }
  },[data]);

  const newPhrase = () => {
      let position = positionRandom();
      if (position != oldNumber) {
        randomBg();
        setOldNumber(position);
        setPhrase(data[position].phrase);
        setAuthor(data[position].author);  
      }else{
        newPhrase();
      }
  }


  return (
    <div className="App">
      <div className='screenSaver'>
        <div className="contentNote">
          <div className={newBg + " note"}>
            <Note text={phrase}/>
              <br/> <hr/>
            <Author author={author}/>                      
          </div>
        </div>
        <div className='contentRocket'>
          <button className='rocketBtn' onClick={newPhrase}> 
            <div className='rocketMovement'> </div>
          </button>  
        </div>
      </div>
    </div>
  )
}

