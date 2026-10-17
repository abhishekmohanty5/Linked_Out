import { useState } from "react";
import {
  ThumbsUp, MessageSquare, Repeat2, Send,
  MoreHorizontal, EyeOff, Globe, CheckCircle2, Plus
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import "./PostCard.css";

function formatCount(n) {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return n > 0 ? String(n) : "0";
}

export function PostCard({ post, onLike, onRepost, onReport, isNew }) {
  const [expanded, setExpanded]   = useState(false);
  const [following, setFollowing] = useState(false);
  const [liked, setLiked]         = useState(post.liked);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [reposted, setReposted]   = useState(post.reposted);

  const timeAgo = formatDistanceToNow(new Date(post.timestamp), { addSuffix: true });
  const isLong  = post.content.length > 220;

  function handleLike() {
    const next = !liked;
    setLiked(next);
    setLikeCount(c => next ? c + 1 : c - 1);
    onLike(post.id);
  }

  function handleRepost() {
    setReposted(v => !v);
    onRepost(post.id);
  }

  return (
    <article className={`post-card ${isNew ? "animate-in" : ""}`}>

      {/* ── Header ── */}
      <div className="post-body">
        <div className="post-header">
          {/* Avatar */}
          <div className={`post-avatar ${post.isAnonymous ? "anon" : ""}`}>
            {post.isAnonymous ? "👤" : "🧑"}
          </div>

          {/* Meta */}
          <div className="post-meta">
            <div className="post-name-row">
              {/* Anonymous posts: show "Anonymous" as name, not the alias */}
              <span className="post-name">
                {post.isAnonymous ? "Anonymous" : post.alias}
              </span>
              {post.isAnonymous && (
                <span className="anon-badge">
                  <EyeOff size={9} /> Identity hidden
                </span>
              )}
            </div>
            <div className="post-subtitle">
              {post.isAnonymous
                ? /* Show alias only as a vague role hint, not a real name */
                  `${post.alias}${post.topic ? " · #" + post.topic : ""}`
                : [post.company, post.topic].filter(Boolean).join(" · ")
              }
            </div>
            <div className="post-time-row">
              <time dateTime={post.timestamp}>{timeAgo}</time>
              <span>·</span>
              <Globe size={12} />
            </div>
          </div>

          {/* Follow + More */}
          <button
            className={`follow-btn ${following ? "following" : ""}`}
            onClick={() => setFollowing(v => !v)}
          >
            {following ? <CheckCircle2 size={13} /> : <Plus size={13} />}
            {following ? "Following" : "Follow"}
          </button>
          <button className="post-more-btn" title="More options">
            <MoreHorizontal size={18} />
          </button>
        </div>

        {/* Tags */}
        {(post.company || post.topic) && (
          <div className="post-tags">
            {post.company && <span className="post-tag company">@{post.company}</span>}
            {post.topic   && <span className="post-tag topic">#{post.topic}</span>}
          </div>
        )}

        {/* Content */}
        <p className={`post-content ${isLong && !expanded ? "clamped" : ""}`}>
          {post.content}
        </p>
        {isLong && !expanded && (
          <button className="post-more-link" onClick={() => setExpanded(true)}>
            …more
          </button>
        )}

        {/* Reaction count row */}
        <div className="post-reactions-row">
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <span className="reaction-emojis">👍❤️💡</span>
            <span className="reaction-count">{formatCount(likeCount)}</span>
          </div>
          <span className="comment-count-link">
            {formatCount(post.comments)} comments · {formatCount(post.reposts)} reposts
          </span>
        </div>
      </div>

      {/* ── Action bar ── */}
      <div className="post-actions">
        <button
          className={`action-btn ${liked ? "liked-red" : ""}`}
          onClick={handleLike}
          title="Like"
        >
          <ThumbsUp size={18} fill={liked ? "currentColor" : "none"} />
          Like
        </button>

        <button className="action-btn" title="Comment">
          <MessageSquare size={18} />
          Comment
        </button>

        <button
          className={`action-btn ${reposted ? "reposted" : ""}`}
          onClick={handleRepost}
          title="Repost"
        >
          <Repeat2 size={18} />
          Repost
        </button>

        <button className="action-btn" title="Share">
          <Send size={18} />
          Share
        </button>
      </div>

      {/* ── Context notes as nested comment thread ── */}
      {post.contextNotes?.length > 0 && (
        <div className="post-comments-section">
          {post.contextNotes.map((note, i) => (
            <div key={i} className="nested-comment">
              <div className="nested-avatar">📋</div>
              <div className="nested-body">
                <div className="nested-header">
                  <div>
                    <div className="nested-name">
                      Community Context
                      <span className="verified-icon"><CheckCircle2 size={13} /></span>
                    </div>
                    <div className="nested-subtitle">Verified moderator note</div>
                  </div>
                  <span className="nested-time">now</span>
                </div>
                <p className="nested-content">{note}</p>
                <div className="nested-actions">
                  <button className="nested-action-btn"><ThumbsUp size={13} /> Like</button>
                  <button className="nested-action-btn"><MessageSquare size={13} /> Reply</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── See more comments ── */}
      {post.comments > 0 && (
        <div className="see-more-comments">
          <div className="see-more-icon">↙</div>
          See {formatCount(post.comments)} comments
        </div>
      )}
    </article>
  );
}
