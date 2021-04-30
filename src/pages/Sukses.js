import { Button } from 'react-bootstrap'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Sukses extends Component {
    render() {
        return (
            <div className="mt-4 text-center">
                <h2>Sukses Pesan</h2>
                <p>Terimakasih Sudah Memesan!</p>
                <Button variant="primary" as={Link} to='/'>
                    Kembali
                </Button>
            </div>
        )
    }
}
