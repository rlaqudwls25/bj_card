import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '@pages/Home'
import Test from '@pages/Test'
import Card from '@pages/Card'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/card/:id" element={<Card />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
