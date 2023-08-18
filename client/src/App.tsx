import { Routes, Route } from 'react-router-dom';
import NavBar from "./components/NavBar.tsx";
import Box from "@mui/material/Box";
function App() {
  return (
      <Box sx={{maxWidth:'60vw', margin: '0 auto'}}>
        <Routes>
          <Route path="/" element={<NavBar />} >

          </Route>
        </Routes>
      </Box>
  )
}

export default App
