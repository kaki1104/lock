import Immutable from 'immutable';
import ImmutableStore from './immutable_store';
import Dispatcher from './dispatcher';
import lockReducer from '../lock/reducer';
import clientReducer from '../client/reducer';

function reducer(s, e) {
  return s.update("clients", clients => clientReducer(clients, e))
    .update("locks", locks => lockReducer(locks, e));
}

const initialState = Immutable.fromJS({locks: {}, clients: {}});
const store = new ImmutableStore(reducer, initialState);
const dispatcher = new Dispatcher(store);

function getLocks() {
  return store.getState().get("locks").toList();
}

export default {
  dispatch: dispatcher.dispatch.bind(dispatcher),
  store: store,
  getLocks: getLocks
}