# Redux-rx-creator
A library that can help you create the redux actions & reducers easily. Inspired by [NgRx](https://ngrx.io/).

## Install
The library needs redux & rxjs.
```
    npm install redux rxjs redux-rx-creator
```

## Reducer-creator
You can now create a reducer like this.
```
interface PingPongState {
	pingCount: number;
	pongCount: number;
}

const initPingPongState: PingPongState  = {
	pingCount: 0,
	pongCount: 0
}

const pingPongReducer = createReducer(
	initState, 
	on(ping, state => ({...state, pingCount: state.pingCount + 1})),
	on(pong, state => ({...state, pongCount: state.pongCount + 1}))
);
```

You can use `combineReducers` directly to combine reducer created by `createReducer`.
```

export interface AppState {
    pingPongState: PingPongState;
}

const reducer = combineReducers<AppState>({
    pingPongState: pingPongReducer
});
```

## Action-creator
You can create an action by using `createAction`.
```
const ping = createAction('PING');
```

If your action needs to pass some parameters, this will help you.
```
const pong = createAction('PONG', props<{payload: string}>());
``` 

## ofActionType

I support you use [redux-observable](https://redux-observable.js.org) with this library.
If you used or are using it, `ofActionType` operator will help you get the right action type in the rx stream.
```
const pingEpic = ($action: Observble<Action>) => $action.pipe(
    ofActionType(ping),
    map(() => pong({payload: 'received'}))
);
```


