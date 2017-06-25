import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ChatRoom, ChatMessage } from './components/ChatRoom';
import { NavHeader } from './components/NavHeader';
import { List } from 'immutable';

const App = () => {
    return <div>
        <NavHeader />
        <ChatRoom history={List<ChatMessage>()} />
    </div>;
}



ReactDOM.render(<App />, document.getElementById("app"));
