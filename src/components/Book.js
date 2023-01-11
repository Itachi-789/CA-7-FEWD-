import React from 'react'

const Book = (props) => {
    return (
        <div className='mainContainer'>
            <div className='bookContainer' title={props.title}>
                <img 
                    src={props.source}
                    alt="BooksImage"
                />
                <div className='bookFooter'>
                    <h1>{props.label}</h1>
                    <h1>{`Author: ${props.Author}`}</h1>
                </div>
            </div>
        </div>
    )
}

export default Book