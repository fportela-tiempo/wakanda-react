import React from 'react';
import ReactDOM from 'react-dom';
import TodoList from './components/TodoList';

import { WakandaClient } from 'wakanda-client';

let client = new WakandaClient();
let ds;
client.getCatalog(['Todos']).then(ds => {
    ds = ds;
    ReactDOM.render(<TodoList />, document.getElementById('app'));

});
