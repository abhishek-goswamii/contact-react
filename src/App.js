import React from 'react';
import './App.css';
import ContactCard from './Components/ContactCard';
import AddNewContact from './Components/AddNewContact';
import EditContact from './Components/EditContact';

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      users: [],
      isEditingContact: false,
      selectedUser: ""
    }
  }

  // Get List of Contacts from API once the components are mounted and set them in the State.
  componentDidMount(){
    fetch('https://jsonplaceholder.typicode.com/users')
    .then((data)=>{
      data.json().then((res)=>{
        this.setState({
          users: res
        });
      })
    }).catch((err)=>{
      console.log('Failed to Retrieve Data:', err);
    })
  }

  // Change State Values required to show the Edit Contact popup.
  showUpdateContact = (id) => {
    this.setState({
      isEditingContact: true,
      selectedUser: id
    })
  }

  // Change State Values required to remove the Edit Contact popup.
  closeUpdateContact = () => {
    this.setState({
      isEditingContact: false,
      selectedUser: ""
    })
  }

  // Returns the User data required for Edit Contact Component.
  getUser(){
    const { users } = this.state;
    const user = users.filter((user)=> user.id === this.state.selectedUser);

    return user[0];
  }

  // Handles functionality for Edit Contact once user Submits the form.
  handleUpdateContact = (updatedUser) => {
    const { users } = this.state;
    const userIndex = users.map(user => user.id).indexOf(this.state.selectedUser);

    // Dummy 'PUT' API call to update Contact
    fetch(`https://jsonplaceholder.typicode.com/users/1`, {
      method: 'PUT',
      body: JSON.stringify(updatedUser),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    .then(() => {
      users[userIndex] = {...updatedUser};

      this.closeUpdateContact();

      this.setState({
        users
      });
    }).catch((error) => console.log("Failed to Update:", error));
  }
  
  // Handles functionality for Delete Contact once user clicks Delete on a Contact.
  handleDeleteContact = (id) => {
    // Dummy 'DELETE' API call to delete a Contact
    fetch(`https://jsonplaceholder.typicode.com/users/1`, {
      method: 'DELETE',
    });

    const { users } = this.state;
    const newUsers = users.filter((user) => user.id !== id);

    this.setState({
      users: newUsers
    })
  }

  // Handles functionality for Adding a New Contact to the State.
  handleNewContact = (newContact) => {
    // Dummy 'POST' API call to add new Contact
    fetch(`https://jsonplaceholder.typicode.com/users`, {
      method: 'POST',
      body: JSON.stringify(newContact),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(() =>{

        const { users } = this.state;
        users.push(newContact)

        this.setState({
          users
        })
      });
  }


  render(){
    return (
      <div className='contact-list'>
        <h1>
          <i className='fa fa-address-card'></i>
          &nbsp; Contact List
        </h1>
        <AddNewContact onAddContact={this.handleNewContact}/>
        {this.state.users.map((user)=>{
          return (
            <ContactCard key={user.id} user={user} onUpdate={this.showUpdateContact} onDelete={this.handleDeleteContact}/>
          );
        })}
        <EditContact editingContact={this.state.isEditingContact} user={this.getUser()} onClose={this.closeUpdateContact} onUpdate={this.handleUpdateContact}/>
      </div>
    );
  }
}

export default App;
