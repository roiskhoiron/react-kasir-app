import React, { Component } from "react";
import "./App.css";
import { Hasil, NavbarComponent, ListCategories } from "./components";
import { Col, Row, Container } from "react-bootstrap";
import { API_URL } from "./utils/constants";
import axios from "axios";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menus: [],
    };
  }

  componentDidMount() {
    axios.get(API_URL + "products").then((res) => {
      console.log("Response : ", res);
      const menus = res.data;
      this.setState({ menus });
    })
      .catch(error => {
      console.log(error)
    })
  }

  render() {
    console.log("Data : ",this.state.menus);
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
}
