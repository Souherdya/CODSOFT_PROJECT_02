import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { db } from './FireBaseConfig';
import {getDocs,where,collection,query,addDoc} from 'firebase/firestore';
import "./TakeQuiz.css"

const TakeQuiz = () => {

  const navigate = useNavigate();

  const { id } = useParams(); // Retrieve the quiz ID from the URL
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(null);
  const [name,setname] = useState('');

  var [opacity,setopacity] = useState(0);
  var [opp,setopp] = useState(1);
   
  function handleOpacityChnge(){
    if(name){
    setopacity(prevOpacity=>(prevOpacity === 1 ? 0 : 1));
    setopp(prevOpp=>(prevOpp === 1 ? 0 : 1));
    }
    else{alert("Enter name!")}
}


  console.log("id:",id);
  useEffect(() => {
    const fetchQuiz = async () => {
      const q = query(collection(db, 'QuizData'), where('__name__', '==', id)); // Use a query to filter by document ID
      try {
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          querySnapshot.forEach((doc) => {
            setQuiz(doc.data()); // Set the document data in the state
          });
        } else {
          console.log('No such document!');
        }
      } catch (e) {
        console.error('Error getting document: ', e);
      }
    };
    fetchQuiz();
  }, [id]);

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newScore = 0;
    quiz.questions.forEach((question, index) => {
      if (question.correctOption === answers[index]) {
        newScore++;
      }
    });
    setScore(newScore);
    // Save the score to the leaderboard (not shown in this snippet)
    AddLeaderBoard(newScore); 
   

  };
  async function AddLeaderBoard(score) {
    const quizRef = collection(db, "LeaderBoard");
    const docref = await addDoc(quizRef, {
      Name: name,
      score: score+1
    });
    console.log("Data added!");
    alert(`Your score is: ${score+1}`);
    setTimeout(() => {
      navigate(`/quizzyApp/leaderboard/${docref.id}`)
    }, 2000);
    
  }

   
  if (!quiz) {
    return <div>Loading...</div>;
  }



  return (
    <div className='main'>
    <input className='nameforLB' placeholder='Enter Your Name..' onChange={(e)=>{setname(e.target.value)}} style={{opacity:opp}}/><button style={{opacity:opp}} className='but' onClick={handleOpacityChnge}>Enter</button>
    <div className='container' style={{opacity}}>
      <h2>{quiz.title}</h2>
      <form onSubmit={handleSubmit}>
        {quiz.questions.map((question, index) => (
          <div className='questionDiv'>
          <div key={index} >
           <p>{question.questionText}</p>
            {question.options.map((option, optIndex) => (
              <div key={optIndex} className='radio'>
                <input
                  type="radio"
                  name={`question-${index}`}
                  value={option}
                  onChange={(e) => handleAnswerChange(index, e.target.value)}
                />
                {option}
              </div>
              
            ))}
          </div>
          </div>
        ))}
        <button className='sub'>Submit</button>
      </form>
      {score !== null && <p className='score'>Your score is: {score +1}</p>}
      </div>
    </div>
  );
};

export default TakeQuiz;
