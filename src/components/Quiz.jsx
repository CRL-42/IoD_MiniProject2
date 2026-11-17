import { Outlet, useNavigate, useSearchParams, useLocation } from "react-router-dom";
import useData from "../hooks/useData";
import { useState } from "react";

import {Card, Box, FormLabel, FormControlLabel, Button, Radio, RadioGroup, Typography} from '@mui/material'

const url = "https://opentdb.com/api.php?amount=";

function decodeHTML(html) {
  const parser = new DOMParser();
  return parser.parseFromString(html, "text/html").body.textContent;
}

export default function Quiz() {
  return (
    <div className="Quiz">
      <Outlet />
    </div>
  );
}

export function QuizGenerator() {
  const [amount, setAmount] = useState(5);
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const navigate = useNavigate();

  const handleStartQuiz = (e) => {
    e.preventDefault();

    const params = new URLSearchParams({ amount });
    if (category) params.append("category", category);
    if (difficulty) params.append("difficulty", difficulty);

    navigate(`/trivia/quiz?${params.toString()}`);
  };

  const data = useData("https://opentdb.com/api_category.php");
  const categoryData = data?.trivia_categories || [];

  return (
    <Card
      className="LoginForm componentBox"
      sx={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "450px",
        alignSelf: "center",
        mx: "auto",
      }}
    >
      <Box
        component="form"
        onSubmit={handleStartQuiz}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          alignSelf: "center",
        }}
      >
        <h3>Trivia Generator</h3>
        <div>
          <FormLabel>
            Choose number of questions:
            <select value={amount} onChange={(e) => setAmount(e.target.value)}>
              {[5, 10, 15, 20, 25, 30, 35, 40, 45, 50].map((number) => (
                <option key={number} value={number}>
                  {number}
                </option>
              ))}
            </select>
          </FormLabel>
        </div>

        <div>
          <FormLabel>
            Category:
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option key="0" value="">
                Any Category
              </option>
              {categoryData.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </FormLabel>
        </div>

        <div>
          <FormLabel>
            Difficulty:
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <option value="">Any</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </FormLabel>
        </div>
        <div>
          <Button type="submit" onClick={handleStartQuiz}>Start Quiz</Button>
        </div>
      </Box>
    </Card>
  );
}

export function QuestionList() {
  const [searchParams] = useSearchParams();
  const[userAnswers, setUserAnswers] = useState({});
  const navigate = useNavigate();

  const amount = searchParams.get("amount") || 5;
  const category = searchParams.get("category");
  const difficulty = searchParams.get("difficulty");

  const categoryQuery = category ? `&category=${category}` : "";
  const difficultyQuery = difficulty ? `&difficulty=${difficulty}` : "";
  const apiUrl = url + amount + categoryQuery + difficultyQuery + "&type=multiple";

  const data = useData(apiUrl);

  const formattedQuestions = (data?.results || []).map((fact, index) => ({
    ...fact,
    id: index + 1,
    allAnswers: [...fact.incorrect_answers, fact.correct_answer].sort(),
  }));

  const handleOptionChange = (questionId, answer) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleSubmitQuiz = (e) => {
    e.preventDefault();
    navigate('/trivia/quiz/answers', {
      state: {
        questions: formattedQuestions, userAnswers
      }
    });
  };

  if (!formattedQuestions.length) {
    return <p>Loading...</p>;
  }

  return (
    <Card
      className="LoginForm componentBox"
      sx={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "450px",
        alignSelf: "center",
        mx: "auto",
      }}
    >
      <h3>Quiz</h3>
      <Box
        component="form"
        onSubmit={handleSubmitQuiz}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          alignSelf: "center",
        }}
      >
        {formattedQuestions.map((fact) => (
          <Card
            key={fact.id}
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "400px",
              alignSelf: "center",
              mx: "auto",
              backgroundColor: "#222",
            }}
          >
            <Typography 
              component="h4" 
              gutterBottom
              sx={{ textDecoration: "underline" }}
            >
              Question #: {fact.id}
            </Typography>
            <FormLabel
              id={`question-${fact.id}-label`}
            >
              {decodeHTML(fact.question)}
              <RadioGroup
                aria-labelledby={`question-${fact.id}-label`}
                name={`question-${fact.id}`}
                value={userAnswers[fact.id] ?? ''}
                onChange={(e) => handleOptionChange(fact.id, e.target.value)}
              >
                {fact.allAnswers.map((answer, i) => (
                  <FormControlLabel
                    key={i}
                    value={answer}
                    control={<Radio />}
                    label={decodeHTML(answer)}
                  />
                ))}
              </RadioGroup>
            </FormLabel>
          </Card>
        ))}

        <div>
          <Button type="submit" onClick={handleSubmitQuiz}>
            Submit Quiz
          </Button>
        </div>
      </Box>
    </Card>
  );
}

export function AnswerList() {
  const navigate = useNavigate();
  const location = useLocation();

  const questions = location.state?.questions || [];
  const userAnswers = location.state?.userAnswers || {};

  const handleReturnToGenerator = (e) => {
    e.preventDefault();
    navigate('/trivia');
  };

  if (!questions.length) {
    return (
      <div className='AnswerList componentBox'>
        <p>No quiz daata found. Complete quiz first.</p>
        <button onClick={() => navigate('/trivia')}>Back to settings</button>
      </div>
    );
  }

  const correctCount = questions.reduce((count, q) => {
    return userAnswers[q.id] === q.correct_answer ? count + 1 : count;
  }, 0);

  return (
    <div className='AnswerList componentBox'>
      <h3>Results</h3>
      <h4>Scored {correctCount}/{questions.length}</h4>
      <Box>
        {questions.map((q) => {
          const userAnswer = userAnswers[q.id];
          const isCorrect = userAnswer === q.correct_answer;

          return (
            <Card
            key={q.id}
            sx={{
              display: "flex",
              flexDirection: "column",
              maxWidth: "450px",
              alignSelf: "center",
              mx: "auto",
              backgroundColor: "#333",
            }}
            >
              <p><strong>Question {q.id}:</strong>{decodeHTML(q.question)}</p>
              <p>Your Answer: 
                <span style={{color: isCorrect ? 'green' : 'red'}}>
                  {userAnswer ? decodeHTML(userAnswer) : 'No answer given'}
                </span>
              </p>
              {!isCorrect && (
                <p>Correct Answer: 
                  <span style={{color: 'green'}}>
                    {decodeHTML(q.correct_answer)}
                  </span>
                </p>
              )}
            </Card>
          );
        })}
      </Box>
      <Box
        component="form"
        onSubmit={handleReturnToGenerator}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          alignSelf: "center",
          maxWidth: "450px",
          mx: "auto",
        }}
      >
        <Button type="submit" onClick={handleReturnToGenerator}>Generate New Quiz</Button>
      </Box>
    </div>
  );
}