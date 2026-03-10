export type PackageTerm =
  | "Aylık plan"
  | "Yıllık plan"
  | "3 yıllık paket"
  | "Tek seferlik paket"
  | "Tek seferlik başlangıç paketi";

export type SelectedPackageState = {
  companySlug: string;
  label: string;
  price: number | null;
  priceLabel: string;
  source: string | null;
  term: string | null;
  detailLabel: string;
  description: string | null;
  features: string[];
};

export type WizardStepId = "package" | "fullName" | "phone" | "companyName" | "activityArea";

export type WizardAnswers = {
  package: {
    companySlug: string;
    label: string;
    locked: boolean;
    confirmed: boolean;
  };
  fullName: {
    value: string;
  };
  phone: {
    value: string;
  };
  companyName: {
    value: string;
  };
  activityArea: {
    value: string;
  };
};

export type WizardState = {
  currentStep: number;
  completedStep: number;
  status: "not_started" | "in_progress" | "completed";
  answers: WizardAnswers;
};

export type PaymentInvoice = {
  companyTitle: string;
  taxNumber: string;
  address: string;
  city: string;
};

export type PaymentState = {
  status: "pending" | "paid";
  currentStep: number;
  cardHolderName: string;
  cardLast4: string;
  invoice: PaymentInvoice;
  paidAt: string | null;
};

export type PanelUser = {
  id: string;
  email: string;
  password: string;
  fullName: string;
  phone: string;
  selectedPackage: SelectedPackageState | null;
  wizard: WizardState;
  payment: PaymentState;
  eTugraStatus: "idle" | "triggered";
  createdAt: string;
  updatedAt: string;
};

export type PanelSessionUser = Omit<PanelUser, "password">;

export type PanelStoreShape = {
  users: PanelUser[];
};
