import React from 'react'

const Table = ({ headings, rows }) => (
    <div className="table-wrapper">
        <div className="static-table-border"></div>
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
    </div>
)

export default Table