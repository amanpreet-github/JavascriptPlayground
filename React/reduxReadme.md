
## React Redux

React-Redux provides <Provider />, which makes the Redux store available to the rest of your app:


## Redux 3 principles 

1 - Single source of truth

        The state of your whole application is stored in an object tree within a single store.
        

2 - State is read-only

       The only way to change the state is to emit an action, an object describing what happened.
       

3 - Changes are made with pure functions

       To specify how the state tree is transformed by actions, you write pure reducers.
       

# Redux Saga

redux-saga is a library that aims to make application side effects (i.e. asynchronous things like data fetching and impure things like accessing the browser cache) easier to manage, more efficient to execute, easy to test, and better at handling failures.


The mental model is that a saga is like a separate thread in your application that's solely responsible for side effects. redux-saga is a redux middleware, which means this thread can be started, paused and cancelled from the main application with normal redux actions, it has access to the full redux application state and it can dispatch redux actions as well.


It uses an ES6 feature called Generators to make those asynchronous flows easy to read, write and test. (if you're not familiar with them here are some introductory links) By doing so, these asynchronous flows look like your standard synchronous JavaScript code. (kind of like async/await, but generators have a few more awesome features we need)