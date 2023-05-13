import { Component } from 'react';
import ContactForm from 'components/ContactForm/ContactForm';
import ContactsList from 'components/ContactsList/ContactsList';
import FilterContact from 'components/FilterContact/FilterContact';
import styles from './App.module.css';
import { LOCALSTORAGE_KEY } from 'components/constants';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };
  componentDidMount() {
    const savedContacts = localStorage.getItem(LOCALSTORAGE_KEY);
    if (savedContacts !== null) {
      this.setState({ contacts: JSON.parse(savedContacts) });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.contact !== this.state.contacts) {
      localStorage.setItem(
        LOCALSTORAGE_KEY,
        JSON.stringify(this.state.contacts)
      );
    }
  }
  addContact = newContact => {
    const normalizedFind = newContact.name.toLowerCase();
    const findName = this.state.contacts.find(
      contact => contact.name.toLowerCase() === normalizedFind
    );
    if (findName) {
      return alert(`${newContact.name} is already in contacts.`);
    }
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };
  deleteContact = ({ id }) => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };
  changeFilter = event => {
    this.setState({ filter: event.target.value });
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    const visibleContacts = this.getVisibleContacts();
    const { contacts, filter } = this.state;
    return (
      <div className={styles.phonebook}>
        <h1 className={styles.title}>Phonebook</h1>
        <ContactForm contacts={contacts} onAddContact={this.addContact} />
        <FilterContact value={filter} onChange={this.changeFilter} />
        <h2 className={styles.title}>Contacts</h2>
        <ContactsList
          contacts={visibleContacts}
          onDeleteContact={this.deleteContact}
        />
      </div>
    );
  }
}
