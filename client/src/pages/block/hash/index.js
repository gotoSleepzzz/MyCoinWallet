import { getBlockService } from 'api/block';
import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap';
import { useParams } from 'react-router-dom'

export default function BlockWithHash() {
    const { hash } = useParams();
    const [block, setBlock] = useState(null);
    useEffect(() => {
        getBlockService(hash).then((res) => {
            setBlock(res.block);
            console.log(res.block);
        }).catch(err => console.log(err));
    }, []);
    return (
        <Table bordered striped hover className='mt-3 mx-3'>
            <tbody>
                <tr>
                    <th style={{ width: "10%" }}>Index</th>
                    <td>{block?.index}</td>
                </tr>
                <tr>
                    <th style={{ width: "10%" }}>Nonce</th>
                    <td>{block?.nonce}</td>
                </tr>
                <tr>
                    <th style={{ width: "10%" }}>Difficulty</th>
                    <td>{block?.difficulty}</td>
                </tr>
                <tr>
                    <th style={{ width: "10%" }}>Previous hash</th>
                    <td>{block?.previousHash}</td>
                </tr>
                <tr>
                    <th style={{ width: "10%" }}>Hash</th>
                    <td>{block?.hash}</td>
                </tr>
                <tr>
                    <th style={{ width: "10%" }}>Timestamp</th>
                    <td>{block?.timestamp}</td>
                </tr>
                <tr>
                    <th colSpan={2}>Data</th>
                </tr>
            </tbody>
        </Table>
        // <div style={{ maxWidth: 'calc(100vw-300px)', wordBreak: 'break-all' }}>BlockWithHash {hash}</div>
    )
}
