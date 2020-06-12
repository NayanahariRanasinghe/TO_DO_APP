import React, {Component} from 'react';
import './UserProfile.css';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import validations from './validations';

class Prof extends Component {
    constructor(props)
    {
        super(props);

        this.state = {
            Name: '',
            Email:'',
            Password:'',
            isUserUpdate:false,
            nameval:true,
            emailval:true,
            pwordval:true
        }
        this.onChangeName=this.onChangeName.bind(this);
        this.onChangeEmail=this.onChangeEmail.bind(this);
        this.onChangePassword=this.onChangePassword.bind(this);
    }

    componentDidMount() {
        this.setState({isUserUpdate:this.props.isUserUpdate});
        if(this.props.isUserUpdate===true){
             this.setState({
                 Name:this.props.cuserobj.Name,
                 Email:this.props.cuserobj.Email,
                 Password:this.props.cuserobj.Password
             })
        }
    }
    
    onChangeName(e)
    {
        this.setState({Name:e.target.value})
    }

    onChangeEmail(e)
    {
        this.setState({Email:e.target.value})
    }

    onChangePassword(e)
    {
        this.setState({Password:e.target.value})
    }

    goBack = () => {
        this.props.handleuser(false);
    }

    valid = (type) => {
        console.log(this.state.Name)
        if(type==="name"){
            this.setState({nameval:validations("name",this.state.Name)});
        }
        else if(type==="email")
        {
            this.setState({emailval:validations("email",this.state.Email)});
        }
        else if(type==="pword")
        {
            this.setState({pwordval:validations("pword",this.state.Password)});
        }
        
    }

    register = (e) => {
        e.preventDefault();
        const obj={
            Name: this.state.Name,
            Email: this.state.Email,
            Password: this.state.Password,
        };
        if(!validations("name",obj.Name)){
            alert("Invalid username");
            return false;
        }

        if(!validations("email",obj.Email)){
            alert("Invalid Email");
            return false;
        }

        if(!validations("password",obj.Password)){
            alert("Invalid Password");
            return false;
        }
        console.log(this.props.cuserobj._id);
        axios.post("http://localhost:4000/user_list/update/"+this.props.cuserobj._id, obj).then(res => {
            this.setState({
                Name: '',
                Email: '',
                Password: '',
            });
            this.props.handleLogout();
        }).catch(error => {
            console.log(error);
            alert("Email already exists");
        });
        
    }

    render(){
        return(
            <div className=" login-form app flex-row align-items-center border border-success rounded">
                    <form>
                        <div className="mb-2 pageheading">
                                <h1 align="center"><span className="badge badge-primary">{this.props.cuserobj.Name}</span></h1>
                            <br/>
                        </div>
                        <div>
                            <label>Username</label>
                            <br/>
                            <input type="text" id="name" name="name" className="form-control" placeholder="Name"
                                    onChange={this.onChangeName}
                                    value={this.state.Name} 
                                    onBlur={()=>this.valid("name")}
                                    required/>
                                    {this.state.nameval===false?
                                    <>
                                        <div className="alert alert-danger" role="alert">
                                            <small>
                                            Username must only contain alphanumeric characters, underscore and dot.
                                            Underscore and dot can't be at the end or start of a username .(e.g _username / username_ / .username / username.).
                                            Underscore and dot can't be next to each other (e.g user_.name).
                                            Underscore or dot can't be used multiple times in a row (e.g user__name / user..name).
                                            Number of characters must be between 8 to 20.
                                            </small> 
                                        </div>
                                    </>
                                    :<></>
                                    }
                            </div>
                        <br/>
                        <div>
                            <label>Email</label>
                            <br/>
                            <input type="email" id="email" name="email" className="form-control" placeholder="Email address"
                                    onChange={this.onChangeEmail}
                                    value={this.state.Email} 
                                    onBlur={()=>this.valid("email")}
                                    required/>
                                    {this.state.emailval===false?
                                    <>
                                        <div className="alert alert-danger" role="alert">
                                            <small>
                                            Invalid email
                                            </small> 
                                        </div>
                                    </>
                                    :<></>
                                    }
                            </div>
                            <br/>
                        <div>
                            <label>Password</label>
                            <br/>
                            <input type="password" id="password" name="password" className="form-control" placeholder="Password"
                                    onChange={this.onChangePassword}
                                    value={this.state.Password} 
                                    onBlur={()=>this.valid("pword")}
                                    required/>
                                    {this.state.pwordval===false?
                                    <>
                                        <div className="alert alert-danger" role="alert">
                                            <small>
                                            at least 8 characters
                                            at least 1 numeric character
                                            at least 1 lowercase letter
                                            at least 1 uppercase letter
                                            at least 1 special character
                                            </small> 
                                        </div>
                                    </>
                                    :<></>
                                    }
                        <br/>
                        </div>
                        <div>
                        <button type="button" className="btn-lg btn-success btn-block" onClick={this.register} variant="success">
                            Update Account
                            </button>
                        </div>
                        <br/>
                            <div align="right">
                            <button type="button" className="btn  btn-secondary " onClick={() => this.goBack()}>Go Back</button>
                        </div>
                    </form>
                </div>
        );
    }
}

export default withRouter(Prof);
