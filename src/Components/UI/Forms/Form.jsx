import { useForm, FormProvider } from "react-hook-form";
import { useEffect } from "react";

const Form = ({ children, submitHandler, defaultValues, resolver }) => {
  const formConfig = {};

  if (!!defaultValues) formConfig["defaultValues"] = defaultValues;
  if (!!resolver) formConfig["resolver"] = resolver;

  const methods = useForm(formConfig);

  const { handleSubmit, reset } = methods;

  const onSubmit = (data) => {
    submitHandler(data);
    reset({
      recipeName:"",
      recipeImage:"",
      embeddedVideoCode:"",
      country:"",
      category:"",
      recipeDetails:"",
      comment:""
    });
  };
  useEffect(() => reset(defaultValues), [defaultValues, reset, methods]);
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};

export default Form;
