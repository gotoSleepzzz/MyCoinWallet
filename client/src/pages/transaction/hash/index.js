import React from 'react'
import { useParams } from 'react-router-dom'

export default function TransactionWithHash() {
    const { hash } = useParams();
    return (
        <div style={{ maxWidth: 'calc(100vw-300px)', overflowX: 'auto' }}>
            <p style={{ overflow: 'hidden', maxWidth: '800px', wordBreak: 'break-all', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }} >TransactionWithHash {hash}</p>
        </div>
    )
}
