import React, { Component } from 'react'
import Spinner from '../layout/Spinner'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Github from '../gateway/github';

export class User extends Component {
    state = {
        is_loading: true
    };

    componentDidMount() {
        Github.get(
            `users/${this.props.match.params.login}
            ?&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
            &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
        ).then((res) => {
            this.setState({ is_loading: false, ...res.data })
        }).catch((error) => {
            // console.log(error);
            // alert(JSON.stringify(error, null, 2));
        });
    }

    static propTypes = {
        loading: PropTypes.bool
    };

    render() {
        if (this.state.is_loading) {
            return <Spinner />;
        }

        return (
            <>
                <div>{this.state.name}</div>
                <Link to='/' className="btn btn-light">
                    Back to search
                </Link>
            </>
        );
    }
}

export default User
