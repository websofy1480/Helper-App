// lib/blog.ts
export async function getBlogBySlug(slug: string) {
  // Example: fetch from API or DB
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/blog/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Blog not found");
  }

  return res.json();
}
