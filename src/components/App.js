import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { LoginPage, NotFoundPage, OAuthPage, LandingPage, MyPage } from 'pages'
import Base from 'containers/Base'

class App extends Component {
    render() {
        return (
            <>
                <Switch>
                    <Route exact={true} path="/" component={LandingPage} />
                    <Route exact={true} path="/login" component={LoginPage} />
                    <Route
                        exact={true}
                        path="/login/oauth"
                        component={OAuthPage}
                    />
                    <Route path="/mypage" component={MyPage} />
                    <Route component={NotFoundPage} />
                </Switch>
                <Base />
            </>
        )
    }
}

export default App
