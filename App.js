import React, {Component} from 'react';
import './App.css';
import {withRouter} from 'react-router-dom';
import View from "./components/view.component";
import Reg from "./components/registerUser";
import axios from 'axios';
import validations from './components/validations';

class App extends Component {
  constructor(props){
    super(props);
    this.state={user_list:[]};
    this.state = {
      email : "",
      password : "",
      isloggin: false,
      issingup: false,
      isPwordUpdate:false,
      cuserobj: {},
      emailval:true,
      pwordval:true
    };

    this.onChange=this.onChange.bind(this);
    this.onSubmit=this.onSubmit.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleToggleSignup = this.handleToggleSignup.bind(this);
    this.loadUserData=this.loadUserData.bind(this);
  }


  componentDidMount(){
    if(localStorage.getItem("islogged")){
      this.setState({isloggin:true,cuserobj:JSON.parse(localStorage.getItem("userObj"))});
    }

    //this.loadUserData();
  }


  loadUserData = () => {
    axios.get('http://localhost:4000/user_list?getEmail='+this.state.email+'&&getPword='+this.state.password)
    .then(response => 
      {
        if(response && response.data.status === 1)
        {
          this.props.history.push('/View');
          this.setState({isloggin:true, cuserobj: (response.data.user?response.data.user:{})});
          localStorage.setItem("islogged",true); // By this not logout when refresh
          localStorage.setItem("userObj",JSON.stringify(response.data.user)); //send user datils to JSON
        }
        else
        {
          alert((response&&response.message?response.message:"error"))
          this.setState({
          email : "",
          password : ""
            })
        }
    })
        .catch(function (error) {
            console.log(error);
        })
  }

  onChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

    handleLogout = (cstate) => {
      this.setState({isloggin:cstate})
      this.setState({
        email : "",
        password : ""
      })
      localStorage.removeItem("islogged");
    }

    handleToggleSignup = () => {
      this.setState({
        issingup : !this.state.issingup
      })
    }

  valid = (type) => {
    if(type==="email")
    {
        this.setState({emailval:validations("email",this.state.email)});
    }
    else if(type==="pword")
    {
        this.setState({pwordval:validations("pword",this.state.password)});
    }
        
  }


  onSubmit = e => {
    e.preventDefault();
    this.loadUserData();
   /* if(user.email===this.UserRow.email && user.password===this.UserRow.password ){
      this.props.history.push('/View');
      this.setState({isloggin:true});
      localStorage.setItem("islogged",true);
    }else {
      alert("invalid username or password");
    }
   /* if(user.email==="nayanahari@gmail.com" && user.password=== "123" ){
      this.props.history.push('/View');
      this.setState({isloggin:true});
      localStorage.setItem("islogged",true);
    }else {
      alert("invalid username or password");
    }*/
  }

  render() {
    return ( this.state.isloggin=== false?
      (this.state.issingup=== false?
            <div className="login-form border border-success rounded">
              <h1 align="center" ><span className="badge badge-primary">ToDoApp</span></h1>
              <br/>
              <form onSubmit={this.onSubmit}>
                <div>
                  <label>Email</label>
                  <br/>
                  <input type="email" id="email" name="email" className="form-control" placeholder="Email address"
                         onChange={this.onChange}
                         value={this.state.email} 
                         onBlur={()=>this.valid("email")}
                         required/>
                         {!this.state.email===null?
                          <>
                            {this.state.emailval===false?
                            <>
                                <div className="alert alert-danger" role="alert">
                                    <small>
                                    Invalid Email
                                    </small> 
                                </div>
                            </>
                            :<></>
                            }
                          </>
                          :
                          <></>
                         }
                </div>
                <br/>
                <div>
                  <label>Password</label>
                  <br/>
                  <input type="password" id="password" name="password" className="form-control" placeholder="Password"
                         onChange={this.onChange}
                         value={this.state.password} 
                         onBlur={()=>this.valid("pword")}
                         required/>
                         {this.state.pwordval===false?
                          <>
                              <div className="alert alert-danger" role="alert">
                                  <small>
                                  Password Incorrect
                                  </small> 
                              </div>
                          </>
                          :<></>
                          }
                </div>
                <br/>
                <button className="btn-lg btn-success btn-block" onClick={this.onSubmit}>Login</button>
                <br/>
                <div className="text-center">
                  <label className="btn btn-link" onClick={this.handleToggleSignup}>Sign-up</label>
                  <span className="p-2">|</span>
                  <label className="btn btn-link" >Forgot-password</label>
                </div>
              </form>
            </div>
            :
            <Reg handlelchangeroute={this.handleToggleSignup}/>)
            :
            <View handlelogout={this.handleLogout} cuserobj={this.state.cuserobj}/>
    );
  }
}

export default withRouter(App);