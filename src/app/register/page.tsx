import { redirect } from "next/navigation";

type RegisterRedirectProps = {
  searchParams?: Promise<{
    mode?: string;
    company?: string;
    price?: string;
  }>;
};

export default async function RegisterRedirectPage({ searchParams }: RegisterRedirectProps) {
  const params = searchParams ? await searchParams : undefined;
  const query = new URLSearchParams();

  if (params?.mode) {
    query.set("mode", params.mode);
  }

  if (params?.company) {
    query.set("company", params.company);
  }

  if (params?.price) {
    query.set("price", params.price);
  }

  const suffix = query.toString() ? `?${query.toString()}` : "";
  redirect(`/kayit-ol${suffix}`);
}
