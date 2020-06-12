import React, {Component} from 'react';
import {Link, Route, Switch} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { FaPen, FaCheck, FaTrash } from "react-icons/fa";
import axios from "axios";

class TableRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            iscomplete:0
        }
        // const item = props.todo_list;
        this.deleteItem=this.deleteItem.bind(this);
    }

    deleteItem(cobj){
        cobj.status = "OFFLINE";
        this.updateObj(cobj);
    }

    handleComplete = (cobj) => {
        cobj.status = "COMPLETE";
        this.updateObj(cobj);
    }

    updateObj = (cobj) => {
        axios.post('http://localhost:4000/todo_list//update/'+cobj._id, cobj).then(res => {
            this.setState({
                item_title:'',
                due_date:'',
                description:'',
                category:'',
                status:'',
            });
            this.props.handleview(1);
        }).catch(error => {
            console.log(error);
        });
        console.log(cobj);this.props.loadingdata();
    }

    convDate(cdate){
        var curr = new Date();
        return curr.toISOString().substr(0,10);
    }

    render() {
        return(
            this.props.obj&&this.props.obj.status&&this.props.obj.status!=="OFFLINE"?
                <tr>
                    <td>{this.props.obj.item_title}</td>
                    <td>{this.convDate(this.props.due_date)}</td>
                    <td>{this.props.obj.description}</td>
                    <td>{this.props.obj.category}</td>
                    <td>
                        {this.props.obj.status==="COMPLETE"?
                            <> </>
                            : <button className="btn Light" onClick={() => this.props.setupdateobj(this.props.obj)}><FaPen/></button>
                        }
                    </td>
                    <td>
                        <button className="btn Light" onClick={() => this.deleteItem(this.props.obj)}><FaTrash/></button>
                    </td>
                    <td>
                        <button className="btn Light" onClick={() => this.handleComplete(this.props.obj)}><FaCheck/></button>
                    </td>
                </tr>
                :<></>

        );
    }
}

export default TableRow;
