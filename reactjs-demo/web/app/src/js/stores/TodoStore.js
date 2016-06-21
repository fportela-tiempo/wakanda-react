import { register} from '../dispatcher/AppDispatcher';
import TodoConstants from '../constants/TodoConstants';
import { EventEmitter } from 'events';
import _ from 'lodash';

const CHANGE_EVENT = 'list_updated';

const _updateTodo = (item, list ) => {
    list.map((todo) => {
        if(todo.ID == item.ID){
            todo.status = item.status;
        }
        return todo;
    });
}

const _deleteItem = (ID, list) =>{
    _.remove(list, (item) =>{
        return item.ID == ID;
    });
}

class TodoStore extends EventEmitter{
    constructor(){
        super();
        this._list = [];
        this._collection;
        this._ds;
    }

    addChangeListener(callback){
        this.on(CHANGE_EVENT, callback);
    }

    removeChangeListener(callback){
        this.removeChangeListener(CHANGE_EVENT, callback);
    }

    getList(){
        return this._list;
    }

    handleActions(action){
        let emitChange = () => {
            console.info('Emit change event from Store...');
            this.emit(CHANGE_EVENT);
        }
        switch(action.actionType){
            case TodoConstants.NEW_ITEM:
                this._list.push(action.todo);
                emitChange();
                break;
            case TodoConstants.TOGGLE_ITEM:
                _updateTodo(action.todo, this._list);
                emitChange();
                break;
            case TodoConstants.DELETE_ITEM:
                _deleteItem(action.ID, this._list);
                emitChange();
                break;
            case 'SET_COLLECTION':
                this._collection = action.collection;
                this._list = action.collection.entities;
                break;
            case 'SET_DATA_SOURCE':
                this._ds = action.ds;
                break;
            case 'GET_NEXT_PAGE':
                this._collection.nextPage();
                this._list = this._collection.entities;
                emitChange();
                break;
            case 'GET_PREV_PAGE':
                this._collection.prevPage();
                this._list = this._collection.entities;
                emitChange();
                break;
        }
    }
}

const todoStore = new TodoStore;
register(todoStore.handleActions.bind(todoStore));

export default todoStore;
