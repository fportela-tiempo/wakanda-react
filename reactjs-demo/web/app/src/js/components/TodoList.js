import React from 'react';
import TodoStore from '../stores/TodoStore';
import TodoActions from '../actions/TodoActions';
import TodoItem from './TodoItem';

class TodoList extends React.Component{
    constructor(){
        super();
        this.state = {
            todos: [],
            newTodoTitle: ''
        }
        this._onTodosChange = this._onTodosChange.bind(this);
        TodoStore.addChangeListener(this._onTodosChange);
    }

    componentDidMount(){
        TodoActions.setCollection(() => {
            this.setState({
                todos: TodoStore.getList()
            });
        });
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

    _getNextPage(){
        TodoActions.getNextPage();
        console.log('getting next page');
    }

    _getPrevPage(){
        TodoActions.getPrevPage();
        console.log('getting prev page');
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
                <div>
                    <input type="button" value="Prev" onClick={this._getPrevPage.bind(this)} />
                    <input type="button" value="Next" onClick={this._getNextPage.bind(this)}/>
                </div>
            </div>
        );
    }
}

export default TodoList;
