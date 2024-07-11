import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import "./Choose.css";

export default function Choose() {
    const navigate = useNavigate();
    var [opacity,setopacity] = useState(1);
    var [opp,setopp] = useState(0);
    const[link,setlink] = useState('');
    const [id,setId] = useState('');

function GetId(){
  const ref = link;
  const linkArr = ref.split("/");
  const id = linkArr[linkArr.length - 1];
  console.log("id:",id);
  setId(id);


  navigate(`quizzyApp/quiz/${id}`);
}

    function handleOpacityChnge(){
        setopacity(prevOpacity=>(prevOpacity === 1 ? 0 : 1));
        setopp(prevOpp=>(prevOpp === 1 ? 0 : 1));
    }

  return (
    <div className='mainPage'>
    <div className='quizpage'>
    <div className='line-1'/>
    <div className='line-2'/>
    <h1>Quizzy</h1>
    <p>A Quiz platform where you can make your own quiz and share it to others !</p>
    <Link to="/Create"><button className='CreateQuiz' style={{opacity}}>Create</button></Link>
    <button className='PlayQuiz' style={{opacity}} onClick={handleOpacityChnge}>Play</button>
    <input className='LinkInp' onChange={(e)=>{setlink(e.target.value)}} placeholder='Enter link' style={{opacity:opp}} type='text'/><button className='Play' onClick={GetId} style={{opacity:opp}}>Enter</button>
    </div>
    </div>
  )
}
