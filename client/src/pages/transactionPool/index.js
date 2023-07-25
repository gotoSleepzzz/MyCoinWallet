import { Container, Table } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTransactionPoolService } from "api/transaction";
import moment from 'moment';

function TransactionPool() {
    const navigate = useNavigate();
    const [pool, setPool] = useState([]); // [
    useEffect(() => {
        getTransactionPoolService().then((res) => {
            console.log(res);
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
                        pool.map((transaction, index) => {
                            return (
                                <tr role="button" onClick={() => navigate(`/transaction/${transaction.id}`)}>
                                    <td>{transaction.id}</td>
                                    <td>{moment.unix(transaction.txIns[transaction.txIns.length - 1].timestamp).fromNow()}</td>
                                    <td>{transaction.txIns[transaction.txIns.length - 1].from}</td>
                                    <td>{transaction.txIns[transaction.txIns.length - 1].to}</td>
                                    <td>{transaction.txIns[transaction.txIns.length - 1].amount}</td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </Table>
        </Container>
    );
}

export default TransactionPool;