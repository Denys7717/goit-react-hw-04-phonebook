import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import css from './App.module.css';
import { useEffect, useState } from 'react';

export const App = () => {
  const [contacts, setContacts] =
    useState(() => JSON.parse(localStorage.getItem('contacts'))) ?? [];
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts, contacts.length]);

  const addContact = newContact => {
    const isAlreadyExist = contacts.find(
      el => el.name.toLocaleLowerCase() === newContact.name.toLowerCase()
    );
    if (isAlreadyExist) return alert('Already Exist');
    setContacts(prev => [newContact, ...prev]);
  };

  const filterContact = filterName => setFilter(filterName);

  const deleteContact = id => {
    const updateContacts = contacts.filter(contact => contact.id !== id);
    setContacts(updateContacts);
  };

  const normalizeFilter = filter.toLowerCase();
  const visibleContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizeFilter)
  );
  return (
    <>
      <div className={css.container}>
        <h1>Phonebook</h1>
        <ContactForm addContactFn={addContact} />
        <h2>Contacts</h2>
        <Filter filter={filterContact} />
        <ContactList contacts={visibleContacts} deleteContact={deleteContact} />
      </div>
    </>
  );
};
