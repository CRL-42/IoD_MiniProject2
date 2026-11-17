import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

import HomePage from '../Pages/HomePage';
import TriviaPage from '../Pages/TriviaPage';
import {QuizGenerator, QuestionList, AnswerList} from '../components/Quiz';
import LoginPage from '../Pages/LoginPage';
import PageNotFound from '../Pages/PageNotFound';

export default function AppRoutes(props) {
    return (
        <Routes>
            <Route index element={<HomePage {...props} />} />
            <Route path="/trivia" element={<ProtectedRoute><TriviaPage /></ProtectedRoute>} >
                <Route index element={<QuizGenerator />} />
                <Route path="quiz" element={<QuestionList />} />
                <Route path="quiz/answers" element={<AnswerList />} />
            </Route>
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    );
}