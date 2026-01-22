export function getFormData(e: any): Record<string, FormDataEntryValue> {
  const form = new FormData(e.currentTarget);
  const formValue = Object.fromEntries(form);
  return formValue;
}
