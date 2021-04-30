import React, { Component } from "react";
import { Badge, Col, ListGroup, Row } from "react-bootstrap";
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
    };
  }

  handleShow = (item) => {
    this.setState({
      showDialog: true,
      keranjangDetail: item,
    });
  };

  handleClose = () => {
    this.setState({
      showDialog: false,
    });
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
            {keranjangs.map((item) => (
              <ListGroup.Item
                key={item.id}
                onClick={() => this.handleShow(item)}
              >
                <Row>
                  <Col xs={2}>
                    <h4>
                      <Badge pill variant='success'>
                        {item.jumlah}
                      </Badge>
                    </h4>
                  </Col>
                  <Col>
                    <h5>{item.product.nama}</h5>
                    <p>Rp. {numberWithCommas(item.product.harga)}</p>
                  </Col>
                  <Col>
                    <strong className='float-flight'>
                      Rp. {numberWithCommas(item.total_harga)}
                    </strong>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}

            <DialogKeranjang
              handleClose={this.handleClose}
              showDialog={this.state.showDialog}
            />
          </ListGroup>
        )}

        <Purchasing keranjangs={keranjangs} {...this.props} />
      </Col>
    );
  }
}
