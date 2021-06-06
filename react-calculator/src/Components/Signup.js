import React from 'react';
import '../Styles/Signup.css';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { ToastsContainer, ToastsStore, ToastsContainerPosition } from 'react-toasts';
import Modal from 'react-modal';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'skyblue',
        width: '400px',
        border: 'solid 1px'
    }
};

class Signup extends React.Component{

    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password : '',
            mobile: '',
            address: '',
            users: {},
            userDetailsModalIsOpen : false
            
        }
    }

    handleChange = (event, state) => {
        this.setState({ [state]: event.target.value });
    }

    handleSignupClick = () => {
        const { name, email, password, mobile,address } = this.state;
        var re = /\S+@\S+\.\S+/;
        var phoneno = /^\d{10}$/;

        if (name === null || name === '') {
            ToastsStore.warning("Name can't be blank");
            return
        }
        if (!(re.test(email))) {
            ToastsStore.error("email is not valid.");
            return
        }
        if (password.length < 6) {
            ToastsStore.warning("Password must be at least 6 characters long.");
            return
        }
        if (!(mobile.match(phoneno))) {
            ToastsStore.warning("Phone number must be numbers only and have 10 digits.");
            return
        }
        if (!(name === null || name === '') && re.test(email) && password.length >= 6 && mobile.match(phoneno)) {
            const inputObj = {
                name: name,
                email: email,
                password: password,
                mobile: mobile,
                address : address
            }
            axios({
                method: 'POST',
                url: 'http://localhost:2022/signup',
                headers: { 'Content-Type': 'application/json' },
                data: inputObj
            })
                .then(response => {
                    this.setState({ users: response.data.users, userDetailsModalIsOpen: true })
                })
                .catch()
        }
    }

    handleLoginLink = () => {
        this.props.history.push('/');
    }
    handleRemove = () => {
        this.setState({  userDetailsModalIsOpen: false });
    }



    render(){
        const { users, userDetailsModalIsOpen } = this.state;
        return(
            <div>
                <div style ={{border:'solid 1px', marginLeft:'200px',marginRight:'200px', height :'550px'}}>
                        <div className='login-form-heading'>Signup</div>
                        <div className='login-form-labels'>Name</div>
                        <input className='form-control' type='text' style={{ border: 'solid 1px' , width: '400px',marginLeft: '265px'}} placeholder='Enter Your Name' onChange={(event) => this.handleChange(event, 'name')} />
                        <div className='login-form-labels'>Email</div>
                        <input className='form-control' type='text' style={{ border: 'solid 1px', width: '400px',marginLeft: '265px' }} name='email' placeholder='Enter Your Email' onChange={(event) => this.handleChange(event, 'email')} />
                        <div className='login-form-labels'>Password</div>
                        <input className='form-control' type='password' style={{ border: 'solid 1px', width: '400px',marginLeft: '265px' }} placeholder='Enter Your Password' onChange={(event) => this.handleChange(event, 'password')} />
                        <div className='login-form-labels'>Mobile</div>
                        <input className='form-control' type='text' style={{ border: 'solid 1px', width: '400px',marginLeft: '265px' }} placeholder='Enter Your Mobile' onChange={(event) => this.handleChange(event, 'mobile')} />
                        <div className='login-form-labels'>Address </div>
                        <textarea className='form-control' type="text" style={{ border: 'solid 1px', width: '400px',marginLeft: '265px' }} placeholder='Enter Your Address' onChange={(event) => this.handleChange(event, 'address')} />
                        <button className='login-form-button' onClick={this.handleSignupClick}>Signup</button>
                        <div style={{ marginTop: '10px', fontFamily: 'poppins', color: '#192f60',marginLeft: '265px' }}>if you have an Account <span onClick={this.handleLoginLink} style={{ color: '#0000EE', textDecoration: 'underline' }}> Login here</span></div>
                    </div>

                    <Modal
                    isOpen={userDetailsModalIsOpen}
                    style={customStyles}
                    >
                    <div>
                        <div className='glyphicon glyphicon-remove' onClick={this.handleRemove} style={{ float: 'right', margin: '5px', color: 'black' }}></div>
                        <div className='userDetails-heading'>User Details</div>
                        <div className='userDetails-labels'>Name : {users.name}</div>

                        <div className='userDetails-labels'>Email : {users.email}</div>

                        <div className='userDetails-labels'>Mobile : {users.mobile}</div>

                        <div className='userDetails-labels'>Address : {users.address}</div>

                        <div className='userDetails-labels'>User Added Successfully...</div>
                    </div>
                </Modal>
                <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.TOP_CENTER} />
            </div>
        )
    }
}
export default withRouter(Signup);