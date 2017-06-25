import * as React from 'react';
import { List } from 'immutable';
import { Button, Intent } from "@blueprintjs/core";

export interface ChatMessage {
    Type: string;
    User: string;
    Timestamp: number;
    Text: string;
}

export interface ChatRoomProps {
    wsUrl: string;
}

export interface ChatRoomState {
    history: List<ChatMessage>;
    inputText: string;
}

export class ChatRoom extends React.Component<ChatRoomProps, ChatRoomState> {

    private ws: WebSocket;

    constructor(props: ChatRoomProps) {
        super(props);
        this.state = {
            history: List<ChatMessage>(),
            inputText: ''
        };
        this.ws = new WebSocket(this.props.wsUrl);
        this.ws.onmessage = this.recieveMessage;
    }

    private recieveMessage = (e: MessageEvent) => {
        if (e.type === "message") {
            const msg = JSON.parse(e.data);
            if (msg.Type === 'message') {
                this.setState({ history: this.state.history.push(msg) });
            }
        }
    }

    private send = (msg: string) => {
        this.ws.send(msg);
    }

    private onClick = () => {
        this.send(this.state.inputText);
        this.setState({ inputText: '' });
    }

    private onKeyPress = (e: any) => {
        if (e.key === 'Enter' && this.state.inputText) {
            this.onClick();
        }
    }

    private setInput = (e: any) => this.setState({ inputText: e.target.value });

    public render() {
        return <div className='chatroom pt-card pt-elevation-0' >
            <div className='messages'>
                {this.state.history.map((entry: ChatMessage) => {
                    return <div className="entry" key={entry.Timestamp} >{entry.Text}</div>;
                })}
            </div>
            <input
                type="text"
                className="pt-input"
                value={this.state.inputText}
                onChange={this.setInput}
                onKeyPress={this.onKeyPress}
            />
            <Button iconName='confirm' text="Send" onClick={this.onClick} intent={Intent.SUCCESS} />
        </div>;
    }
}