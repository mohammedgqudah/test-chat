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
        let { dispatch, actions } = this.props;
        dispatch(actions.FRIEND_REQUEST(this.state.full_id));
    }
    onValue({ value, name }) {
        if (/\w+#\d\d\d\d/.test(value)) {
            this.setState({ full_id: value, error: false });
        } else {
            this.setState({ error: true });
        }
    }
    render() {
        return (
            <div className="AddFriend">
                <div style={{ width: '70%' }}>
                    <form onSubmit={this.onSubmit}>
                        <Input
                            ph="UserName#0000"
                            match={/\w+#\d\d\d\d/}
                            onValue={this.onValue}
                            style={{ border: 'none' }}
                        />
                        <Button
                            name="add"
                            extraClass={this.state.error && 'disabled'}
                        />
                    </form>
                </div>
            </div>
        );
    }
}

export default AddFriend;
