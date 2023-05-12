import { Formik, Field, Form, ErrorMessage } from 'formik';
import styles from './FilterContact.module.css';
function FilterContact({ filter, onChange }) {
  return (
    <Formik
      initialValues={{
        name: '',
      }}
    >
      <Form className={styles.form}>
        <label className={styles.label}>
          Find Contacts by name
          <Field
            className={styles.field}
            name="name"
            placeholder="Contact Name"
            type="text"
            value={filter}
            onChange={onChange}
          />
          <ErrorMessage name="name" />
        </label>
      </Form>
    </Formik>
  );
}

export default FilterContact;
