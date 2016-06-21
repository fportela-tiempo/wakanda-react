import React from 'react';

class TodoItem extends React.Component{

    constructor(){
        super();
    }

    _deleteTodo(){
        this.props.deleteTodo(this.props.todo.ID);
    }

    render(){
        return(
            <div>
                { this.props.todo.title } <input type='button' value='Delete' onClick={ this._deleteTodo.bind(this) }/>
            </div>
        );
    }
}

export default TodoItem;
