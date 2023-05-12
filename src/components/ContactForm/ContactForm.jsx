import { Formik, Field, Form, ErrorMessage } from 'formik';
import styles from './ContactForm.module.css';
import { nanoid } from 'nanoid';
import * as Yup from 'yup';

const ContactSchema = Yup.object().shape({
  name: Yup.string().min(2, 'Too Short!').required('Required'),
  number: Yup.number().positive('> 0 Please!').required('Required'),
});

function ContactForm({ onAddContact }) {
  return (
    <Formik
      initialValues={{
        name: '',
        number: '',
      }}
      validationSchema={ContactSchema}
      onSubmit={(values, actions) => {
        onAddContact({ ...values, id: nanoid() });
        actions.resetForm();
      }}
    >
      <Form className={styles.form}>
        <label className={styles.label}>
          Name
          <Field
            className={styles.field}
            name="name"
            placeholder="Name"
            type="text"
          />
          <ErrorMessage name="name" />
        </label>
        <label className={styles.label}>
          Number
          <Field
            className={styles.field}
            name="number"
            placeholder="Number"
            type="tel"
          />
          <ErrorMessage name="number" />
        </label>
        <button type="submit" className={styles.btn}>
          Add contact
        </button>
      </Form>
    </Formik>
  );
}

export default ContactForm;
