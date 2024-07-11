import React, { useState } from 'react';
import { addDoc,collection} from 'firebase/firestore';
import {db} from './FireBaseConfig';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';


const CreateQuiz = () => {
const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([{ questionText: '', options: ['', '', '', ''], correctOption: '' }]);

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...questions];
    if (field.startsWith('options[')) {
      const optionIndex = parseInt(field.split('[')[1].split(']')[0], 10);
      newQuestions[index].options[optionIndex] = value;
    } else {
      newQuestions[index][field] = value;
    }
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, { questionText: '', options: ['', '', '', ''], correctOption: '' }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const quizRef = collection(db,"QuizData");
    const docref = await addDoc(quizRef,{
      title,
      questions,
      
    });

    console.log('Document written with ID: ', docref.id);
    alert(`Quiz created! Share this link: quizzyApp/quiz/${docref.id}`);
    setTimeout(() => {
      navigate("/");
    }, 4000);
    
  };



  return (
    <div className='MainPage'>
    <div className='quizPage'>
      <h1>Create Quiz</h1>
      <form className='formForQuiz' onSubmit={handleSubmit}>
        <input
        className='title'
          type="text"
          placeholder="Quiz Title "
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <br/>
        {questions.map((question, index) => (
          <div key={index}>
            <input
            className='question'
              type="text"
              placeholder={`Question ${index+1}`}
              value={question.questionText}
              onChange={(e) => handleQuestionChange(index, 'questionText', e.target.value)}
              required
            />
            <br/>
            {question.options.map((option, optIndex) => (
              <input
              className='optionholder'
                type="text"
                placeholder={`Option ${optIndex + 1}`}
                value={option}
                onChange={(e) => handleQuestionChange(index, `options[${optIndex}]`, e.target.value)}
                required
              />
            ))}
            <input
            className='correct'
              type="text"
              placeholder="Correct Option"
              value={question.correctOption}
              onChange={(e) => handleQuestionChange(index, 'correctOption', e.target.value)}
              required
            />
          </div>
        ))}
        <button className='add' type="button" onClick={addQuestion}>Add</button>
        <button className='create'  type="submit">Create</button>
      </form>
      </div>
    </div>
  );
};

export default CreateQuiz;
