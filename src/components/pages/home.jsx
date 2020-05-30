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
    this.setState({ is_loading: true });
    const users = this.searchUsers();
    this.setState({ users: users, is_loading: false });
  }

  searchUsers = async query => {
    if (query) {
      Github.get(
        `search/users?q=${query}
        &client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
        &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      )
        .then((res) => {
          console.log('inside query');
          console.log(res);
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
          console.log('no query');
          console.log(res);
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
          searchUsers={this.props.searchUsers}
          clearUsers={this.props.clearUsers}
          showClear={false}
          setAlert={this.props.setAlert}
        />
        <Users loading={this.state.is_loading} users={this.state.users} />
      </>
    );
  }
}

export default Home;
