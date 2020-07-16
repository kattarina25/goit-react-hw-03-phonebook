import React, { Component } from 'react';
import Container from './components/Container';
import Section from './components/Section';
import ContactsForm from './components/ContactForm';
import Filter from './components/Filter';
import ContactList from './components/ContactList';
import { v4 as uuidv4 } from 'uuid';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    if (contacts) this.setState({ contacts: JSON.parse(contacts) });
  }

  componentDidUpdate(prevState) {
    const { contacts } = this.state;
    if (contacts !== prevState)
      localStorage.setItem('contacts', JSON.stringify(contacts));
  }

  formSubmitHandler = contact => {
    this.setState(prevState => ({
      contacts: [...prevState.contacts, { id: uuidv4(), ...contact }],
    }));
  };

  getContactsName = () => {
    const { contacts } = this.state;
    return contacts.map(contact => contact.name.toLowerCase());
  };

  getFilteredContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };

  changeFilter = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const { filter, contacts } = this.state;
    return (
      <Container>
        <Section title="Phonebook">
          <ContactsForm
            onSubmit={this.formSubmitHandler}
            isExistContact={this.getContactsName}
          />
        </Section>
        {contacts.length > 0 && (
          <Section title="Contacts">
            <Filter value={filter} onChange={this.changeFilter} />
            <ContactList
              contacts={this.getFilteredContacts()}
              deleteContact={this.deleteContact}
            />
          </Section>
        )}
      </Container>
    );
  }
}

export default App;
