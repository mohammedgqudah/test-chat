import './friends.scss';
import React, { Component } from 'react';
import {NavLink as Link, Redirect, Route} from 'react-router-dom';
import AddFriend from '../add-friend/add-friend.jsx';
import PendingRequest from '../pending-requests/pending-requests.jsx';
class Friends extends Component {
    render() {
        return (
            <div className="Friends">
                <Route exact path="/@me/friends/" render={() => <Redirect to="/@me/friends/pending" push/>}/>
                <div className="header">
                    <Link to="/@me/friends/add-new"className="link" activeClassName="active">add friend</Link>
                    <Link to="/@me/friends/pending"className="link" activeClassName="active">pending</Link>
                    <Link to="/@me/friends/section"className="link" activeClassName="active">section</Link>
                </div>
                <div className="body">
                    <Route path="/@me/friends/add-new" render={() => <AddFriend {...this.props}/>}/>
                    <Route path="/@me/friends/pending" render={() => <PendingRequest {...this.props}/>}/>
                </div>
            </div>
        );
    }
}

export default Friends;
