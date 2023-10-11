import { Component } from 'react';
import { nanoid } from 'nanoid';
import css from './ContactForm.module.css';

export class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  idName = nanoid();
  idNumber = nanoid();

  setData = event => {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  addContact = event => {
    event.preventDefault();
    const { name, number } = this.state;
    const newContact = {
      name,
      number,
      id: nanoid(),
    };
    this.props.addContact(newContact);
  };

  render() {
    return (
      <>
        <form className={css.contactForm} onSubmit={this.addContact}>
          <label htmlFor={this.idName}>Name</label>
          <input
            type="text"
            id={this.idName}
            name="name"
            onChange={this.setData}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            value={this.state.name}
            required
          />
          <label htmlFor={this.idNumber}>Number</label>
          <input
            id={this.idNumber}
            type="tel"
            name="number"
            onChange={this.setData}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            value={this.state.number}
            required
          />
          <button type="submit" className={css.btn}>
            Add contact
          </button>
        </form>
      </>
    );
  }
}

export default ContactForm;
