import React from 'react'

export default function Bill(props) {
    const rcpt = props.rcpt;
    return(
        <>
            <img src={rcpt} alt="transaction-receipt" width="600" />
        </>
    )

}