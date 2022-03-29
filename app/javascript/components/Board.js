import axios from "axios";
import React, {useState, useEffect} from "react";

const Board = () => {
    const [columns, setColumns] = useState([]);
    const [cards, setCards] = useState([]);
    const [dragged, setDragged] = useState({});
    const [colId, setColId] = useState(0);

    useEffect(() => {
        axios.get('/api/v1/columns')
        .then(response => {
            if (response.data) {
                setColumns(response.data);
            }
        })
    }, [])

    useEffect(() => {
        axios.get('/api/v1/cards')
        .then(response => {
            setCards(response.data.cards)
        })
    }, []);

    const updateCard = (id, card) => {
        axios.patch('/api/v1/cards/' + id, card)
        .then(response => {
            console.log(response);
        })
        .catch(err => {
            console.log(err)
        })
    }

    const onDrag = (e, pos) => {
        setDragged(Object.assign({}, pos));
    }

    const onDragOver = (e, col) => {
        e.preventDefault();
        
        setColId(col.id)
    }

    const onDrop = (e) => {
        console.log(e);
        const card = {
            title: dragged.title,
            column_id: colId
        }
        updateCard(dragged.id, card);
    }

    return (
        <div className="container-fluid main-box">
            <div className="board">
                {columns && columns.map(col => (
                    <div key={col.id}>
                        <h3 className="column-label">{col.label}</h3>
                        <div className="column" onDragOver={(e) => onDragOver(e, col)} onDrop={(e) => onDrop(e, col)}>
                            {cards && cards
                                    .filter(card => card.column_id === col.id)
                                    .map(card => (
                                <div 
                                className="card" 
                                draggable="true" 
                                onDragStart={(e) => onDrag(e, card)}
                                key={card.id}>
                                <div className="card__body">
                                    <h5>{card.title}</h5>
                                </div>
                            </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Board;