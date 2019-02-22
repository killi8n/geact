import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { LoginPage, NotFoundPage, OAuthPage } from 'pages'

class App extends Component {
    render() {
        return (
            <>
                <Switch>
                    <Route exact={true} path="/login" component={LoginPage} />
                    <Route
                        exact={true}
                        path="/login/oauth"
                        component={OAuthPage}
                    />
                    <Route component={NotFoundPage} />
                </Switch>
            </>
        )
    }
}

export default App
