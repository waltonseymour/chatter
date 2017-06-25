import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ChatRoom, ChatMessage } from './components/ChatRoom';
import { List } from 'immutable';

ReactDOM.render(<ChatRoom history={List<ChatMessage>()} />, document.getElementById("app"));
