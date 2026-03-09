import { redirect } from "next/navigation";

type LoginPageProps = {
  searchParams?: Promise<{
    company?: string;
    price?: string;
  }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = searchParams ? await searchParams : undefined;
  const query = new URLSearchParams();

  if (params?.company) {
    query.set("company", params.company);
  }

  if (params?.price) {
    query.set("price", params.price);
  }

  const suffix = query.toString() ? `?${query.toString()}` : "";
  redirect(`/giris${suffix}`);
}
