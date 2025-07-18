
import { QuizProvider } from './contexts/QuizContext'
import AppContainer from './components/AppContainer'
import './App.css'
import { Toaster } from '@/components/ui/sonner'

function App() {
  return (
    <QuizProvider>
      <div className="App">
        <AppContainer />
      </div>
      <Toaster />
    </QuizProvider>
  )
}

export default App 