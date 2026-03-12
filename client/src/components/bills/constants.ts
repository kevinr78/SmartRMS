const OPTIONS = [
  { value: "all", text: "All Status", showInForm: false },
  { value: "Unpaid", text: "Unpaid", showInForm: true },
  { value: "Partially Paid", text: "Partially Paid", showInForm: true },
  { value: "Fully Paid", text: "Fully Paid", showInForm: true },
];
const CATEGORIES = [
  { value: "All", text: "All Categories", showInForm: false },
  { value: "Electricity", text: "Electricity", showInForm: true },
  { value: "Water", text: "Water", showInForm: true },
  { value: "Internet", text: "Internet", showInForm: true },
  { value: "Rent", text: "Rent", showInForm: true },
  { value: "Gas", text: "Gas", showInForm: true },
  { value: "Other", text: "Other", showInForm: true },
];
const FREQUENCY = [
  { value: "once", text: "Once", showInForm: true },
  { value: "daily", text: "Daily", showInForm: true },
  { value: "weekly", text: "Weekly", showInForm: true },
  { value: "bi-weekly", text: "Bi-Weekly", showInForm: true },
  { value: "monthly", text: "Monthly", showInForm: true },
];

export { CATEGORIES, OPTIONS, FREQUENCY };
