import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import css from './App.module.css';
import { useEffect, useState, useMemo } from 'react';

export const App = () => {
  const [contacts, setContacts] =
    useState(() => JSON.parse(localStorage.getItem('contacts'))) ?? [];
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const normalizeFilter = filter.toLowerCase();

  const filterContact = filterName => {
    setFilter(filterName);
  };

  const visibleContacts = useMemo(() => {
    if (filter !== '') {
      return contacts.filter(contact =>
        contact.name.toLowerCase().includes(normalizeFilter)
      );
    }
  }, [contacts, normalizeFilter, filter]);

  const addContact = newContact => {
    if (contacts.filter(({ name }) => name === newContact.name).length) {
      alert(`${newContact.name} is already in contacts.`);
      return;
    }
    setContacts(prev => [newContact, ...prev]);
  };

  const deleteContact = id => {
    const updateContacts = contacts.filter(contact => contact.id !== id);
    setContacts(updateContacts);
  };

  return (
    <>
      <div className={css.container}>
        <h1>Phonebook</h1>
        <ContactForm addContactFn={addContact} />
        <h2>Contacts</h2>
        <Filter filter={filterContact} />{' '}
        <ContactList
          contacts={visibleContacts || contacts}
          deleteContact={deleteContact}
        />
      </div>
    </>
  );
};
