import { Container, Row, Col } from 'react-bootstrap'
import Login from './components/Login'
import './App.scss'

function App() {

  return (
    <>
      <div className='header'>
        <Container>
          <Row>
            <Col md={8}>
              <div className='header-content'>
                <h1>Res Bella Vista</h1>
                <p>Welcome to the Res Bella Vista application!</p>
              </div>
            </Col>
            <Col md={4}>
              <Login />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}

export default App
