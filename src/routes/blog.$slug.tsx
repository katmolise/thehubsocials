import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { postBySlug } from "@/data/posts";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = postBySlug(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Post not found — The Hub Social" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    return {
      meta: [
        { title: `${loaderData.post.title} — The Hub Social` },
        { name: "description", content: loaderData.post.excerpt },
        { property: "og:title", content: loaderData.post.title },
        { property: "og:description", content: loaderData.post.excerpt },
        { property: "og:image", content: loaderData.post.image },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/blog/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/blog/${params.slug}` }],
    };
  },
  component: BlogPost,
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-6 py-24 text-center">
      <h1 className="font-display text-3xl font-bold">Post not found</h1>
      <Link to="/blog" className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">
        <ArrowLeft className="size-4" /> Back to blog
      </Link>
    </div>
  ),
});

function BlogPost() {
  const { post } = Route.useLoaderData();

  return (
    <article className="pb-20">
      <div className="mx-auto max-w-3xl px-6 pt-16">
        <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="size-4" /> All posts
        </Link>
        <span className="mt-8 block text-xs font-bold uppercase tracking-widest text-primary">{post.category}</span>
        <h1 className="mt-3 font-display text-4xl font-bold text-balance sm:text-5xl">{post.title}</h1>
        <div className="mt-6 flex items-center gap-4 text-sm text-muted-foreground">
          <span>{post.author}</span>
          <span>·</span>
          <span>{new Date(post.date).toLocaleDateString("en-ZA", { month: "long", day: "numeric", year: "numeric" })}</span>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-5xl px-6">
        <img src={post.image} alt={post.title} className="aspect-[16/9] w-full rounded-[32px] object-cover" />
      </div>

      <div className="mx-auto mt-12 max-w-3xl px-6">
        <p className="text-lg leading-relaxed text-muted-foreground">{post.excerpt}</p>
        <p className="mt-6 text-base leading-relaxed">{post.body}</p>
        <p className="mt-6 text-base leading-relaxed">
          More stories, guides and recaps are coming soon. In the meantime, join us at one of our upcoming events —
          the best writing about community always starts with actually showing up.
        </p>
      </div>
    </article>
  );
}
