import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Spinner from 'components/common/Spinner';
import { authActions } from 'store/modules/auth';
import { withRouter } from 'react-router-dom';

const {
    NODE_ENV,
    REACT_APP_OAUTH_CLIENT_ID,
    REACT_APP_OAUTH_SECRET_ID,
    REACT_APP_OAUTH_DEV_CLIENT_ID,
    REACT_APP_OAUTH_DEV_SECRET_ID,
} = process.env;

class OAuthContainer extends Component {
    componentDidMount() {
        this.login();
    }

    login = async () => {
        const { AuthActions, code } = this.props;
        try {
            await AuthActions.login({
                code,
                clientId:
                    NODE_ENV === 'production'
                        ? REACT_APP_OAUTH_CLIENT_ID
                        : REACT_APP_OAUTH_DEV_CLIENT_ID,
                clientSecret:
                    NODE_ENV === 'production'
                        ? REACT_APP_OAUTH_SECRET_ID
                        : REACT_APP_OAUTH_DEV_SECRET_ID,
            });
            localStorage.setItem('access_token', this.props.accessToken);
            localStorage.setItem('user', JSON.stringify(this.props.user));
            // this.props.history.push('/')
            window.location.replace('/');
        } catch (e) {
            console.log(e);
        }
    };

    render() {
        return <Spinner />;
    }
}

export default withRouter(
    connect(
        ({ auth }) => ({
            accessToken: auth.accessToken,
            user: auth.user,
        }),
        dispatch => ({
            AuthActions: bindActionCreators(authActions, dispatch),
        })
    )(OAuthContainer)
);
