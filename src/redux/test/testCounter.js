import { createStore, combineReducers } from 'redux';

import counter from '../reducers/counter';
import { increment, decrement, reset } from '../actions/counter';

const store = createStore(combineReducers({ counter }));

console.log(store.getState());

const unsubscribe = store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(increment());
store.dispatch(decrement());
store.dispatch(reset());

unsubscribe();
