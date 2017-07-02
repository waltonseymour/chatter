import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as uuidv4 from 'uuid/v4';
import { ChatRoom, ChatMessage } from './components/ChatRoom';
import { NavHeader } from './components/NavHeader';
import { List } from 'immutable';

require("./app.less");

const App = () => {
    return <div>
        <NavHeader />
        <ChatRoom wsUrl={"wss://" + location.host + "/chat?user=" + uuidv4()} />
    </div>;
}

ReactDOM.render(<App />, document.getElementById("app"));
