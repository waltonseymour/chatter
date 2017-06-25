import * as React from 'react';
import { List } from 'immutable';
import { Button, Intent } from "@blueprintjs/core";

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
        return <div className='chatroom pt-card pt-elevation-0' >
            <div className='messages'>
                {this.props.history.map((entry: ChatMessage) => {
                    return <div className="entry">{entry.message}</div>;
                })}
            </div>

            <input type="text" className="pt-input" placeholder="write something fun" />
            <Button iconName='confirm' text="Send" intent={Intent.SUCCESS} />
        </div>;
    }
}