'use strict';


import React = require('react');
import Todo = require('./todo');


var ESCAPE_KEY = 27;
var ENTER_KEY = 13;



interface Props extends React.BaseProps {
    onSave: (val: string) => void;
    onDestroy: () => void;
    onEdit: (callback: () => void)  => void;
    onCancel: () => void;
    todo: Todo;
    onToggle: () => void;
    editing: boolean;
}

interface State {
    editText: string
}

class TodoItem extends React.Component<Props, State> {
    
    editField: HTMLInputElement;
    
    state: State = { editText: this.props.todo.title}
    
    handleSubmit = () => {
        var val = this.state.editText.trim();
        if (val) {
            this.props.onSave(val);
            this.setState({editText: val});
        } else {
            this.props.onDestroy();
        }
        return false;
    }
    
    editFieldCallback = (editField: React.Component<any, any>) => {
        this.editField = editField? <HTMLInputElement>editField.getDOMNode() : null;
    }
    
    handleEdit = () => {
        // react optimizes renders by batching them. This means you can't call
        // parent's `onEdit` (which in this case triggeres a re-render), and
        // immediately manipulate the DOM as if the rendering's over. Put it as a
        // callback. Refer to app.js' `edit` method
        this.props.onEdit(() => {
            this.editField.focus();
            this.editField.setSelectionRange(this.editField.value.length, this.editField.value.length);
        });
        this.setState({editText: this.props.todo.title});
    }
    
    handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.which === ESCAPE_KEY) {
            this.setState({editText: this.props.todo.title});
            this.props.onCancel();
        } else if (event.which === ENTER_KEY) {
            this.handleSubmit();
        }
    }
    
    
    handleChange = (event: React.SyntheticEvent) => {
        this.setState({editText: this.editField.value});
    }

    
    /**
     * This is a completely optional performance enhancement that you can implement
     * on any React component. If you were to delete this method the app would still
     * work correctly (and still be very performant!), we just use it as an example
     * of how little code it takes to get an order of magnitude performance improvement.
     */
    shouldComponentUpdate(nextProps: Props, nextState: State) {
        return (
            nextProps.todo !== this.props.todo ||
            nextProps.editing !== this.props.editing ||
            nextState.editText !== this.state.editText
        );
    }
    
    
    render() {
        
        var className = this.props.editing ? 'editing' : ' ' + this.props.todo.completed ? 'complete' : '';
        return (
            <li className={className}>
                <div className="view" >
                    <input 
                        className="toggle"
                        type="checkbox" 
                        checked={this.props.todo.completed} 
                        onChange={this.props.onToggle} />
                    <label onDoubleClick={this.handleEdit}>{this.props.todo.title} </label>
                    <button className="destroy" onClick={this.props.onDestroy} />
                </div>
                
                <input 
                    className="edit"
                    ref={this.editFieldCallback}
                    value={this.state.editText}
                    onBlur={this.handleSubmit}
                    onKeyDown={this.handleKeyDown}
                    onChange={this.handleChange} />
            </li>
        );
    }
}




export = TodoItem;