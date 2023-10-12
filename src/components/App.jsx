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

  const visibleContacts = useMemo(() => {
    if (filter !== '') {
      return contacts.filter(contact =>
        contact.name.toLowerCase().includes(normalizeFilter)
      );
    }
  }, [contacts, normalizeFilter, filter]);

  const addContact = newContact => {
    if (contacts?.length) {
      const isAlreadyExist = contacts.find(
        el => el.name.toLocaleLowerCase() === newContact.name.toLowerCase()
      );
      if (isAlreadyExist) return alert('Already Exist');
    }
    setContacts(prev => [newContact, ...prev]);
  };

  const filterContact = filterName => {
    setFilter(filterName);
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
