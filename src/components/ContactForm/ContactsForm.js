import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './ContactsForm.module.css';

class ContactsForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    isExistContact: PropTypes.func.isRequired,
  };

  state = {
    name: '',
    number: '',
  };

  handleChange = event => {
    const { name, value } = event.currentTarget;
    this.setState({ [name]: value });
  };

  validateContact() {
    const { name } = this.state;
    const { isExistContact } = this.props;
    return isExistContact().includes(name.toLowerCase());
  }

  handleSubmit = event => {
    event.preventDefault();
    if (this.validateContact()) {
      alert(`${this.state.name} is already in contacts`);
    } else {
      this.props.onSubmit({ ...this.state });
    }
    this.reset();
  };

  reset() {
    this.setState({ name: '', number: '' });
  }

  render() {
    const { name, number } = this.state;
    return (
      <form onSubmit={this.handleSubmit} className={styles.ContactsForm}>
        <label>
          Name
          <br />
          <input
            className={styles.contactName}
            type="text"
            name="name"
            value={name}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <label>
          Phone number
          <br />
          <input
            type="tel"
            name="number"
            value={number}
            pattern="[0-9]{7}"
            onChange={this.handleChange}
            required
          />
        </label>
        <br />
        <button type="submit">Add contact</button>
      </form>
    );
  }
}

export default ContactsForm;
