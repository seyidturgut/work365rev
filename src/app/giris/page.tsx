import { redirect } from "next/navigation";

type GirisPageProps = {
  searchParams?: Promise<{
    company?: string;
    price?: string;
  }>;
};

export default async function GirisPage({ searchParams }: GirisPageProps) {
  const params = searchParams ? await searchParams : undefined;
  const query = new URLSearchParams({ mode: "login" });

  if (params?.company) {
    query.set("company", params.company);
  }

  if (params?.price) {
    query.set("price", params.price);
  }

  redirect(`/kayit-ol?${query.toString()}`);
}
