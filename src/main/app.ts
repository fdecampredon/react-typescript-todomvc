'use strict';

import React = require('react');
import Todo = require('./todo');
import Utils = require('./utils');
import routes = require('./routes');
import TodoModel = require('./todoModel');
import TodoFooter = require('./footer');
import TodoItem = require('./todoItem');





//todo
declare var require: any;
var Router: any = require('director').Router;

var ENTER_KEY = 13;

class TodoApp extends React.Component<TodoApp.Props, TodoApp.State> {
    newField: HTMLInputElement;
    
    newFieldCallback = (newField: React.Component<any, any>) => {
        this.newField = newField ? <HTMLInputElement>newField.getDOMNode() : null;
    }
    

    state : TodoApp.State = {
        nowShowing: routes.ALL_TODOS,
        editing: null
    };
    
    componentDidMount() {
        var setState = this.setState;
        var router = Router({
            '/': () =>  this.setState({nowShowing: routes.ALL_TODOS}),
            '/active': () =>  this.setState({nowShowing: routes.ACTIVE_TODOS}),
            '/completed': () =>  this.setState({nowShowing: routes.COMPLETED_TODOS})
        });
        router.init('/');
    }

    handleNewTodoKeyDown = (event: React.KeyboardEvent) => {
        if (event.which !== ENTER_KEY) {
            return;
        }

        var val = this.newField.value.trim();

        if (val) {
            this.props.model.addTodo(val);
            this.newField.value = '';
        }

        return false;
    }

    toggleAll = (event: React.MouseEvent) => {
        var checked: boolean = (<HTMLInputElement> event.target).checked;
        this.props.model.toggleAll(checked);
    }

    toggle(todoToToggle: Todo) {
        this.props.model.toggle(todoToToggle);
    }

    destroy(todo: Todo) {
        this.props.model.destroy(todo);
    }

    edit(todo: Todo, callback: () => void) {
        // refer to todoItem.js `handleEdit` for the reasoning behind the
        // callback
        this.setState({editing: todo.id}, function () {
            callback();
        });
    }

    save(todoToSave: Todo, text: string) {
        this.props.model.save(todoToSave, text);
        this.setState({editing: null});
    }

    cancel() {
        this.setState({editing: null});
    }

    clearCompleted() {
        this.props.model.clearCompleted();
    }

    render() {
        var footer: React.ReactElement;
        var main: React.ReactElement;
        var todos = this.props.model.todos;

        var shownTodos = todos.filter( todo => {
            switch (this.state.nowShowing) {
                case routes.ACTIVE_TODOS:
                    return !todo.completed;
                case routes.COMPLETED_TODOS:
                    return todo.completed;
                default:
                    return true;
            }
        });

        var todoItems = shownTodos.map(todo => 
            <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={() => this.toggle(todo)}
                onDestroy={() => this.destroy(todo)}
                onEdit={callback => this.edit(todo, callback)}
                editing={this.state.editing === todo.id}
                onSave={text => this.save(todo, text)}
                onCancel={() => this.cancel()}
            /> 
        );

        var activeTodoCount = todos.reduce(function (accum, todo) {
            return todo.completed ? accum : accum + 1;
        }, 0);

        var completedCount = todos.length - activeTodoCount;

        if (activeTodoCount || completedCount) {
            footer =
                <TodoFooter
                    count={activeTodoCount}
                    completedCount={completedCount}
                    nowShowing={this.state.nowShowing}
                    onClearCompleted={() => this.clearCompleted()}
                />;
        }

        if (todos.length) {
            main = (
                <section id="main">
                    <input
                        id="toggle-all"
                        type="checkbox"
                        onChange={this.toggleAll}
                        checked={activeTodoCount === 0}
                    />
                    <ul id="todo-list">
                        {todoItems}
                    </ul>
                </section>
            );
        }

        return (
            <div>
                <header id="header">
                    <h1>todos</h1>
                    <input
                        ref={this.newFieldCallback}
                        id="new-todo"
                        placeholder="What needs to be done?"
                        onKeyDown={this.handleNewTodoKeyDown}
                        autoFocus={true}
                    />
                </header>
                {main}
                {footer}
            </div>
        );
    }
}

module TodoApp {
    export interface Props {
        model: TodoModel
    }
    
    export interface State {
        editing?: string;
        nowShowing?: string;
    }
}

var model = new TodoModel('react-todos');

function render() {
    React.render(
        <TodoApp model={model} />,
        document.getElementById('todoapp')
    );
}

model.subscribe(render);
render();