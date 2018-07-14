import react, { Component } from 'react';
import { BrowserRouter, Route, Switch, withRouter } from 'react-router-dom';
import Form from '../form/form.jsx';
import Input from '../input/input.jsx';
class AppMain extends Component {
    render() {
        return (
            <Route
                path="/login"
                render={() => {
                    return (
                    <Form button="login" title="login" onSubmit={() => {alert('LGGED')}}>
                        <Input/>
                    </Form>
                )
                }}
            />
        );
    }
}

export default AppMain;
