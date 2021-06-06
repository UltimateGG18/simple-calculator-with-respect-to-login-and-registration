import React from 'react';
import '../Styles/Login.css';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { ToastsContainer, ToastsStore, ToastsContainerPosition } from 'react-toasts';

class Login extends React.Component{

    constructor() {
        super();
        this.state = {
            isLoggedIn: false,
            email: '',
            password: '',
            activeUser: [],
        }
        this.handleLoginClick = this.handleLoginClick.bind(this);
    }

    handleLoginClick = () => {
        const { email, password } = this.state;
        var re = /\S+@\S+\.\S+/;

        if (!(re.test(email))) {
            ToastsStore.error('email is not valid.');
            return
        }
        if (password.length < 6) {
            ToastsStore.error('Incorrect Password');
            return
        }
        if (re.test(email) && password.length >= 6) {
            const inputObj = {
                email: email,
                password: password
            }
            axios({
                method: 'POST',
                url: 'http://localhost:2022/signin',
                headers: { 'Content-Type': 'application/json' },
                data: inputObj
            })
                .then(response => {
                    if (response.data.isAuth === false) {
                        ToastsStore.error(response.data.message);
                    } else {
                        this.setState({ activeUser: response.data.ActiveUser, isLoggedIn: true})
                        ToastsStore.success(response.data.message);
                        this.props.history.push('/calculator');
                    }
                })
                .catch()
        }
    }

    handleChange = (event, state) => {
        this.setState({ [state]: event.target.value });
    }

    handleSignup = () => {
        this.props.history.push('/signup');
    }

    render(){
        return(
            <div>
                
                <div style ={{border:'solid 1px', marginLeft:'200px',marginRight:'200px', height :'350px' }}>
                <div className='login-form-heading'>Login</div>
                <div className='login-form-labels'>Email</div>
                <input className='form-control' type='text' style={{ border: 'solid 1px' , width: '400px',marginLeft: '265px' }} placeholder='Enter Your Email' name='email' onChange={(event) => this.handleChange(event, 'email')} />
                <div className='login-form-labels'>Password</div>
                <input className='form-control' type='password' style={{ border: 'solid 1px' , width: '400px',marginLeft: '265px' }} placeholder='Enter Your Password' onChange={(event) => this.handleChange(event, 'password')} />
                <button className='login-form-button' onClick={this.handleLoginClick}>Login</button>
                <div style={{ marginTop: '10px', fontFamily: 'poppins', color: '#192f60',marginLeft: '265px' }}>if you don't have an Account <span onClick={this.handleSignup} style={{ color: '#0000EE', textDecoration: 'underline' }}>  Create An Account</span></div>
            </div>
                
                
                    <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.TOP_CENTER} />
            </div>
        )
    }
}
export default withRouter(Login);