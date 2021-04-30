import React, { Component } from "react";
import { Badge, Col, ListGroup, Row } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";

export default class Hasil extends Component {
  render() {
    const { keranjangs } = this.props;

    return (
      <Col md={3} mt="2">
        <h4>
          <strong>Hasil</strong>
        </h4>
        <hr />
        {keranjangs !== 0 && (
          <ListGroup variant="flush">
            {keranjangs.map((item) => (
              <ListGroup.Item>
                <Row>
                  <Col xs={2}>
                    <h4>
                      <Badge pill variant="success">
                        {item.jumlah}
                      </Badge>
                    </h4>
                  </Col>
                  <Col>
                    <h5>{item.product.nama}</h5>
                    <p>Rp. {numberWithCommas(item.product.harga)}</p>
                  </Col>
                  <Col>
                    <strong className="float-flight">
                      Rp. {numberWithCommas(item.total_harga)}
                    </strong>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
    );
  }
}
