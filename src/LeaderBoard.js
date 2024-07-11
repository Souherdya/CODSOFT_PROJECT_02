import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './LeaderBoard.css';
import { db } from './FireBaseConfig';
import { getDocs, where, collection, query } from 'firebase/firestore';

export default function LeaderBoard() {
  const { id } = useParams();
  const [score, setScore] = useState([]);

  console.log("id:", id);

  useEffect(() => {
    const fetchQuiz = async () => {
      const q = query(collection(db, 'LeaderBoard'), where('__name__', '==', id)); // Use a query to filter by document ID
      try {
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const scoreList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setScore(scoreList); // Set the array in the state
          console.log("Score:", scoreList);
        } else {
          console.log('No such document!');
        }
      } catch (e) {
        console.error('Error getting document: ', e);
      }
    };
    fetchQuiz();
  }, [id]);

  return (
    <div className='MainDiv'>
      <div className='CompDiv'>
        <div className='line1' />
        <div className='line2' />
        <h1>Score Board</h1>
        <div className='Score-Card'>
          {score.map(item => (
            <h2 key={item.id} className='hFor'>{item.score}</h2>
          ))}
        </div>
        {score.map(item => (
          <p key={item.id} className='NameOfPlayer'>{item.Name}</p>
        ))}
        <p className='QuizTitle'>My Quiz</p>
        <Link to="/"><button className='HomePage'>Home</button></Link>
        <button className='PlayAgain'>Play Again</button>
      </div>
    </div>
  );
}
