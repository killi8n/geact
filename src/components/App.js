import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import {
    LoginPage,
    NotFoundPage,
    OAuthPage,
    LandingPage,
    MyPage,
    MorePage,
} from 'pages'
import Base from 'containers/Base'
import RouteListener from 'lib/RouteListener'

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
                    <Route path="/more/:category" component={MorePage} />
                    <Route component={NotFoundPage} />
                </Switch>
                <Base />
                <RouteListener />
            </>
        )
    }
}

export default App
