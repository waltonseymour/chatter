import * as React from 'react';
import { List } from 'immutable';

export interface ChatMessage {
    author: string;
    message: string;
    timstamp: Date;
}

export interface ChatRoomProps {
    history: List<ChatMessage>
}

export class ChatRoom extends React.Component<ChatRoomProps, {}> {

    constructor(props: ChatRoomProps) {
        super(props);
    }

    public render() {
        return <div className='chatroom'>
            <div className='messages'>
                {this.props.history.map((entry: ChatMessage) => {
                    return <div className="entry">{entry.message}</div>;
                })}
            </div>
            <input type="text" placeholder="write something fun" />
        </div>;
    }
}