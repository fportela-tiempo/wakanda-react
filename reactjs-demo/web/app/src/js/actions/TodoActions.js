import TodoConstants from '../constants/TodoConstants';
import {dispatch, register} from '../dispatcher/AppDispatcher';
import { WakandaClient } from 'wakanda-client';

const client = new WakandaClient();

export default{
    
    setCollection(callback){
        client.getCatalog( [ 'Todos' ] ).then( ds => {
            ds.Todos.query({
                pageSize: 10
            }).then(collection => {
                dispatch({
                    actionType: 'SET_COLLECTION',
                    collection: collection
                });
                callback();
            });
            dispatch({
                actionType: 'SET_DATA_SOURCE',
                ds: ds
            });      
        });
    },

    addTodo(title){
        client.getCatalog(['Todos']).then(ds => {
            let newTodo = ds.Todos.create({
                title: title,
                status: false,
                created_at: new Date()
            });
            newTodo.save().then(function(){
                dispatch({
                    actionType: TodoConstants.NEW_ITEM,
                    todo: newTodo
                });
            });
        });

    },

    deleteTodo(ID){
        client.getCatalog(['Todos']).then(ds => {
            ds.Todos.find(ID).then( todo => {
                todo.delete().then(() => {
                    dispatch({
                        actionType: TodoConstants.DELETE_ITEM,
                        ID: ID
                    });
                });
            });
        });
    },

    getNextPage(){
        dispatch({
            actionType: 'GET_NEXT_PAGE'
        })
    },
    
    getPrevPage(){
        dispatch({
            actionType: 'GET_PREV_PAGE'
        })
    }

}
