import React, { Component } from 'react';

class Item extends Component {
    render() {
        let {pending} = this.props;
        return (
            <div className="Item">
                <div className="info">
                    <img src={pending} alt=""/>
                </div>
                <div className="type"></div>
                <div className="action"></div>
            </div>
        );
    }
}

class PendingRequests extends Component {
    render() {
        let { store } = this.props;
        return (
            <div className="PendingRequests">
                <div className="flex">
                    <div className="con">
                        {store.dm.pending_requests.map(p => {
                            return <Item key={p._id} pending={p} />;
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

export default PendingRequests;
