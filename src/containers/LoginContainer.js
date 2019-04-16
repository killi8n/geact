import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoginButton from 'components/auth/LoginButton';

const {
    NODE_ENV,
    REACT_APP_OAUTH_CLIENT_ID,
    REACT_APP_OAUTH_DEV_CLIENT_ID,
} = process.env;

class LoginContainer extends Component {
    handleClickLogin = () => {
        window.location.replace(
            `https://github.com/login/oauth/authorize?scope=user:email&client_id=${
                NODE_ENV === 'production'
                    ? REACT_APP_OAUTH_CLIENT_ID
                    : REACT_APP_OAUTH_DEV_CLIENT_ID
            }`
        );
    };

    render() {
        const { handleClickLogin } = this;
        return <LoginButton onClick={handleClickLogin} />;
    }
}

export default connect()(LoginContainer);
