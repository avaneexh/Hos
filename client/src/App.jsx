import { Toaster } from "react-hot-toast";

function App() {

  return (
    <div >
      <Toaster />
      <Routes>
        <Route path="/" element={<Layout />}>
          
        </Route>
        <Route
        />

        <Route
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
