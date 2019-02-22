import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { LoginPage, NotFoundPage, OAuthPage, LandingPage } from 'pages'

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
                    <Route path="/" component={LandingPage} />
                    <Route component={NotFoundPage} />
                </Switch>
            </>
        )
    }
}

export default App
