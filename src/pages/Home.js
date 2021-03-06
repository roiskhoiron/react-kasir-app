import React, { Component } from "react";
import "../App.css";
import { Hasil, ListCategories, Menus } from "../components";
import { Col, Row, Container } from "react-bootstrap";
import { API_URL } from "../utils/constants";
import axios from "axios";
import swal from "sweetalert";

export default class Home extends Component {
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

    this.refreshKerangjang();
  }

  refreshKerangjang = () => {
    axios
      .get(API_URL + "keranjangs")
      .then((res) => {
        console.log("Response : ", res);
        const keranjangs = res.data;
        this.setState({ keranjangs });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const { menus, categoryChoosed, keranjangs } = this.state;

    return (
      <div className='mt-4 text-justify'>
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
              <Row className="overflow-auto menu">
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
            <Hasil keranjangs={keranjangs} refreshKerangjang={this.refreshKerangjang} {...this.props}/>
          </Row>
        </Container>
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
    axios
      .get(API_URL + "keranjangs?product.id=" + value.id)
      .then((res) => {
        console.log("Data : " + res.data.length);
        if (res.data.length === 0) {
          console.log("data baru");
          const keranjang = {
            jumlah: 1,
            total_harga: value.harga,
            product: value,
          };

          axios
            .post(API_URL + "keranjangs", keranjang)
            .then((res) => {
              this.refreshKerangjang();
              swal({
                title: "Sukses Masuk Keranjang",
                text: "Sukses Masuk Keranjang " + keranjang.product.nama,
                icon: "success",
                button: false,
                timer: 1500,
              });
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          const keranjang = {
            jumlah: res.data[0].jumlah + 1,
            total_harga: res.data[0].total_harga + value.harga,
            product: value,
          };

          axios
            .put(API_URL + "keranjangs/" + res.data[0].id, keranjang)
            .then((res) => {
              this.refreshKerangjang();
              swal({
                title: "Sukses Perbarui Keranjang",
                text: "Sukses perbarui pesanan" + keranjang.product.nama,
                icon: "success",
                button: false,
                timer: 1500,
              });
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
}
