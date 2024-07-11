import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateQuiz from './HomePage';
import TakeQuiz from './TakeQuiz';
import Choose from './Choose';
import LeaderBoard from './LeaderBoard';
//import Leaderboard from './components/Leaderboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Create" element={<CreateQuiz/>}/>
        <Route path="/" element={<Choose/>}/>
        <Route path="quizzyApp/quiz/:id" element={<TakeQuiz/>} />
        <Route path="/quizzyApp/leaderboard/:id" element={<LeaderBoard/>} />
        </Routes>
    </Router>
  );
}

export default App;

