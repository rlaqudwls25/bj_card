import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from '@pages/Home'
import Test from '@pages/Test'
import Card from '@/pages/card/Card'
import SignUp from '@/pages/auth/SignUp'
import Login from '@/pages/auth/Login'
import Navbar from '@components/Layout/Navbar'
import PrivateRoute from '@components/auth/PrivateRoute'
import Apply from '@/pages/apply/Apply'
import MyPage from './pages/my/My'
import ApplyDone from './pages/apply/ApplyDone'
import Credit from './pages/credit/Credit'
import CreditCheck from './pages/credit/CreditCheck'
import NewAccount from './pages/account/Account'
import AccountPage from './pages/account/AccountWithTransaction'
import TransactionPage from './pages/account/Transaction'

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
          path="/account/create"
          element={
            <PrivateRoute>
              <NewAccount />
            </PrivateRoute>
          }
        />

        <Route
          path="/account"
          element={
            <PrivateRoute>
              <AccountPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/account/transaction"
          element={
            <PrivateRoute>
              <TransactionPage />
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
