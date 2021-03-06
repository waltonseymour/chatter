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

/**
 * Component that manages chatroom messages and the sending of websocket messages
 */
export class ChatRoom extends React.Component<ChatRoomProps, ChatRoomState> {

    private ws: WebSocket;

    constructor(props: ChatRoomProps) {
        super(props);
        this.state = {
            history: List<ChatMessage>(),
            inputText: ''
        };
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

    /**
     * Initializes websocket connection and lifecycle hooks
     */
    private connectWebsocket = () => {
        this.ws = new WebSocket(this.props.wsUrl);
        this.ws.onmessage = this.recieveMessage;
        this.ws.onclose = () => {
            setTimeout(() => this.connectWebsocket(), 5000);
        };
    }

    public componentDidMount() {
        this.connectWebsocket();
    }

    private setInput = (e: any) => this.setState({ inputText: e.target.value });

    public render() {
        return <div className='chatroom pt-card pt-elevation-0' >
            <div className='messages'>
                {this.state.history.map((entry: ChatMessage) => {
                    return <div className="entry" key={entry.Timestamp}>{entry.Text}</div>;
                })}
            </div>
            <div className='pt-input-group'>
                <input
                    type="text"
                    className="pt-input"
                    value={this.state.inputText}
                    onChange={this.setInput}
                    onKeyPress={this.onKeyPress}
                />
                <Button iconName='arrow-right' text="Send" className="pt-minimal" onClick={this.onClick} intent={Intent.SUCCESS} />
            </div>
        </div>;
    }
}