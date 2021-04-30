import axios from "axios";
import React, { Component } from "react";
import { Badge, Col, ListGroup, Row } from "react-bootstrap";
import swal from "sweetalert";
import { API_URL } from "../utils/constants";
import { numberWithCommas } from "../utils/utils";
import DialogKeranjang from "./DialogKeranjang";
import Purchasing from "./Purchasing";

export default class Hasil extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showDialog: false,
      keranjangDetail: false,
      jumlah: 0,
      keterangan: "",
      totalHarga: 0,
    };
  }

  handleShow = (menuKeranjang) => {
    this.setState({
      showDialog: true,
      keranjangDetail: menuKeranjang,
      jumlah: menuKeranjang.jumlah,
      keterangan: menuKeranjang.keterangan,
      totalHarga: menuKeranjang.total_harga,
    });
  };

  handleClose = () => {
    this.setState({
      showDialog: false,
    });
  };

  onChangeHandler = (event) => {
    this.setState({
      keterangan: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    this.handleClose();

    const keranjang = {
      jumlah: this.state.jumlah,
      total_harga: this.state.totalHarga,
      product: this.state.keranjangDetail.product,
      keterangan: this.state.keterangan,
    };

    axios
      .put(API_URL + "keranjangs/" + this.state.keranjangDetail.id, keranjang)
      .then((res) => {
        this.props.refreshKerangjang();
        swal({
          title: "Update Pesanan Keranjang",
          text: "update pesanan Keranjang " + keranjang.product.nama,
          icon: "success",
          button: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  tambahPorsi = () => {
    this.setState({
      jumlah: this.state.jumlah + 1,
      totalHarga:
        this.state.keranjangDetail.product.harga * (this.state.jumlah + 1),
    });
  };

  kurangiPorsi = () => {
    if (this.state.jumlah !== 1) {
      this.setState({
        jumlah: this.state.jumlah - 1,
        totalHarga:
          this.state.keranjangDetail.product.harga * (this.state.jumlah - 1),
      });
    }
  };

  render() {
    const { keranjangs } = this.props;

    return (
      <Col md={3} mt='2'>
        <h4>
          <strong>Daftar Pesanan</strong>
        </h4>
        <hr />
        {keranjangs !== 0 && (
          <ListGroup variant='flush'>
            {keranjangs.map((menuKeranjang) => (
              <ListGroup.Item
                key={menuKeranjang.id}
                onClick={() => this.handleShow(menuKeranjang)}
              >
                <Row>
                  <Col xs={2}>
                    <h4>
                      <Badge pill variant='success'>
                        {menuKeranjang.jumlah}
                      </Badge>
                    </h4>
                  </Col>
                  <Col>
                    <h5>{menuKeranjang.product.nama}</h5>
                    <p>Rp. {numberWithCommas(menuKeranjang.product.harga)}</p>
                  </Col>
                  <Col>
                    <strong className='float-flight'>
                      Rp. {numberWithCommas(menuKeranjang.total_harga)}
                    </strong>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}

            <DialogKeranjang
              handleClose={this.handleClose}
              tambahPorsi={this.tambahPorsi}
              kurangiPorsi={this.kurangiPorsi}
              onChangeHandler={this.onChangeHandler}
              handleSubmit={this.handleSubmit}
              {...this.state}
            />
          </ListGroup>
        )}

        <Purchasing {...this.props} keranjangs={keranjangs} />
      </Col>
    );
  }
}
