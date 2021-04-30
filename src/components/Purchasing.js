import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { Component } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { API_URL } from "../utils/constants";
import { numberWithCommas } from "../utils/utils";

export default class Purchasing extends Component {
  submitPurchasing = (totalBayar) => {
    const pesanan = {
      total_bayar: totalBayar,
      menus: this.props.keranjangs,
    };

    axios.post(API_URL + "pesanans", pesanan).then((res) => {
      this.props.history.push("/sukses");
    });
  };

  render() {
    const totalBayar = this.props.keranjangs.reduce(function (result, item) {
      return result + item.total_harga;
    }, 0);
    return (
      <div className='fixed-bottom'>
        <Row>
          <Col className='px-4' md={{ span: 3, offset: 9 }}>
            <h4>
              Total Bayar:{" "}
              <strong className='float-right'>
                Rp. {numberWithCommas(totalBayar)}
              </strong>
            </h4>
            <Button
              variant='primary'
              block
              className='mb-2 mt-4 mr-2'
              size='lg'
              onClick={() => this.submitPurchasing(totalBayar)}
            >
              <FontAwesomeIcon icon={faShoppingCart} />
              <strong>Bayar</strong>
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}
