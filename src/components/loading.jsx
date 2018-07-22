import React, { Component } from 'react';

class Loading extends Component {
    render() {
        return (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <img src="/static/img/chat-loading.gif" alt="" />
            </div>
        );
    }
}
export default Loading;
