import React from 'react'

const Table = ({ headings, rows }) => (
    <table>
        <thead>
            <tr>
                {headings.map(heading => <th>{heading}</th>)}
            </tr>
        </thead>
        <tbody>
            {rows.map(row => {
                let i = 0
                return (
                    <tr>
                        {row.map(cell => (
                            <td>
                                <div className="responsive-cell-heading">{headings[i++]}</div>
                                <div className="cell-content">
                                    {cell}
                                </div>
                            </td>
                        ))}
                    </tr>
                )
            })}
        </tbody>
    </table>
)

export default Table