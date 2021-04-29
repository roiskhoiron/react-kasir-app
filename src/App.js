import React, { Component } from "react";
import "./App.css";
import { Hasil, NavbarComponent, ListCategories, Menus } from "./components";
import { Col, Row, Container } from "react-bootstrap";
import { API_URL } from "./utils/constants";
import axios from "axios";
import swal from 'sweetalert'

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menus: [],
      keranjangs: [],
      categoryChoosed: "Makanan",
    };
  }

  componentDidMount() {
    axios
      .get(API_URL + "products?category.nama=" + this.state.categoryChoosed)
      .then((res) => {
        console.log("Response : ", res);
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { menus, categoryChoosed } = this.state;

    return (
      <div className="App">
        <NavbarComponent />
        <div className="mt-4 text-justify">
          <Container fluid>
            <Row>
              <ListCategories
                onCategoryClicked={this.onCategoryClicked}
                categoryChoosed={categoryChoosed}
              />
              <Col>
                <h4>
                  <strong>Daftar Produk</strong>
                </h4>
                <hr />
                <Row>
                  {menus &&
                    menus.map((menu) => (
                      <Menus
                        key={menu.id}
                        menu={menu}
                        onMenuClicked={this.onMenuClicked}
                      />
                    ))}
                </Row>
              </Col>
              <Hasil />
            </Row>
          </Container>
        </div>
      </div>
    );
  }

  onCategoryClicked = (value) => {
    this.setState({
      categoryChoosed: value,
      meus: [],
    });

    axios
      .get(API_URL + "products?category.nama=" + value)
      .then((res) => {
        console.log("Response : ", res);
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  onMenuClicked = (value) => {
    const keranjang = {
      jumlah: 1,
      total_harga: value.harga,
      product: value
    }

    axios
      .post(API_URL + "keranjangs", keranjang)
      .then((res) => {
        swal({
          title: "Sukses Masuk Keranjang",
          text: "Sukses Masuk Keranjang " + keranjang.product.nama,
          icon: "success",
          button: false,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
