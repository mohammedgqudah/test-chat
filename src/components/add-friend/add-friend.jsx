import React, { Component } from 'react';
import './add-friend.scss';
import Input from '../input/input.jsx';
import Button from '../buttons/button.jsx';

class AddFriend extends Component {
    constructor(props) {
        super(props);
        this.onValue = this.onValue.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = { error: true };
    }
    onSubmit(evt) {
        evt.preventDefault();
        let { actions } = this.props;
        if (!this.state.error) {
            actions.FRIEND_REQUEST(this.state.full_id);
        }
    }
    onValue({ value, name }) {
        if (/\w+#\d\d\d\d/.test(value)) {
            this.setState({ full_id: value, error: false });
        } else {
            this.setState({ error: true });
        }
    }
    render() {
        let { store } = this.props;
        return (
            <div className="AddFriend">
                <div style={{ width: '70%' }}>
                    <form onSubmit={this.onSubmit}>
                        <Input
                            ph="UserName#0000"
                            match={/\w+#\d\d\d\d/}
                            onValue={this.onValue}
                            style={{ border: 'none' }}
                            error={store.dm.friend_request_error}
                        />
                        <Button name="add" extraClass={'disabled'} />
                    </form>
                </div>
            </div>
        );
    }
}

export default AddFriend;
