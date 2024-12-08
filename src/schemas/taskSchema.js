import * as Yup from 'yup';

export const addTaskSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  date: Yup.date().required('Date is required'),
});

export const updateTaskSchema = Yup.object().shape({
  title: Yup.string().required('Title is required').optional(),
  description: Yup.string().required('Description is required').optional(),
  date: Yup.date().required('Date is required').optional(),
});



