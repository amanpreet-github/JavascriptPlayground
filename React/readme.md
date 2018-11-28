# React Tips
                              
1 - React doesn’t require using JSX, but most people find it helpful as a visual aid when working with UI inside the JavaScript code. It also allows React to show more useful error and warning messages.

2 - Don’t put quotes around curly braces when embedding a JavaScript expression in an attribute. You should either use quotes (for string values) or curly braces (for expressions), but not both in the same attribute.
        
        example - const element = <img src={user.avatarUrl}></img>;

3 - React DOM uses camelCase property naming convention instead of HTML attribute names.
                              
4 - By default, React DOM escapes any values embedded in JSX before rendering them. Thus it ensures that you can never inject anything that’s not explicitly written in your application. Everything is converted to a string before being rendered. This helps prevent XSS (cross-site-scripting) attacks.                              

5- Babel compiles JSX down to React.createElement() calls.
   
## OLD VS BABEL WAY
        
                         **New way.**
                      
                        const element = (
                          <h1 className="greeting">
                            Hello, world!
                          </h1>
                        );
                        
                         **Old way.**
                     
                        const element = React.createElement(
                          'h1',
                          {className: 'greeting'},
                          'Hello, world!'
                        ); 
                        

## Element

- Elements are the smallest building blocks of React apps.
- Elements are what components are “made of”.

## Rendering an Element into the DOM

                         <div id="root"></div>
                         
                  const element = <h1>Hello, world</h1>;
                  ReactDOM.render(element, document.getElementById('root'));


We call this a “root” DOM node because everything inside it will be managed by React DOM.

In practice, most React apps only call ReactDOM.render() once. 
                  
## React Only Updates What’s Necessary

React DOM compares the element and its children to the previous one, and only applies the DOM updates necessary to bring the DOM to the desired state.          

##Componenets 

Components let you split the UI into independent, reusable pieces, and think about each piece in isolation.               
   
Conceptually, components are like JavaScript functions. They accept arbitrary inputs (called “props”) and return React elements describing what should appear on the screen.

The simplest way to define a component is to write a JavaScript function:

                      _FUNCTIONAL COMPONENT_  
                        
                      function Welcome(props) {
                        return <h1>Hello, {props.name}</h1>;
                      }   
   
                      _ES6 CLASS COMPONENT_
                      
                      class Welcome extends React.Component {
                        render() {
                          return <h1>Hello, {this.props.name}</h1>;
                        }
                      }

## Rendering a Component

                       function Welcome(props) {
                         return <h1>Hello, {props.name}</h1>;
                       }
                       
                       const element = <Welcome name="Sara" />;
                       ReactDOM.render(
                         element,
                         document.getElementById('root')
                       );
                       

## Note: Always start component names with a capital letter.
   

We recommend naming props from the component’s own point of view rather than the context in which it is being used.                        
        
A good rule of thumb is that if a part of your UI is used several times (Button, Panel, Avatar), or is complex enough on its own (App, FeedStory, Comment), it is a good candidate to be a reusable component.


## Props are Read-Only

                        
                                function sum(a, b) {
                                  return a + b;
                                }
            
Such functions are called “pure” because they do not attempt to change their inputs, and always return the same result for the same inputs.

                                function withdraw(account, amount) {
                                  account.total -= amount;
                                }            
            
In contrast, this function is impure because it changes its own input.


React is pretty flexible but it has a single strict rule:

All React components must act like pure functions with respect to their props.

## Class Render Method 
                                class Clock extends React.Component {
                                  render() {
                                    return (
                                      <div>
                                        <h1>Hello, world!</h1>
                                        <h2>It is {this.props.date.toLocaleTimeString()}.</h2>
                                      </div>
                                    );
                                  }
                                }
The render method will be called each time an update happens, but as long as we render <Clock /> into the same DOM node, only a single instance of the Clock class will be used. This lets us use additional features such as local state and lifecycle methods.

## Local State to a class 

State Updates

                            // Correct
                            this.setState((state, props) => ({
                              counter: state.counter + props.increment
                            }));
                            
## The Data Flows Down

Neither parent nor child components can know if a certain component is stateful or stateless, and they shouldn’t care whether it is defined as a function or a class.

This is why state is often called local or encapsulated. It is not accessible to any component other than the one that owns and sets it.

This is commonly called a “top-down” or “unidirectional” data flow. Any state is always owned by some specific component, and any data or UI derived from that state can only affect components “below” them in the tree.

If you imagine a component tree as a waterfall of props, each component’s state is like an additional water source that joins it at an arbitrary point but also flows down.

## Events

React events are named using camelCase, rather than lowercase.

With JSX you pass a function as the event handler, rather than a string.

## Problem and Good Practice to bind methods

                            class LoggingButton extends React.Component {
                              handleClick() {
                                console.log('this is:', this);
                              }
                            
                              render() {
                                // This syntax ensures `this` is bound within handleClick
                                return (
                                  <button onClick={(e) => this.handleClick(e)}>
                                    Click me
                                  </button>
                                );
                              }
                            }
                            

The problem with this syntax is that a different callback is created each time the LoggingButton renders. In most cases, this is fine. However, if this callback is passed as a prop to lower components, those components might do an extra re-rendering. We generally recommend binding in the constructor or using the class fields syntax, to avoid this sort of performance problem.


                                constructor(props) {
                                   super(props);
                                   this.state = {isToggleOn: true};
                               
                                   // This binding is necessary to make `this` work in the callback
                                   this.handleClick = this.handleClick.bind(this);
                                 }
                                  
                                 # Binding in the constructor
                                 

## Passing Arguments to Event Handlers


                                <button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
                                <button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
                                
The above two lines are equivalent, and use arrow functions and Function.prototype.bind respectively.

In both cases, the e argument representing the React event will be passed as a second argument after the ID. With an arrow function, we have to pass it explicitly, but with bind any further arguments are automatically forwarded.                                

#Keys

Keys help React identify which items have changed, are added, or are removed. Keys should be given to the elements inside the array to give the elements a stable identity:

                                const numbers = [1, 2, 3, 4, 5];
                                const listItems = numbers.map((number) =>
                                  <li key={number.toString()}>
                                    {number}
                                  </li>
                                );

A good rule of thumb is that elements inside the map() call need keys.


Keys serve as a hint to React but they don’t get passed to your components. If you need the same value in your component, pass it explicitly as a prop with a different name:

                                const content = posts.map((post) =>
                                  <Post
                                    key={post.id}
                                    id={post.id}
                                    title={post.title} />
                                );
                                
With the example above, the Post component can read props.id, but not props.key.


## Controlled Components


`In HTML, form elements such as <input>, <textarea>, and <select> typically maintain their own state and update it based on user input. In React, mutable state is typically kept in the state property of components, and only updated with setState().`


We can combine the two by making the React state be the “single source of truth”. Then the React component that renders a form also controls what happens in that form on subsequent user input. An input form element whose value is controlled by React in this way is called a “controlled component”.

                    class NameForm extends React.Component {
                      constructor(props) {
                        super(props);
                        this.state = {value: ''};
                    
                        this.handleChange = this.handleChange.bind(this);
                        this.handleSubmit = this.handleSubmit.bind(this);
                      }
                    
                      handleChange(event) {
                        this.setState({value: event.target.value});
                      }
                    
                      handleSubmit(event) {
                        alert('A name was submitted: ' + this.state.value);
                        event.preventDefault();
                      }
                    
                      render() {
                        return (
                          <form onSubmit={this.handleSubmit}>
                            <label>
                              Name:
                              <input type="text" value={this.state.value} onChange={this.handleChange} />
                            </label>
                            <input type="submit" value="Submit" />
                          </form>
                        );
                      }
                    }
  
  
  With a controlled component, every state mutation will have an associated handler function. This makes it straightforward to modify or validate user input. For example, if we wanted to enforce that names are written with all uppercase letters, we could write handleChange as:
                    
                    handleChange(event) {
                      this.setState({value: event.target.value.toUpperCase()});
                    }                                          

Use Multiple Select.

`<select multiple={true} value={['B', 'C']}>`    

## Lessons Learned

There should be a single “source of truth” for any data that changes in a React application. 

`Usually, the state is first added to the component that needs it for rendering. Then, if other components also need it, you can lift it up to their closest common ancestor. Instead of trying to sync the state between different components, you should rely on the top-down data flow.`

## Composition vs Inheritance
  
`Containment`
   
                                function FancyBorder(props) {
                                  return (
                                    <div className={'FancyBorder FancyBorder-' + props.color}>
                                      {props.children}
                                    </div>
                                  );
                                }

This lets other components pass arbitrary children to them by nesting the JSX:


                                function WelcomeDialog() {
                                  return (
                                    <FancyBorder color="blue">
                                      <h1 className="Dialog-title">
                                        Welcome
                                      </h1>
                                      <p className="Dialog-message">
                                        Thank you for visiting our spacecraft!
                                      </p>
                                    </FancyBorder>
                                  );
                                }
                                


Props and composition give you all the flexibility you need to customize a component’s look and behavior in an explicit and safe way. Remember that components may accept arbitrary props, including primitive values, React elements, or functions.

## One Way Data flow

It’s easy to see how your UI is updated and where to make changes since there’s nothing complicated going on. React’s one-way data flow (also called one-way binding) keeps everything modular and fast.



To make your UI interactive, you need to be able to trigger changes to your underlying data model. React makes this easy with state.
       
# Identify The Minimal (but complete) Representation Of UI State

To build your app correctly, you first need to think of the minimal set of mutable state that your app needs. The key here is DRY: Don’t Repeat Yourself.   

Let’s go through each one and figure out which one is state. Simply ask three questions about each piece of data:

Is it passed in from a parent via props? If so, it probably isn’t state.

Does it remain unchanged over time? If so, it probably isn’t state.

Can you compute it based on any other state or props in your component? If so, it isn’t state.                 


`Remember: React is all about one-way data flow down the component hierarchy. It may not be immediately clear which component should own what state. This is often the most challenging part for newcomers to understand, so follow these steps to figure it out:`

For each piece of state in your application:

Identify every component that renders something based on that state.

Find a common owner component (a single component above all the components that need the state in the hierarchy).

Either the common owner or another component higher up in the hierarchy should own the state.

If you can’t find a component where it makes sense to own the state, create a new component simply for holding the state and add it somewhere in the hierarchy above the common owner component.
