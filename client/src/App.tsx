import { Routes, Route } from 'react-router-dom';
import NavBar from "./components/NavBar.tsx";
import Box from "@mui/material/Box";
import Books from "./pages/Books.tsx";
function App() {
  return (
      <Box sx={{maxWidth:{xs: '100vw', md: '75vw', lg: '60vw'}, margin: '0 auto'}}>
        <Routes>
          <Route path="/" element={<NavBar />} >
              <Route index element={<Books />} />
          </Route>
        </Routes>
      </Box>
  )
}

export default App
