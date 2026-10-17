import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AppLayout } from "./layouts/AppLayout";
import { PostComposer } from "./components/PostComposer";
import { PostCard } from "./components/PostCard";
import { useFeedStore } from "./store/useFeedStore";
import "./layouts/AppLayout.css";

export default function App() {
  const { posts, trending, addPost, toggleLike, toggleRepost, reportPost } = useFeedStore();
  const [sort, setSort] = useState("Top");

  return (
    <AppLayout trending={trending}>

      {/* Composer card */}
      <PostComposer onSubmit={addPost} />

      {/* Sort row — LinkedIn-style */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: "4px 0",
        gap: 4,
        fontSize: 13,
        color: "var(--text-2)"
      }}>
        Sort by:
        <button
          style={{
            display: "flex", alignItems: "center", gap: 3,
            fontWeight: 700, fontSize: 13, color: "var(--text-1)"
          }}
          onClick={() => setSort(s => s === "Top" ? "Recent" : "Top")}
        >
          {sort} <ChevronDown size={14} />
        </button>
      </div>

      {/* Feed — each post is its own card with gap */}
      <section
        aria-label="Workplace experience feed"
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        {posts.length === 0 ? (
          <div style={{
            background: "var(--bg-card)",
            borderRadius: "10px",
            padding: "48px 24px",
            textAlign: "center",
            color: "var(--text-2)",
            fontSize: "15px",
            boxShadow: "var(--card-shadow)"
          }}>
            No experiences yet. Share the first one above! 👆
          </div>
        ) : (
          posts.map((post, i) => (
            <PostCard
              key={post.id}
              post={post}
              onLike={toggleLike}
              onRepost={toggleRepost}
              onReport={reportPost}
              isNew={i === 0}
            />
          ))
        )}
      </section>
    </AppLayout>
  );
}
