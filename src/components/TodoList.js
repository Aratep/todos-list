import React, {Component} from 'react'


/*
    TodoList component renders 2 lists.
    One of them is the list of todos and other is list of done elements

 */

class TodoList extends Component {
    render() {
        const todos = JSON.parse(this.props.todos)
        const done = JSON.parse(this.props.done)

        return (
            <div className='todo-list'>
                <div className='todos'>
                    <h3>To Do</h3>
                    <ul>
                        {
                            todos && todos.map(todo => <li key={todo.key} onClick={() => this.props.onDone(todo.key)}>
                                {todo.name}
                            </li>)
                        }
                    </ul>
                </div>
                <div className='done'>
                    <h3>Done</h3>
                    <ul>
                        {
                            done && done.map(done => <li key={done.key}>
                                {done.name}
                            </li>)
                        }
                    </ul>
                </div>
            </div>
        )
    }
}

export default TodoList