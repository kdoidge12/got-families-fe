import React from 'react';
import '../styles/css/tables.css';
import axios from 'axios';

class Form extends React.Component{
    constructor()
    {
        super();
        this.state = {
            fName: '',
            lName: '',
            image: ''
        };

        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        //this.imgChange = this.imgChange.bind(this);
    }
    /*imgChange(e)
    {
        const {image} = this.state;
        let reader = new FileReader();
        let file = e.target.files[0];
        this.state({image:file});


        console.log("img", this.state.image);
    }*/
    onChange(e)
    {
        e.preventDefault();
        //this.setState({fName:e.target.value});
        this.setState({[e.target.name] : e.target.value})
    }
    handleSubmit(event)
    {
        event.preventDefault();
        const {fName,lName} = this.state;
        console.log(fName,lName);
        axios.post(`http://localhost:47364/newPerson?FirstName=${fName}&LastName=${lName}`)
            .then((result)=>{
                console.log(result);
                console.log(result.data);
            })
        this.setState({fName:''});
        this.setState({lName:''});
        //this.setState({image:null});
    }

    render()
    {
        return(
            <form onSubmit={this.handleSubmit}>
                <div>
                    <label htmlFor="fname">First Name : </label>
                    <input type="text" onChange={this.onChange} id="firstName" name="fName" value={this.state.fName} placeholder="First name.."></input>
                </div>
                <div>
                    <label htmlFor="lname">Last Name : </label>
                    <input type="text" onChange={this.onChange} id="lastName" name="lName" value={this.state.lName} placeholder="Last name.."></input>
                </div>
                <div>
                    <label htmlFor="picture">Picture : </label>
                    <input type="file" id="picture" onChange={this.imgChange}  name="image" accept="image/png, image/jpeg"></input>
                </div>
                <button type="submit" value="Submit">Submit</button>
            </form>
        )
    }
}

class PeopleTable extends React.Component {
    constructor()
    {
        super();
        this.state ={
            people: []
        };
    }

    /*
    {
  "id": "f7d154ad-1080-414c-985e-f19ca6fef7d0",
  "firstName": "Arya",
  "lastName": "Stark",
  "description": null,
  "families": null
}
    */
    componentWillMount()
    {

            fetch("http://localhost:47364/Person/all",{
                headers : {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }

            })
                .then(result => {return result.json()})
                .then(data => {
                    this.setState({people: data});
                    console.log("set state", this.state.people);
                })
    }

    render() {
        return(
            <div>
                <Form/>
                <table>
                    <tbody>
                        <tr>
                            <th scope="col">Last Name</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Avatar</th>
                        </tr>
                    </tbody>
                    {this.state.people.map(function(person,i){
                        return <tbody key={i}>
                        <tr>
                            <td>{person.lastName}</td>
                            <td>{person.firstName}</td>
                            <td><img src={person.imgPath} alt=""></img></td>
                        </tr>
                        </tbody>
                    })}
                </table>
            </div>
        )
    }
}

export default PeopleTable;