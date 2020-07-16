import React from 'react';
import PropTypes from 'prop-types';
import ContactItem from './ContactItem';
import styles from './ContactList.module.css';

const ContactList = ({ contacts, deleteContact }) => (
  <ul className={styles.contactList}>
    {contacts.map(({ id, ...contact }) => (
      <li key={id}>
        <ContactItem
          contact={contact}
          deleteContact={() => deleteContact(id)}
        />
      </li>
    ))}
  </ul>
);
ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.string.isRequired }),
  ).isRequired,
  deleteContact: PropTypes.func.isRequired,
};

export default ContactList;
