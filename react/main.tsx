import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ChatRoom, ChatMessage } from './components/ChatRoom';
import { NavHeader } from './components/NavHeader';
import { List } from 'immutable';

const App = () => {
    return <div>
        <NavHeader />
        <ChatRoom wsUrl="ws://localhost:9000/chat" />
    </div>;
}



ReactDOM.render(<App />, document.getElementById("app"));
