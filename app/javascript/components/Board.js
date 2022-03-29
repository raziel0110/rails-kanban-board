import axios from "axios";
import React, {useState, useEffect} from "react";

const Board = () => {
    const [columns, setColumns] = useState([]);

    useEffect(() => {
        axios.get('/api/v1/columns')
        .then(response => {
            if (response.data) {
                setColumns(response.data);
            }
        })
    }, [])

    return (
        <div className="container-fluid main-box">
            <div className="board">
                {columns && columns.map(col => (
                    <div key={col.id}>
                        <h3 className="column-label">{col.label}</h3>
                        <div className="column">
                            <div className="card">
                                <p>title</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Board;