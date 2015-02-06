'use strict';

import React = require('react');
import Todo = require('./todo');
import Utils = require('./utils');
import routes = require('./routes');

interface Props {
    count: number;
    completedCount: number;
    onClearCompleted: () => void;
    nowShowing: string;
}

class TodoFooter extends React.Component<Props, void> {
    render(): React.ReactElement {
        var activeTodoWord = Utils.pluralize(this.props.count, 'item');
        var clearButton: React.ReactHTMLElement = null;

        if (this.props.completedCount > 0) {
            clearButton = (
                <button id="clear-completed" onClick={this.props.onClearCompleted}>
                    Clear completed ({this.props.completedCount})
                </button>
            );
        }
        
        var nowShowing = this.props.nowShowing;
        
        return (
            <footer id="footer">
                <span id="todo-count">
                    <strong>{this.props.count}</strong> {activeTodoWord} left
                </span>
                <ul id="filters">
                    <li>
                        <a
                            href="#/"
                            className={ nowShowing === routes.ALL_TODOS ? 'selected' :''}>
                                All
                        </a>
                    </li>

                    <li>
                        <a
                            href="#/active"
                            className={ nowShowing === routes.ACTIVE_TODOS ? 'selected' :''}>
                                Active
                        </a>
                    </li>

                    <li>
                        <a
                            href="#/completed"
                            className={ nowShowing === routes.COMPLETED_TODOS ? 'selected' :''}>
                                Completed
                        </a>
                    </li>
                </ul>
                {clearButton}
            </footer>
        );
        
    }
}


export = TodoFooter;