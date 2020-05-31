import React, { Component } from 'react';
import Users from '../users/Users';
import Search from '../users/Search';
import Github from '../gateway/github';

class Home extends Component {
    state = {
        // github users array
        users: [],
        // show loading or not
        is_loading: true,
    };

    componentDidMount() {
        // search without any query will give all users
        this.searchUsers();
    }

    // clear users from state
    clearUsers = () => this.setState({ users: [] });

    searchUsers = query => {
        this.setState({ is_loading: true });
        if (query) {
            Github.get(
                `search/users?q=${query}
        &client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
        &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
            )
                .then((res) => {
                    this.setState({ is_loading: false, users: res.data.items })
                })
                .catch((error) => {
                    // console.log(error);
                    // alert(JSON.stringify(error, null, 2));
                });
        } else {
            Github.get(
                `users?client_id=
        ${process.env.REACT_APP_GITHUB_CLIENT_ID}
        &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
            )
                .then((res) => {
                    this.setState({ is_loading: false, users: res.data })
                })
                .catch((error) => {
                    // console.log(error);
                    // alert(JSON.stringify(error, null, 2));
                });
        }
    };

    render() {
        return (
            <>
                <Search
                    searchUsers={this.searchUsers}
                    clearUsers={this.clearUsers}
                    showClear={this.state.users.length > 0 ? true : false}
                />
                <Users loading={this.state.is_loading} users={this.state.users} />
            </>
        );
    }
}

export default Home;
