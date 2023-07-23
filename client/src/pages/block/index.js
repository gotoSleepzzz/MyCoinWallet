import { getBlocksService } from "api/block";
import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Blocks() {
    const navigate = useNavigate();
    const [blocks, setBlocks] = useState([]);
    useEffect(() => {
        getBlocksService().then((res) => {
            setBlocks([...res.blocks]);
        }).catch(err => console.log(err));
    }, []);

    return (
        <Container fluid className='d-flex pt-5 justify-content-around'>
            <Table striped bordered hover style={{ maxWidth: "calc(100vw-300)" }}>
                <thead>
                    <tr>
                        <th style={{ width: "9%" }}>Block#</th>
                        <th style={{ width: "13%" }}>Create at</th>
                        <th style={{ width: "18%" }}>Transaction length</th>
                        <th style={{ width: "15%" }}>Nonce</th>
                        <th style={{ width: "45%" }}>Hash</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        blocks?.map((block, index) => {
                            return (
                                <tr key={block.hash} role="button" onClick={() => navigate(`/block/${block.hash}`)}>
                                    <td>{block.index}</td>
                                    <td>{block.timestamp}</td>
                                    <td>{block.data.length}</td>
                                    <td>{block.nonce}</td>
                                    <td>{block.hash}</td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </Table>
        </Container>
    );
}

export default Blocks;