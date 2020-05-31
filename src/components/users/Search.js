import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Alert from '../layout/Alert';

export class Search extends Component {
    state = {
        text:'',
        alert: null,
    };
    
    //set alert
  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } });
    setTimeout(() => this.setState({ alert: null }), 2000);
  };
    static propTypes = {
        searchUsers: PropTypes.func.isRequired,
        clearUsers: PropTypes.func.isRequired,
        showClear: PropTypes.bool.isRequired
    };
    
    onSubmit= e =>{
        e.preventDefault();
        if (this.state.text=== '') {
                this.setAlert('Please enter something', 'light');
        }else{
            this.props.searchUsers(this.state.text);
        this.setState({ text:'' })
        }
        
    };
    onChange = e => this.setState({ [e.target.name]: e.target.value });

    render() {
        const {clearUsers,showClear} = this.props;
        return (
            <div>
                <Alert alert={this.state.alert} />
                <form onSubmit={this.onSubmit} className="form">
                    <input type="text" name="text" placeholder="Search Users"  
                    value={this.state.text} onChange={this.onChange}/>
                    
                    <input type="submit" value="Search" 
                    className="btn btn-dark btn-block"  />                                        
                </form>
                {showClear && 
                <button className="btn btn-light btn-block" 
                onClick={clearUsers} >Clear</button>}
                
                
            </div>
        )
    }
}

export default Search
