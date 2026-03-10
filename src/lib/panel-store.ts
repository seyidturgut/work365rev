import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { formatTl, toCompanyLabel, toCompanyQueryValue } from "@/lib/pricing";
import type {
  PanelSessionUser,
  PanelStoreShape,
  PanelUser,
  SelectedPackageState,
  WizardAnswers,
  WizardStepId,
} from "@/lib/panel-types";

const DATA_DIR = path.join(process.cwd(), "src", "data");
const DATA_FILE = path.join(DATA_DIR, "panel-users.json");
const WIZARD_STEP_ORDER: WizardStepId[] = ["package", "fullName", "phone", "companyName", "activityArea"];
const LEGACY_PACKAGE_PRICE_MAP: Record<string, number> = {
  "sahis-sirketi": 4500,
  "limited-sirketi": 7500,
  "anonim-sirketi": 12500,
  "bilanco-sirketi": 6000,
};

type PackageInput = {
  company?: string | null;
  price?: string | number | null;
  label?: string | null;
  source?: string | null;
  term?: string | null;
  description?: string | null;
  features?: string[] | null;
};

type SignupInput = {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  selectedPackage?: PackageInput | null;
};

type LoginInput = {
  email: string;
  password: string;
  selectedPackage?: PackageInput | null;
};

type UpdateStepInput = {
  userId: string;
  stepId: WizardStepId;
  values: Record<string, string | boolean>;
  nextStep?: number;
  markCompleted?: boolean;
};

type PaymentInput = {
  userId: string;
  currentStep?: number;
  cardHolderName?: string;
  cardNumber?: string;
  expiry?: string;
  cvv?: string;
  invoice?: {
    companyTitle?: string;
    taxNumber?: string;
    address?: string;
    city?: string;
  };
  finalize?: boolean;
};

function normalizePrice(value?: string | number | null) {
  const numeric = typeof value === "number" ? value : Number(value);
  return Number.isFinite(numeric) && numeric > 0 ? numeric : null;
}

function getDefaultAnswers(fullName = "", phone = "", selectedPackage: SelectedPackageState | null = null): WizardAnswers {
  return {
    package: {
      companySlug: selectedPackage?.companySlug || "",
      label: selectedPackage?.label || "",
      locked: Boolean(selectedPackage),
      confirmed: false,
    },
    fullName: {
      value: fullName,
    },
    phone: {
      value: phone,
    },
    companyName: {
      value: "",
    },
    activityArea: {
      value: "",
    },
  };
}

export function buildSelectedPackageState(input?: PackageInput | null): SelectedPackageState | null {
  if (!input) {
    return null;
  }

  const companySlug = toCompanyQueryValue(input.company ?? "");
  const label = input.label?.trim() || toCompanyLabel(companySlug) || "";
  const price = normalizePrice(input.price);
  const source = input.source?.trim() || null;
  const term = input.term?.trim() || null;
  const description = input.description?.trim() || null;
  const features = Array.isArray(input.features) ? input.features.filter(Boolean) : [];

  if (!companySlug && !label) {
    return null;
  }

  const detailParts = [term, source].filter(Boolean);

  return {
    companySlug,
    label: label || companySlug,
    price,
    priceLabel: price ? formatTl(price) : "Teklif sırasında netleşecek",
    source,
    term,
    detailLabel: detailParts.length > 0 ? detailParts.join(" · ") : "Seçilen paket",
    description,
    features,
  };
}

function getEffectiveWizardStartStep(user: Pick<PanelUser, "selectedPackage">) {
  return user.selectedPackage ? 1 : 1;
}

function getNextWizardStep(stepId: WizardStepId) {
  const currentIndex = WIZARD_STEP_ORDER.indexOf(stepId);
  return Math.min(currentIndex + 2, WIZARD_STEP_ORDER.length);
}

function normalizeSelectedPackage(raw: unknown): SelectedPackageState | null {
  if (!raw || typeof raw !== "object") {
    return null;
  }

  const value = raw as Record<string, unknown>;
  let price =
    typeof value.price === "number"
      ? value.price
      : typeof value.price === "string"
        ? normalizePrice(value.price)
        : null;
  if ((!price || price <= 0) && typeof value.companySlug === "string") {
    price = LEGACY_PACKAGE_PRICE_MAP[value.companySlug] ?? null;
  }
  const priceLabel =
    typeof value.priceLabel === "string" && value.priceLabel.trim()
      && value.priceLabel !== "Teklif sırasında netleşecek"
      ? value.priceLabel
      : price
        ? formatTl(price)
        : "Teklif sırasında netleşecek";

  return {
    companySlug: String(value.companySlug || ""),
    label: String(value.label || ""),
    price,
    priceLabel,
    source: typeof value.source === "string" ? value.source : null,
    term: typeof value.term === "string" ? value.term : null,
    detailLabel: typeof value.detailLabel === "string" && value.detailLabel ? value.detailLabel : "Seçilen paket",
    description: typeof value.description === "string" ? value.description : null,
    features: Array.isArray(value.features) ? value.features.filter((item): item is string => typeof item === "string") : [],
  };
}

function normalizeUser(raw: Record<string, unknown>): PanelUser {
  const selectedPackage = normalizeSelectedPackage(raw.selectedPackage);
  const wizardRaw = (raw.wizard as Record<string, unknown> | undefined) ?? {};
  const answersRaw =
    (wizardRaw.answers as Record<string, Record<string, string | boolean>> | undefined) ??
    (wizardRaw.steps as Record<string, Record<string, string | boolean>> | undefined) ??
    {};
  const paymentRaw = (raw.payment as Record<string, unknown> | undefined) ?? {};

  const fullName = typeof raw.fullName === "string" ? raw.fullName : "";
  const phone = typeof raw.phone === "string" ? raw.phone : "";

  const answers = getDefaultAnswers(fullName, phone, selectedPackage);
  answers.package = {
    companySlug:
      (answersRaw.package?.companySlug as string | undefined) ||
      selectedPackage?.companySlug ||
      "",
    label: (answersRaw.package?.label as string | undefined) || selectedPackage?.label || "",
    locked:
      typeof answersRaw.package?.locked === "boolean"
        ? (answersRaw.package.locked as boolean)
        : Boolean(selectedPackage),
    confirmed:
      typeof answersRaw.package?.confirmed === "boolean" ? (answersRaw.package.confirmed as boolean) : false,
  };
  answers.fullName = {
    value: (answersRaw.fullName?.value as string | undefined) || (answersRaw.founder?.fullName as string | undefined) || fullName,
  };
  answers.phone = {
    value: (answersRaw.phone?.value as string | undefined) || (answersRaw.founder?.phone as string | undefined) || phone,
  };
  answers.companyName = {
    value:
      (answersRaw.companyName?.value as string | undefined) ||
      (answersRaw.company?.companyName as string | undefined) ||
      "",
  };
  answers.activityArea = {
    value:
      (answersRaw.activityArea?.value as string | undefined) ||
      (answersRaw.company?.activityArea as string | undefined) ||
      "",
  };

  return {
    id: String(raw.id || crypto.randomUUID()),
    email: String(raw.email || ""),
    password: String(raw.password || ""),
    fullName,
    phone,
    selectedPackage,
    wizard: {
      currentStep: Number(wizardRaw.currentStep || getEffectiveWizardStartStep({ selectedPackage })),
      completedStep: Number(wizardRaw.completedStep || 0),
      status:
        wizardRaw.status === "completed" || wizardRaw.status === "in_progress" ? wizardRaw.status : "not_started",
      answers,
    },
    payment: {
      status: paymentRaw.status === "paid" ? "paid" : "pending",
      currentStep: Number(paymentRaw.currentStep || 1),
      cardHolderName: String(paymentRaw.cardHolderName || ""),
      cardLast4: String(paymentRaw.cardLast4 || ""),
      invoice: {
        companyTitle: String((paymentRaw.invoice as Record<string, unknown> | undefined)?.companyTitle || ""),
        taxNumber: String((paymentRaw.invoice as Record<string, unknown> | undefined)?.taxNumber || ""),
        address: String((paymentRaw.invoice as Record<string, unknown> | undefined)?.address || ""),
        city: String((paymentRaw.invoice as Record<string, unknown> | undefined)?.city || ""),
      },
      paidAt: paymentRaw.paidAt ? String(paymentRaw.paidAt) : null,
    },
    eTugraStatus: raw.eTugraStatus === "triggered" ? "triggered" : "idle",
    createdAt: String(raw.createdAt || new Date().toISOString()),
    updatedAt: String(raw.updatedAt || new Date().toISOString()),
  };
}

async function ensureStore() {
  try {
    await readFile(DATA_FILE, "utf8");
  } catch {
    await mkdir(DATA_DIR, { recursive: true });
    await writeFile(DATA_FILE, JSON.stringify({ users: [] }, null, 2), "utf8");
  }
}

async function readStore(): Promise<PanelStoreShape> {
  await ensureStore();
  const content = await readFile(DATA_FILE, "utf8");
  const parsed = JSON.parse(content) as { users?: Record<string, unknown>[] };
  const users = Array.isArray(parsed.users) ? parsed.users.map(normalizeUser) : [];
  const normalizedStore = { users };
  const normalizedContent = JSON.stringify(normalizedStore, null, 2);

  if (normalizedContent !== JSON.stringify(parsed, null, 2)) {
    await writeStore(normalizedStore);
  }

  return normalizedStore;
}

async function writeStore(store: PanelStoreShape) {
  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(DATA_FILE, JSON.stringify(store, null, 2), "utf8");
}

function sanitizeUser(user: PanelUser): PanelSessionUser {
  const { password: _password, ...safeUser } = user;
  return safeUser;
}

function createUserRecord(input: SignupInput): PanelUser {
  const now = new Date().toISOString();
  const selectedPackage = buildSelectedPackageState(input.selectedPackage);

  return {
    id: crypto.randomUUID(),
    email: input.email.trim().toLowerCase(),
    password: input.password,
    fullName: input.fullName.trim(),
    phone: input.phone.trim(),
    selectedPackage,
    wizard: {
      currentStep: 1,
      completedStep: 0,
      status: "not_started",
      answers: getDefaultAnswers(input.fullName.trim(), input.phone.trim(), selectedPackage),
    },
    payment: {
      status: "pending",
      currentStep: 1,
      cardHolderName: "",
      cardLast4: "",
      invoice: {
        companyTitle: "",
        taxNumber: "",
        address: "",
        city: "",
      },
      paidAt: null,
    },
    eTugraStatus: "idle",
    createdAt: now,
    updatedAt: now,
  };
}

export async function createOrGetGoogleDemoUser() {
  const store = await readStore();
  const email = `google-demo-${Date.now()}@work365.local`;
  const user = createUserRecord({
    fullName: "Google Demo Kullanıcısı",
    email,
    phone: "0555 000 00 00",
    password: "google-demo",
  });
  store.users.push(user);
  await writeStore(store);
  return sanitizeUser(user);
}

export async function signupUser(input: SignupInput) {
  const store = await readStore();
  const existingUser = store.users.find((user) => user.email === input.email.trim().toLowerCase());

  if (existingUser) {
    throw new Error("Bu e-posta ile daha önce hesap oluşturulmuş.");
  }

  const user = createUserRecord(input);
  store.users.push(user);
  await writeStore(store);
  return sanitizeUser(user);
}

export async function loginUser(input: LoginInput) {
  const store = await readStore();
  const email = input.email.trim().toLowerCase();
  const user = store.users.find((item) => item.email === email);

  if (!user || user.password !== input.password) {
    throw new Error("E-posta veya şifre hatalı.");
  }

  const selectedPackage = buildSelectedPackageState(input.selectedPackage);
  const now = new Date().toISOString();

  if (selectedPackage) {
    user.selectedPackage = selectedPackage;
    user.wizard.answers.package = {
      companySlug: selectedPackage.companySlug,
      label: selectedPackage.label,
      locked: true,
      confirmed: false,
    };
    user.wizard.currentStep = 1;
  }

  user.updatedAt = now;
  await writeStore(store);
  return sanitizeUser(user);
}

export async function getUserById(userId: string | null | undefined) {
  if (!userId) {
    return null;
  }

  const store = await readStore();
  const user = store.users.find((item) => item.id === userId);
  return user ? sanitizeUser(user) : null;
}

export async function updateOnboardingStep(input: UpdateStepInput) {
  const store = await readStore();
  const user = store.users.find((item) => item.id === input.userId);

  if (!user) {
    throw new Error("Kullanıcı bulunamadı.");
  }

  const stepKey = input.stepId;
  const currentValues = user.wizard.answers[stepKey] as Record<string, string | boolean>;
  (user.wizard.answers as Record<string, Record<string, string | boolean>>)[stepKey] = {
    ...currentValues,
    ...input.values,
  };

  if (stepKey === "package") {
    const nextPackage = buildSelectedPackageState({
      company: user.wizard.answers.package.companySlug || user.selectedPackage?.companySlug,
      label: user.wizard.answers.package.label,
      price: user.selectedPackage?.price,
      source: user.selectedPackage?.source,
      term: user.selectedPackage?.term,
      description: user.selectedPackage?.description,
      features: user.selectedPackage?.features,
    });

    if (nextPackage) {
      user.selectedPackage = nextPackage;
      user.wizard.answers.package.locked = true;
    }
  }

  if (stepKey === "fullName") {
    user.fullName = user.wizard.answers.fullName.value.trim();
  }

  if (stepKey === "phone") {
    user.phone = user.wizard.answers.phone.value.trim();
  }

  user.wizard.status = "in_progress";
  user.wizard.completedStep = Math.max(user.wizard.completedStep, input.nextStep ? input.nextStep - 1 : 0);
  user.wizard.currentStep = input.markCompleted
    ? WIZARD_STEP_ORDER.length
    : Math.min(input.nextStep ?? getNextWizardStep(stepKey), WIZARD_STEP_ORDER.length);

  if (input.markCompleted) {
    user.wizard.completedStep = WIZARD_STEP_ORDER.length;
    user.wizard.status = "completed";
  }

  user.updatedAt = new Date().toISOString();
  await writeStore(store);
  return sanitizeUser(user);
}

export async function savePayment(input: PaymentInput) {
  const store = await readStore();
  const user = store.users.find((item) => item.id === input.userId);

  if (!user) {
    throw new Error("Kullanıcı bulunamadı.");
  }

  if (typeof input.currentStep === "number") {
    user.payment.currentStep = input.currentStep;
  }

  if (input.cardHolderName !== undefined) {
    user.payment.cardHolderName = input.cardHolderName.trim();
  }

  if (input.cardNumber) {
    user.payment.cardLast4 = input.cardNumber.replace(/\s+/g, "").slice(-4);
  }

  if (input.invoice) {
    user.payment.invoice = {
      companyTitle: input.invoice.companyTitle?.trim() || user.payment.invoice.companyTitle,
      taxNumber: input.invoice.taxNumber?.trim() || user.payment.invoice.taxNumber,
      address: input.invoice.address?.trim() || user.payment.invoice.address,
      city: input.invoice.city?.trim() || user.payment.invoice.city,
    };
  }

  if (input.finalize) {
    user.payment.status = "paid";
    user.payment.paidAt = new Date().toISOString();
    user.eTugraStatus = "triggered";
  }

  user.updatedAt = new Date().toISOString();

  await writeStore(store);
  return sanitizeUser(user);
}
