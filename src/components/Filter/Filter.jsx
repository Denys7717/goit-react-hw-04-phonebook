import { nanoid } from 'nanoid';
import css from './Filter.module.css';

const Filter = ({ filter }) => {
  const idFilter = nanoid();
  const findContact = event => {
    filter(event.target.value);
  };

  return (
    <div className={css.filterForm}>
      <label htmlFor={idFilter}>Find contacts by name</label>
      <input type="text" onChange={findContact} id={idFilter} />
    </div>
  );
};

export default Filter;
