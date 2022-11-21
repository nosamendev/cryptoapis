import React from 'react';

const TableRow = (props) => {
    const { fname, lname, email } = props.profile;

    return (
        <tr>
            <td>{new Date().toLocaleDateString()}</td>
            <td>{fname} {lname}</td>
            <td>{email}</td>
        </tr>
    );
}

export default TableRow;