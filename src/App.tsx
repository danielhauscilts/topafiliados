import { Container, Row, Col } from 'react-bootstrap'
import './App.scss'

function App() {

  return (
    <>
      <div className='header'>
        <Container>
          <Row>
            <Col>
              <div className='header-content'>
                <h1>Res Bella Vista</h1>
                <p>Welcome to the Res Bella Vista application!</p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}

export default App
