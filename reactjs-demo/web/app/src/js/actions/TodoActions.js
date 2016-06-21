import TodoConstants from '../constants/TodoConstants';
import {dispatch, register} from '../dispatcher/AppDispatcher';
import { WakandaClient } from 'wakanda-client';

const client = new WakandaClient();
let ds;
client.getCatalog().then(sources => {
    ds = sources;
});

export default{

    getTodos(){
        ds.Todos.query().then(collection => {
            dispatch({
                actionType: TodoConstants.GET_ITEMS,
                todos: collection.entities
            });
        });
    },

    addTodo(title){
        let newTodo = ds.Todos.create({
            title: title,
            statue: false
        });
        newTodo.save().then(function(){
            dispatch({
                actionType: TodoConstants.NEW_ITEM,
                todo: newTodo
            });
        });
    },

    deleteTodo(ID){
        ds.Todos.find(ID).then( todo => {
            todo.delete().then(() => {
                dispatch({
                    actionType: TodoConstants.DELETE_ITEM,
                    ID: ID
                });
            });
        });
    }

}
