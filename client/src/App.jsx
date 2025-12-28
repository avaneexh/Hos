import { Toaster } from "react-hot-toast";

function App() {

  return (
    <div >
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
