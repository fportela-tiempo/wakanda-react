import React from 'react';
import TodoStore from '../stores/TodoStore';
import TodoActions from '../actions/TodoActions';
import TodoItem from './TodoItem';

class TodoList extends React.Component{
    constructor(){
        super();
        this.state = {
            todos: TodoStore.getList(),
            newTodoTitle: ''
        }
        this._onTodosChange = this._onTodosChange.bind(this);
        TodoStore.addChangeListener(this._onTodosChange);
    }

    componentDidMount(){
        if(!this.state.todos.length){
            TodoActions.getTodos();
        }
    }

    _onTodosChange(){
        this.setState({
            todos: TodoStore.getList()
        });
    }

    _addNewTodo(e){
        e.preventDefault();
        let text = this.state.newTodoTitle.trim();
        if(!text){
            return;
        }
        TodoActions.addTodo(this.state.newTodoTitle);
        this.setState({
            newTodoTitle: ''
        });
    }

    _updateNewTodoTitle(e){
        this.setState({
            newTodoTitle: e.target.value
        })
    }

    _deleteTodo(ID){
        TodoActions.deleteTodo(ID);
    }

    render(){
        var todos = this.state.todos.map( todo => {
            return (
                <TodoItem todo={todo} key={ todo._key } deleteTodo={ this._deleteTodo.bind(this) } />
            );
        });

        return(
            <div>
                { todos }
                <form onSubmit={this._addNewTodo.bind(this)}>
                    <input value={this.state.newTodoTitle} onChange={this._updateNewTodoTitle.bind(this)} />
                    <br />
                    <input type="submit" value='Add' />
                </form>
            </div>
        );
    }
}

export default TodoList;
