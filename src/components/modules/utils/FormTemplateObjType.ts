type FormTemplateObj =
  | {
      title: string;
    }
  | {
      title: string;
      isImportant: boolean;
      dueDate: string | Date;
    };

export default FormTemplateObj;
