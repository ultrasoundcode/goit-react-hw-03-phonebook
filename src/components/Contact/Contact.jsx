import styles from './Contact.module.css';
import PropTypes from 'prop-types';

function Contact({ contact: { id, name, number }, onDeleteContact }) {
  return (
    <div className={styles.wrapper}>
      <p className={styles.name}>{name}</p>
      <p className={styles.number}>{number}</p>
      <button className={styles.btn} onClick={() => onDeleteContact({ id })}>
        Delete
      </button>
    </div>
  );
}
Contact.propTypes = {
  contact: PropTypes.shape({
    name: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
  }).isRequired,
};

export default Contact;
// Contact
