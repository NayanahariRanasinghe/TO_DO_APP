import React, {Component} from 'react';
import Edit from "./edit.component";
import { Switch, Route, Link, withRouter} from 'react-router-dom';
import axios from 'axios';
import TableRow from "./TableRow";
import {FaRegUserCircle,FaRegUser} from "react-icons/fa";
import Prof from './UserProfile';

class View extends Component {
    constructor(props) {
        super(props);
        this.state={todo_list:[]};
        this.state = {
            isChecked:0,
            isView:1,
            SelectObj:"",
            isUpdate : false,
            isUserUpdate:false
        }

        this.handleView = this.handleView.bind(this);
        this.loadtableData = this.loadtableData.bind(this);
        this.setUpdateObj=this.setUpdateObj.bind(this);
        this.handleUser = this.handleUser.bind(this);
        this.handleLogout=this.handleLogout.bind(this);
    }

    componentDidMount() {
       this.loadtableData();
    }

    loadtableData = () => {
        var userObj=this.props.cuserobj;
        axios.get('http://localhost:4000/todo_list?iscomplete='+this.state.isChecked+'&&userId='+(userObj?userObj._id:0))
        .then(response => {
            this.setState({todo_list:response.data});


        })
            .catch(function (error) {
                console.log(error);
                alert("ToDo List is empty")
            })
    }

    toggleChange = () => {
        this.setState({isChecked:!this.state.isChecked});
        setTimeout(() => {
            this.loadtableData();
        },500)
    }

    handleView = (cview) => {
        this.setState({isView:cview});

        if(cview === 1){
            this.loadtableData();
        }
    }

    handleLogout = () => {
        this.props.history.push("/");
        this.props.handlelogout(false);
    }

    setUpdateObj = (cobj) => {
        this.setState({SelectObj:cobj, isUpdate:true});
        this.handleView(2);
    }

    handleAdd = () => {
        this.setState({isUpdate:false, SelectObj:{}})
        this.handleView(2);
    }

    handleUser = (cview)=> {
        this.setState({isUserUpdate:cview, cuserobj:{}});
    }

    tabRow = () => {
        return (this.state.todo_list&&this.state.todo_list.length>0?this.state.todo_list.map((object,i) => {
            return <TableRow setupdateobj={this.setUpdateObj} 
                            handleview={this.handleView} loadingdata={this.loadtableData} obj={object} key={i}/>
        }):<></>);
    }

    render() {
        return (
                <div className="container border border-success rounded">
                    <div className="container"style={{paddingTop:10}}>
                        <nav className="navbar navbar-expand-lg navbar-light  rounded " style={{backgroundColor:'#668cff'}}>
                            <div className="collapse navbar-collapse" id="navbarSupportContent" >
                                <ul className="navbar-nav ml-auto nav justify-content-end">
                                    <li className="nav-item">
                                    <button className="btn Light" onClick={() => this.handleUser(true)}><FaRegUser/>{this.props.cuserobj.Name}</button>
                                        <br/>
                                    </li>
                                    <li> </li>
                                    <li className="nav-item">
                                            <button className="btn btn-link text-white" onClick={() => this.handleLogout()}>Logout </button>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                    <br/>

                <div className="container " style={{paddingLeft:40,paddingRight:40}}>
                    
                {this.state.isUserUpdate === false?
                 <>
                     {this.state.isView === 1?
                            <>
                                <div className="container" style={{paddingBottom:20,paddingTop:10}}>
                                    {this.state.isChecked===true?
                                        <>
                                        <h1  align="center"><span className="badge badge-success">Complete List</span></h1>
                                        </>
                                        :<h1  align="center"><span className="badge badge-success">Todo List</span></h1>
                                    }
                                </div>
                                <div className="container" style={{padding:20}}>
                                    <ul className="list-inline">
                                        <li className="list-inline-item">
                                            <div className="d-inline text-dark ">
                                                <input type="checkbox" className="form-check-input"
                                                    checked={this.state.isChecked}
                                                    onChange={this.toggleChange}
                                                />
                                                <b>Show complete items</b>
                                            </div>
                                        </li>
                                        <li className="list-inline-item float-right">
                                            <div display="inline">
                                                <button className="btn btn-outline-success"
                                                        onClick={this.handleAdd}>Add Item</button>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <table className="table table-striped " style={{marginTop:20,backgroundColor:'#ddccff'}}>
                                    <thead  style={{backgroundColor:'#bb99ff'}}>
                                    <tr>
                                        <th>Item Title</th>
                                        <th>Due Date</th>
                                        <th>Description</th>
                                        <th>Category</th>
                                        <th colSpan="3"></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.tabRow()}
                                    </tbody>
                                </table>
                            </>
                            :
                            <Edit 
                            isupdate={this.state.isUpdate} 
                            selectobj={this.state.SelectObj} 
                            handleview={this.handleView} 
                            setupdateobj={this.setUpdateObj}
                            cuserobj={this.props.cuserobj}
                        />    
                         }
                        </>
                        :
                        <Prof 
                            isUserUpdate={this.state.isUserUpdate}
                            handleuser={this.handleUser}
                            cuserobj={this.props.cuserobj}
                            handleLogout={this.handleLogout}/>
                    }
                </div>
            </div>
        )
    }
}

export default withRouter(View);