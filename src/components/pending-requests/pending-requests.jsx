import React, { Component } from 'react';

class PendingRequests extends Component {
    render() {
        let {store} = this.props;
        return (
            <div>
                {
                    store.dm.pending_requests.map(p => {
                        return <p>{p.to.name}</p>
                    })
                }
            </div>
        );
    }
}

export default PendingRequests;