import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='bg-[#f7f7f7] dark:bg-black'>
      <Toaster />
      <Routes>
        <Route path="/" element={<Layout />}>
          
        </Route>
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/dashboard" replace />}
        />

        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to="/dashboard" replace />}
        />
        
        
        <Route element={<AdminRoute />}>
          <Route
            path="/"
          />
        </Route>
        
      </Routes>
    </div>
  )
}

export default App
