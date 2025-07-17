
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QuizProvider } from './contexts/QuizContext'
import HomePage from './pages/HomePage'
import QuizPage from './pages/QuizPage'
import ResultPage from './pages/ResultPage'
import './App.css'
import { Toaster } from '@/components/ui/sonner'

function App() {
  return (
    <Router>
      <QuizProvider>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/result" element={<ResultPage />} />
          </Routes>
        </div>
        <Toaster />
      </QuizProvider>
    </Router>
  )
}

export default App 