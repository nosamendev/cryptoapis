import React from 'react';
import TableRow from './TableRow';

const TableRows = (props) => {
    const { profiles } = props;

    if (profiles.length === 0) {
        return (
            <tbody>
                <tr>
                    <td colSpan={3}>No profiles</td>
                </tr>
            </tbody>            
        )
    }

    const profilesArr = profiles.map((_, i) => 
        <TableRow profile={profiles[i]} key={i}></TableRow>
    );

    const profilesArrReversed = profilesArr.reverse();

    return (
        <tbody>
            {profilesArrReversed}
        </tbody>
    );
}

export default TableRows;