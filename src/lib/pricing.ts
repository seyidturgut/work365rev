export type SelectedPackageSummary = {
  company: string;
  priceLabel: string;
};

export function formatTl(value: number) {
  return `${new Intl.NumberFormat("tr-TR").format(value)} TL`;
}

export function toCompanyQueryValue(company: string) {
  return company
    .toLocaleLowerCase("tr-TR")
    .replaceAll("ı", "i")
    .replaceAll("ş", "s")
    .replaceAll("ğ", "g")
    .replaceAll("ü", "u")
    .replaceAll("ö", "o")
    .replaceAll("ç", "c")
    .replaceAll(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function toCompanyLabel(queryValue?: string | null) {
  if (!queryValue) {
    return null;
  }

  const normalized = queryValue.trim().toLocaleLowerCase("tr-TR");

  switch (normalized) {
    case "sahis-sirketi":
      return "Şahıs Şirketi";
    case "limited-sirketi":
      return "Limited Şirketi";
    case "anonim-sirketi":
      return "Anonim Şirketi";
    case "bilanco-sirketi":
      return "Bilanço Şirketi";
    default:
      return null;
  }
}

export function getSelectedPackageSummary(
  company?: string | null,
  price?: string | null
): SelectedPackageSummary | null {
  const companyLabel = toCompanyLabel(company);
  const numericPrice = Number(price);

  if (!companyLabel || !Number.isFinite(numericPrice) || numericPrice <= 0) {
    return null;
  }

  return {
    company: companyLabel,
    priceLabel: formatTl(numericPrice),
  };
}

export function parseTlString(value: string) {
  const numericValue = Number(value.replace(/[^\d]/g, ""));
  return Number.isFinite(numericValue) ? numericValue : 0;
}

export function buildPackageSignupHref(company: string, price: number | string) {
  const numericPrice = typeof price === "number" ? price : parseTlString(price);
  const query = new URLSearchParams({
    company: toCompanyQueryValue(company),
    price: String(numericPrice),
  });

  return `/kayit-ol?${query.toString()}`;
}
