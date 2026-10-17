/**
 * useFeedStore — lightweight in-memory state (no Redux needed for prototype).
 * In production this would be replaced with React Query + ASP.NET Core API calls.
 */
import { useState, useCallback } from "react";

let _nextId = 100;
function uid() { return ++_nextId; }

function generateAlias() {
  const titles = ["Senior Eng", "Product Manager", "Designer", "Data Analyst", "DevOps Lead", "HR Specialist", "QA Engineer"];
  const companies = ["TechCorp", "MegaBank", "StartupXYZ", "ConsultingInc", "RetailGiant", "HealthFirst", "GovAgency"];
  return `${titles[Math.floor(Math.random() * titles.length)]} @ ${companies[Math.floor(Math.random() * companies.length)]}`;
}

const SEED_POSTS = [
  {
    id: 1,
    alias: "Senior Eng @ TechCorp",
    isAnonymous: true,
    avatar: null,
    content: "Just got told our 'unlimited PTO' policy means nothing because every request gets rejected. Three years here and I've taken 4 days off. Anyone else experience this gaslighting at tech companies? 🙃",
    company: "TechCorp",
    topic: "WorkLifeBalance",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    likes: 247,
    reposts: 89,
    comments: 63,
    liked: false,
    reposted: false,
    reports: 0,
    contextNotes: ["This is a commonly reported pattern at several tech companies."],
  },
  {
    id: 2,
    alias: "Product Manager @ StartupXYZ",
    isAnonymous: true,
    avatar: null,
    content: "My manager just took credit for my entire product roadmap in a board presentation. When I raised it, I was told to 'be a team player'. This is the third time this year. 🚩",
    company: "StartupXYZ",
    topic: "CreditStealing",
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    likes: 512,
    reposts: 203,
    comments: 141,
    liked: false,
    reposted: false,
    reports: 0,
    contextNotes: [],
  },
  {
    id: 3,
    alias: "Designer @ MegaBank",
    isAnonymous: false,
    avatar: null,
    content: "Interviewed at 6 companies this quarter. Every single one had 'competitive salary'. After offers: 3 were below my current underpaid role. Transparency in hiring should be mandatory. #SalaryTransparency",
    company: "MegaBank",
    topic: "SalaryTransparency",
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    likes: 1893,
    reposts: 742,
    comments: 288,
    liked: false,
    reposted: false,
    reports: 0,
    contextNotes: ["Several US states now require salary range disclosure in job postings."],
  },
  {
    id: 4,
    alias: "HR Specialist @ ConsultingInc",
    isAnonymous: true,
    avatar: null,
    content: "Fun fact: that 'culture fit' rejection you got? Often code for 'you asked about WFH policy and made us uncomfortable'. Push for specifics whenever you get vague rejections.",
    company: "ConsultingInc",
    topic: "HiringBias",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    likes: 3241,
    reposts: 1102,
    comments: 445,
    liked: false,
    reposted: false,
    reports: 0,
    contextNotes: [],
  },
];

const SEED_TRENDING = [
  { tag: "UnlimitedPTO", posts: 14200 },
  { tag: "SalaryTransparency", posts: 9870 },
  { tag: "CreditStealing", posts: 7331 },
  { tag: "QuietFiring", posts: 6120 },
  { tag: "WorkLifeBalance", posts: 5880 },
  { tag: "HiringBias", posts: 4990 },
];

export function useFeedStore() {
  const [posts, setPosts] = useState(SEED_POSTS);
  const [trending] = useState(SEED_TRENDING);

  const addPost = useCallback(({ content, company, topic, isAnonymous, displayName }) => {
    const alias = isAnonymous ? generateAlias() : (displayName || "You");
    setPosts(prev => [{
      id: uid(),
      alias,
      isAnonymous,
      avatar: null,
      content,
      company: company || "",
      topic: topic || "",
      timestamp: new Date().toISOString(),
      likes: 0,
      reposts: 0,
      comments: 0,
      liked: false,
      reposted: false,
      reports: 0,
      contextNotes: [],
    }, ...prev]);
  }, []);

  const toggleLike = useCallback((id) => {
    setPosts(prev => prev.map(p =>
      p.id === id
        ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 }
        : p
    ));
  }, []);

  const toggleRepost = useCallback((id) => {
    setPosts(prev => prev.map(p =>
      p.id === id
        ? { ...p, reposted: !p.reposted, reposts: p.reposted ? p.reposts - 1 : p.reposts + 1 }
        : p
    ));
  }, []);

  const reportPost = useCallback((id) => {
    setPosts(prev => prev.map(p =>
      p.id === id ? { ...p, reports: p.reports + 1 } : p
    ));
  }, []);

  return { posts, trending, addPost, toggleLike, toggleRepost, reportPost };
}
