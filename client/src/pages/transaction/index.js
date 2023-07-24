import { Container, Table } from "react-bootstrap";
import './style.css';
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getTransactionsService } from "api/transaction";

function Transactions() {
    const navigate = useNavigate();
    const [transactions, setTransactions] = useState([]); // [
    useEffect(() => {
        getTransactionsService().then((res) => {
            console.log(res);
            setTransactions(res.transactions.reverse());
        }).catch(err => console.log(err));
    }, []);
    return (
        <Container fluid className='d-flex pt-5 justify-content-around' style={{ overflowX: 'auto', overflowY: 'scroll' }}>
            <Table striped bordered hover style={{ maxWidth: "calc(100vw-300)" }}>
                <thead>
                    <tr>
                        <th style={{ width: "25%" }}>Txn Hash</th>
                        <th style={{ width: "13%" }}>Create at</th>
                        <th style={{ width: "25%" }}>From</th>
                        <th style={{ width: "25%" }}>To</th>
                        <th style={{ width: "12%" }}>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        transactions.map((transaction, index) => {
                            return (
                                <tr role="button" onClick={() => navigate(`/transaction/${transaction.hash}`)}>
                                    <td>{transaction.hash}</td>
                                    <td>{transaction.timestamp}</td>
                                    <td>{transaction.from}</td>
                                    <td>{transaction.to}</td>
                                    <td>{transaction.amount}</td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </Table>
        </Container>
    );
}

export default Transactions;