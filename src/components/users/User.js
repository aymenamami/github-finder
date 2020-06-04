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
            this.setState({ is_loading: false, data: { ...res.data } })
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
                {this.state.data.hireable && <span>Hey, you can hire this person!</span>}
                <div>{this.state.data.name}</div>
                <Link to='/' className="btn btn-light">
                    Back to search
                </Link>
            <b> Hireable {''} </b>
                {this.state.data.hireable ? (<i className='fas fa-check text-success'/>)
                 : (<i className='fas fa-times-circle text-danger'/>) }
                
                <div className='card grid-2'>
                <div className='all-center'>
                    <img 
                        src={this.state.data.avatar_url}
                        className='round-img'
                        alt=''
                        style={{ width: '150px' }}
                    />
                       <h1> { this.state.data.name } </h1>  
                       <p> Location : {this.state.data.location} </p>
                    </div>
                    <div>
                        { this.state.data.bio && (
                            <>
                            <h3> Bio</h3>
                            <p> { this.state.data.bio } </p>
                            </>
                        )}
                        <a href={this.state.data.html_url} className="btn btn-dark my-1" 
                        target="_blank" rel="noopener noreferrer"> 
                        Visit GitHub Profile
                         </a> 
                    </div>
                    <ul>
                        <li>
                            { this.state.data.login && (
                                <>
                                    <strong> Username: </strong>{this.state.data.login}
                                </>
                            ) }
                        </li>
                        <li>
                            { this.state.data.blog && (
                                <>
                                    <strong> Website: </strong>{this.state.data.blog}
                                </>
                            ) }
                        </li>
                        <li>
                            { this.state.data.company && (
                                <>
                                    <strong> Company: </strong>{this.state.data.company}
                                </>
                            ) }
                        </li>
                        

                    </ul>
                </div>
                <div className="card text-center" >
                <div className="badge badge-primary"> Followers:{this.state.data.followers} </div>
                <div className="badge badge-success"> Following:{this.state.data.following} </div>
                <div className="badge badge-light"> Public Repos:{this.state.data.public_repos} </div>
                <div className="badge badge-dark"> Public Gists:{this.state.data.public_gists} </div>
           
                </div>           
            </>
        );
    }
}

export default User
