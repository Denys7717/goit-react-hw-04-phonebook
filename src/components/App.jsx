import { Component } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import css from './App.module.css';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const localData = localStorage.getItem('contacts');
    if (localData) {
      this.setState({ contacts: JSON.parse(localData) });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addContact = newContact => {
    const isAlreadyExist = this.state.contacts.find(
      el => el.name.toLocaleLowerCase() === newContact.name.toLowerCase()
    );
    if (isAlreadyExist) return alert('Already Exist');
    this.setState(prevState => ({
      contacts: [newContact, ...prevState.contacts],
    }));
  };

  filter = filterName => {
    this.setState({
      filter: filterName,
    });
  };

  deleteContact = id => {
    const updateContacts = this.state.contacts.filter(
      contact => contact.id !== id
    );
    this.setState({
      contacts: updateContacts,
    });
  };

  render() {
    const normalizeFilter = this.state.filter.toLowerCase();
    const visibleContacts = this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeFilter)
    );
    return (
      <>
        <div className={css.container}>
          <h1>Phonebook</h1>
          <ContactForm addContact={this.addContact} />
          <h2>Contacts</h2>
          <Filter filter={this.filter} />
          <ContactList
            contacts={visibleContacts}
            deleteContact={this.deleteContact}
          />
        </div>
      </>
    );
  }
}
