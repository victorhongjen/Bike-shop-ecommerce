import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'

const App = () => {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <Router>
            <Routes>
              <Route path="/" element={<HomeScreen />} />
            </Routes>
          </Router>
        </Container>
      </main>
      <Footer />
    </>
  )
}

export default App
