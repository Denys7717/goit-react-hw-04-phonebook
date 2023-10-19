import { nanoid } from 'nanoid';
import css from './ContactForm.module.css';
import { useState } from 'react';

const ContactForm = ({ addContactFn }) => {
  const [name, SetName] = useState('');
  const [number, SetNumber] = useState('');

  const idName = nanoid();
  const idNumber = nanoid();

  const setData = event => {
    event.preventDefault();
    const { name, value } = event.target;
    switch (name) {
      case 'name':
        SetName(value);
        break;
      case 'number':
        SetNumber(value);
        break;
      default:
        break;
    }
  };

  const addContact = event => {
    event.preventDefault();

    const newContact = {
      name,
      number,
      id: nanoid(),
    };
    addContactFn(newContact);
  };

  return (
    <>
      <form className={css.contactForm} onSubmit={addContact}>
        <label htmlFor={idName}>Name</label>
        <input
          type="text"
          id={idName}
          name="name"
          onChange={setData}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          value={name}
          required
        />
        <label htmlFor={idNumber}>Number</label>
        <input
          id={idNumber}
          type="tel"
          name="number"
          onChange={setData}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          value={number}
          required
        />
        <button type="submit" className={css.btn}>
          Add contact
        </button>
      </form>
    </>
  );
};

export default ContactForm;
