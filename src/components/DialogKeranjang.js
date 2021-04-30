import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";

const DialogKeranjang = ({
  handleClose,
  tambahPorsi,
  kurangiPorsi,
  onChangeHandler,
  handleSubmit,
  showDialog,
  keranjangDetail,
  jumlah,
  keterangan,
  totalHarga
}) => {
  console.log(keranjangDetail);
  if (keranjangDetail) {
    return (
      <Modal show={showDialog} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {keranjangDetail.product.nama}{" "}
            <strong>
              (Rp. {numberWithCommas(keranjangDetail.product.harga)})
            </strong>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId='exampleForm.ControlInput1'>
              <Form.Label>Total Harga</Form.Label>
              <p>Rp. {numberWithCommas(totalHarga)}</p>
            </Form.Group>

            <Form.Group controlId='exampleForm.ControlInput1'>
              <Form.Label>Jumlah</Form.Label>
              <br />
              <Button
                variant='primary'
                size='sm'
                className='mr-2'
                onClick={() => kurangiPorsi()}
              >
                <FontAwesomeIcon icon={faMinus} />
              </Button>
              <strong>{jumlah}</strong>
              <Button
                variant='primary'
                size='sm'
                className='ml-2'
                onClick={() => tambahPorsi()}
              >
                <FontAwesomeIcon icon={faPlus} />
              </Button>
            </Form.Group>

            <Form.Group controlId='exampleForm.ControlTextarea1'>
              <Form.Label>Keterangan</Form.Label>
              <Form.Control
                as='textarea'
                rows={3}
                name='keterangan'
                placeholder='Contoh : Pedes, Nasi Setenga, dll.'
                value={keterangan}
                onChange={(event) => onChangeHandler(event)}
              />
            </Form.Group>
            <Button variant='primary' type='submit'>
              Simpan
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='danger'>
            <FontAwesomeIcon icon={faTrash} /> Hapus Pesanan
          </Button>
        </Modal.Footer>
      </Modal>
    );
  } else {
    return (
      <Modal show={showDialog} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Kosong</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='primary' onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
};

export default DialogKeranjang;
