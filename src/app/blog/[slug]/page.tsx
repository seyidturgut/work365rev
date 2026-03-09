import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import {
  BLOG_POSTS,
  CATEGORIES,
  getPostBySlug,
  getRelatedPosts,
  getCategoryById,
} from "@/lib/blog-data";

/* ─── Static Generation ─── */

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const category = getCategoryById(post.categoryId);

  return {
    title: `${post.title} | Work365 Blog`,
    description: post.excerpt,
    keywords: [post.title, category?.name ?? "", "Work365", "girişimcilik", "şirket kurma"],
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      images: [
        {
          url: post.imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      siteName: "Work365 Blog",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.imageUrl],
    },
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
  };
}

/* ─── Page Component ─── */

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const category = getCategoryById(post.categoryId);
  const relatedPosts = getRelatedPosts(post, 3);

  return (
    <main className="bg-[#FAFBFC] pt-[92px]">
      <Header />

      {/* ─── BREADCRUMB ─── */}
      <Breadcrumb
        items={[
          { label: "Blog", href: "/blog" },
          ...(category ? [{ label: category.name }] : []),
          { label: post.title },
        ]}
      />

      {/* ─── ARTICLE HEADER ─── */}
      <article className="px-6 pt-12 pb-16">
        <div className="mx-auto max-w-[800px]">
          {/* Category Badge */}
          {category && (
            <div
              className="mb-6 inline-flex items-center rounded-full px-4 py-1.5 text-[12px] font-bold uppercase tracking-[0.08em]"
              style={{
                backgroundColor: category.bgColor,
                color: category.color,
              }}
            >
              {category.name}
            </div>
          )}

          {/* Title */}
          <h1 className="text-[32px] font-extrabold leading-[1.1] tracking-[-0.03em] text-[#0F172A] md:text-[44px]">
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="mt-5 text-[18px] leading-[1.8] text-[#475569]">
            {post.excerpt}
          </p>

          {/* Meta Row */}
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-b border-gray-100 pb-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                <User className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[14px] font-bold text-[#0F172A]">
                  {post.author}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-[13px] text-[#64748B]">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {post.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {post.readTime}
              </span>
            </div>
          </div>

          {/* Cover Image */}
          <div className="mt-8 aspect-[16/9] w-full overflow-hidden rounded-[20px]">
            <img
              src={post.imageUrl}
              alt={post.title}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Article Content */}
          <div
            className="prose-blog mt-10"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Back Button */}
          <div className="mt-12 border-t border-gray-100 pt-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-6 py-3 text-[14px] font-bold text-[#0F172A] transition-all hover:border-black/20 hover:shadow-md"
            >
              <ArrowLeft className="h-4 w-4" />
              Tüm Yazılara Dön
            </Link>
          </div>
        </div>
      </article>

      {/* ─── RELATED POSTS ─── */}
      {relatedPosts.length > 0 && (
        <section className="border-t border-black/5 bg-white px-6 py-14">
          <div className="mx-auto max-w-[1230px]">
            <h2 className="text-[24px] font-bold tracking-[-0.02em] text-[#0F172A]">
              İlgili Yazılar
            </h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((related) => {
                const relCat = CATEGORIES.find(
                  (c) => c.id === related.categoryId
                );
                return (
                  <Link
                    key={related.id}
                    href={`/blog/${related.slug}`}
                    className="group flex flex-col rounded-[20px] bg-[#FAFBFC] ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-t-[20px]">
                      <img
                        src={related.imageUrl}
                        alt={related.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {relCat && (
                        <div
                          className="absolute left-4 top-4 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.06em]"
                          style={{
                            backgroundColor: `${relCat.bgColor}e6`,
                            color: relCat.color,
                          }}
                        >
                          {relCat.name}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="text-[16px] font-bold leading-snug tracking-[-0.01em] text-[#0F172A] group-hover:text-[#1B98D5] transition-colors line-clamp-2">
                        {related.title}
                      </h3>
                      <p className="mt-2 text-[13px] leading-relaxed text-[#64748B] line-clamp-2">
                        {related.excerpt}
                      </p>
                      <div className="mt-4 flex items-center gap-3 text-[12px] text-[#64748B]">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {related.date}
                        </span>
                        <span>{related.readTime}</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ─── CTA ─── */}
      <section className="px-6 py-14">
        <div
          className="mx-auto max-w-[1230px] overflow-hidden rounded-[32px] px-8 py-12 text-white md:px-12"
          style={{
            background: "linear-gradient(135deg, #0F172A 0%, #1B98D5 100%)",
          }}
        >
          <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-[#93C5FD]">
            HEMEN BAŞLAYIN
          </p>
          <h2 className="mt-4 text-[28px] font-extrabold tracking-[-0.03em] text-white md:text-[38px]">
            Şirketinizi Work365 ile kurun.
          </h2>
          <p className="mt-4 max-w-[560px] text-[16px] leading-relaxed text-white/70">
            Şirket kurulumu, e-İmza, KEP ve dijital altyapınızı tek pakette
            alın. Başlangıç paketlerimizi inceleyin.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/fiyatlandirma"
              className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-[14px] font-bold text-[#0F172A] transition-all hover:scale-[1.03] hover:shadow-lg"
            >
              Paketleri İncele
            </Link>
            <Link
              href="/sirket-kur"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-3.5 text-[14px] font-bold text-white transition-all hover:bg-white/20"
            >
              Şirket Kur
            </Link>
          </div>
        </div>
      </section>

      {/* ─── ARTICLE PROSE STYLES ─── */}
      <style dangerouslySetInnerHTML={{__html: `
        .prose-blog p {
          margin-top: 1.25rem;
          font-size: 17px;
          line-height: 1.85;
          color: #334155;
        }
        .prose-blog p:first-child {
          margin-top: 0;
        }
        .prose-blog h2 {
          margin-top: 2.5rem;
          margin-bottom: 0.75rem;
          font-size: 24px;
          font-weight: 800;
          letter-spacing: -0.02em;
          color: #0F172A;
        }
        .prose-blog h3 {
          margin-top: 1.75rem;
          margin-bottom: 0.5rem;
          font-size: 18px;
          font-weight: 700;
          color: #0F172A;
        }
        .prose-blog ul, .prose-blog ol {
          margin-top: 1rem;
          margin-bottom: 1rem;
          padding-left: 1.5rem;
        }
        .prose-blog ul li {
          list-style-type: disc;
          margin-bottom: 0.5rem;
          font-size: 16px;
          line-height: 1.7;
          color: #334155;
        }
        .prose-blog ol li {
          list-style-type: decimal;
          margin-bottom: 0.5rem;
          font-size: 16px;
          line-height: 1.7;
          color: #334155;
        }
        .prose-blog strong {
          font-weight: 700;
          color: #0F172A;
        }
      `}} />

      <Footer />
    </main>
  );
}
