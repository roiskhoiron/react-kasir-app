import "./App.css";
import { Hasil, NavbarComponent, ListCategories } from './components'
import { Col, Row, Container } from "react-bootstrap";

function App() {
  return (
    <div className="App">
      <NavbarComponent />
      <div className="mt-3 text-justify">
        <Container fluid>
          <Row>
            <ListCategories />
            <Col>
              <h4>
                <strong>Daftar Produk</strong>
              </h4>
              <hr />
            </Col>
            <Hasil />
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default App;
