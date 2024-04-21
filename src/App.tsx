import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from '@pages/Home'
import Test from '@pages/Test'
import Card from '@pages/Card'
import SignUp from '@pages/SignUp'
import Login from '@/pages/Login'
import Navbar from '@components/Layout/Navbar'
import PrivateRoute from '@components/auth/PrivateRoute'
import Apply from '@/pages/Apply'
import MyPage from './pages/My'
import ApplyDone from './pages/ApplyDone'
import Credit from './pages/Credit'
import CreditCheck from './pages/CreditCheck'
import Account from './pages/Account'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/card/:id" element={<Card />} />
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<Test />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<Navigate replace to="/login" />} />
        <Route
          path="/apply/:id"
          element={
            <PrivateRoute>
              <Apply />
            </PrivateRoute>
          }
        />

        <Route
          path="/apply/done"
          element={
            <PrivateRoute>
              <ApplyDone />
            </PrivateRoute>
          }
        />

        <Route
          path="/my"
          element={
            <PrivateRoute>
              <MyPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/account"
          element={
            <PrivateRoute>
              <Account />
            </PrivateRoute>
          }
        />

        <Route path="/credit" element={<Credit />} />
        <Route path="/credit/check" element={<CreditCheck />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
