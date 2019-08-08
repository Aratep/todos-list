import React, {Component} from 'react'

import TodoList from './TodoList'

class AddTodoForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [],
            done: [],
            currentTodo: {
                name: '',
                key: '',
            },
        }
    }

    componentDidMount() {
        // get initial values for todo and done lists from localstorage
        // and set as state values
        const todos = JSON.parse(localStorage.getItem('todos'));
        const done = JSON.parse(localStorage.getItem('done'));

        if(todos !== null)
            this.setState({todos});
        if(done !== null)
            this.setState({done})
    }

    // handle input change
    handleChange = (e) => {
        e.preventDefault();

        const todoName = e.target.value;
        const currentTodo = {name: todoName, key: Date.now()};
        this.setState({currentTodo})
    }

    // add todo on form submit
    addTodo = e => {
        e.preventDefault();

        const newTodo = this.state.currentTodo;
        if (newTodo.name !== '') {
            const todos = [...this.state.todos, newTodo];
            this.setState({
                todos,
                currentTodo: {name: '', key: ''},
            });
            localStorage.setItem('todos', JSON.stringify(todos)) // push todo into todos list in localstorage
        }
    }

    // moves todo from todos list to done list on todo click
    // and updates todos and done lists in localstorage
    handleDone = key => {
        const newDoneItem = this.state.todos.filter(todo => todo.key === key);
        const todos = this.state.todos.filter(todo => todo.key !== key);
        const done = [...this.state.done, ...newDoneItem];

        this.setState({done, todos})

        localStorage.setItem('done', JSON.stringify(done)); // update done list in localstorage
        localStorage.setItem('todos', JSON.stringify(todos)) // update todos list in localstorage
    }

    render() {
        const todos = localStorage.getItem('todos');
        const done = localStorage.getItem('done');

        return (
            <div className='todo-items'>
                <form onSubmit={this.addTodo}>
                    <input type='text' name='name' value={this.state.currentTodo.name} onChange={this.handleChange}/>
                    <input type='submit' value='Add'/>
                </form>
                <TodoList todos={todos} done={done} onDone={this.handleDone}/>
            </div>
        )
    }
}

export default AddTodoForm