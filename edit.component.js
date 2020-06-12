import React, {Component} from 'react';
import axios from 'axios';

class Edit extends Component {

    constructor(props) {
        super(props);
        this.onChangeItem=this.onChangeItem.bind(this);
        this.onChangeDate=this.onChangeDate.bind(this);
        this.onChangeDescription=this.onChangeDescription.bind(this);
        this.onChangeCategory=this.onChangeCategory.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
        this.goBack = this.goBack.bind(this);


        this.state={
            isupdate: false,
            selectedobj: {},
            item_title:'',
            due_date:'',
            description:'',
            category:''
        }
    }

    componentDidMount() {
        this.setState({isupdate:this.props.isupdate, selectedobj:this.props.selectobj});
        console.log(this.props.isupdate);
        console.log(this.props.selectobj);
        if(this.props.isupdate===true){
             this.setState({
                 item_title:this.props.selectobj.item_title,
                 due_date:this.convDate(this.props.selectobj.due_date),
                 description:this.props.selectobj.description,
                 category:this.props.selectobj.category
             })
        }
    }

    convDate(cdate){
        var curr = new Date();
        return curr.toISOString().substr(0,10);
    }

    onChangeItem(e){
        this.setState({
            item_title: e.target.value
        });
    }
    onChangeDate(e){
        this.setState({
            due_date: e.target.value
        });
    }
    onChangeDescription(e){
        this.setState({
            description: e.target.value
        });
    }
    onChangeCategory(e){
        this.setState({
            category: e.target.value
        });
    }
    onSubmit(e){
        e.preventDefault();

        if(this.state.item_title=== "" || this.state.due_date=== "" || this.state.description=== "" || this.state.category==="")
        {
            alert("Fill all the fields");
            return false;
        }
        else {
            const obj={
                item_title: this.state.item_title,
                due_date: this.state.due_date,
                description: this.state.description,
                category: this.state.category,
                status: "ONLINE",
                userId:this.props.cuserobj._id
            };

            var ul = "http://localhost:4000/todo_list/add";
            if(this.state.isupdate)
            {
                ul="http://localhost:4000/todo_list//update/"+this.state.selectedobj._id;
            }
            axios.post(ul, obj).then(res => {
                this.setState({
                    item_title:'',
                    due_date:'',
                    description:'',
                    category:'',
                    isview: 1,
                });
                this.props.handleview(1);
            }).catch(error => {
                console.log(error);
            });
        }
    }

    goBack(){
        this.props.handleview(1);
    }

    render() {
        return (
            <div style={{marginTop: 10,padding:30}} >
                {this.state.isupdate===true?
                    <>
                        <h3 align="center">Edit todo</h3>
                    </>
                    :<h3 align="center">Add todo</h3>
                }
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Item Title: </label>
                        <input type="text" className="form-control"
                               value={this.state.item_title}
                               onChange={this.onChangeItem}/>
                    </div>
                    <div className="form-group">
                        <label style={{paddingRight:20}}>Due Date: </label> 
                        <input type="date" style={{paddingLeft:20}}
                               value={this.state.due_date}
                               onChange={this.onChangeDate}/>
                    </div>
                    <div className="form-group">
                        <label >Description: </label>
                        <input type="text" className="form-control"
                               value={this.state.description}
                               onChange={this.onChangeDescription}/>
                    </div>
                    <div className="form-group">
                        <label style={{paddingRight:20}}>Category: </label>
                        <select style={{paddingLeft:20}}
                            value={this.state.category}
                            onChange={this.onChangeCategory}>
                            <option value="">Select a category</option>
                            <option value="Food">Food</option>
                            <option value="Shopping">Shopping</option>
                            <option value="Education">Education</option>
                            <option value="Bank">Bank</option>
                            <option value="Garden">Garden</option>
                        </select>
                    </div>
                    <ul className="list-inline">
                        <li className="list-inline-item">
                            <div className=" d-inline" >
                                {this.state.isupdate===true?
                                    <>
                                        <input type="submit" value="Done Edit" className="btn btn-primary btn-success"/>
                                    </>
                                    :<input type="submit" value="Add ToDo Item" className="btn btn-primary btn-success"/>
                                }
                            </div>
                        </li>
                        <li className="list-inline-item float-right">
                            <div className="d-inline" >
                                <div align="right">
                                    <button className="btn  btn-secondary " onClick={this.goBack}>Go Back</button>
                                </div>
                            </div>
                        </li>
                    </ul>
                </form>
            </div>
        );
    }
}

export default Edit;