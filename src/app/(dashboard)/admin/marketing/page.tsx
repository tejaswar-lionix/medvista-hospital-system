"use client";

import { useState } from "react";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Eye,
  Tag,
  Calendar,
  User,
  FileText,
  Image,
  Filter,
  MoreVertical,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";

const initialPosts = [
  {
    id: 1,
    title: "Understanding Heart Disease: Prevention and Treatment",
    excerpt: "Heart disease remains the leading cause of death worldwide. Learn about prevention strategies and modern treatment options.",
    author: "Dr. Sarah Mitchell",
    category: "Cardiology",
    status: "published",
    date: "2024-01-15",
    views: 2450,
    image: "/images/heart-disease.jpg",
    tags: ["heart health", "prevention", "cardiology"],
  },
  {
    id: 2,
    title: "Managing Diabetes: A Comprehensive Guide",
    excerpt: "Discover effective strategies for managing diabetes through diet, exercise, and medication.",
    author: "Dr. Emily Chen",
    category: "Endocrinology",
    status: "published",
    date: "2024-01-12",
    views: 1890,
    image: "/images/diabetes.jpg",
    tags: ["diabetes", "lifestyle", "health tips"],
  },
  {
    id: 3,
    title: "Pediatric Vaccination Schedule 2024",
    excerpt: "Updated vaccination schedule and important information for parents about childhood immunizations.",
    author: "Dr. Lisa Anderson",
    category: "Pediatrics",
    status: "draft",
    date: "2024-01-10",
    views: 0,
    image: "/images/vaccination.jpg",
    tags: ["vaccination", "children", "healthcare"],
  },
  {
    id: 4,
    title: "Mental Health Awareness: Breaking the Stigma",
    excerpt: "Understanding mental health conditions and how to support those affected by them.",
    author: "Dr. James Wilson",
    category: "Psychiatry",
    status: "published",
    date: "2024-01-08",
    views: 3200,
    image: "/images/mental-health.jpg",
    tags: ["mental health", "awareness", "support"],
  },
  {
    id: 5,
    title: "Latest Advances in Cancer Treatment",
    excerpt: "Exploring immunotherapy, targeted therapy, and other innovative approaches to cancer treatment.",
    author: "Dr. Michael Brown",
    category: "Oncology",
    status: "draft",
    date: "2024-01-05",
    views: 0,
    image: "/images/cancer-treatment.jpg",
    tags: ["cancer", "treatment", "medical research"],
  },
];

const categories = [
  { id: 1, name: "Cardiology", count: 12 },
  { id: 2, name: "Pediatrics", count: 8 },
  { id: 3, name: "Oncology", count: 6 },
  { id: 4, name: "Endocrinology", count: 5 },
  { id: 5, name: "Psychiatry", count: 4 },
  { id: 6, name: "General Health", count: 15 },
];

export default function MarketingPage() {
  const [posts, setPosts] = useState(initialPosts);
  const [showEditor, setShowEditor] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [newPost, setNewPost] = useState({
    title: "",
    excerpt: "",
    category: "",
    tags: "",
    content: "",
  });

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "all" || post.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleCreatePost = () => {
    const post = {
      id: posts.length + 1,
      ...newPost,
      author: "Admin",
      status: "draft",
      date: new Date().toISOString().split("T")[0],
      views: 0,
      image: "/images/default.jpg",
      tags: newPost.tags.split(",").map((t) => t.trim()),
    };
    setPosts([post, ...posts]);
    setShowEditor(false);
    setNewPost({ title: "", excerpt: "", category: "", tags: "", content: "" });
  };

  const handleDeletePost = (id) => {
    setPosts(posts.filter((p) => p.id !== id));
  };

  const handlePublishToggle = (id) => {
    setPosts(
      posts.map((p) =>
        p.id === id ? { ...p, status: p.status === "published" ? "draft" : "published" } : p
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Marketing & Blog</h1>
            <p className="text-gray-500 mt-1">Manage blog posts and health articles</p>
          </div>
          <button
            onClick={() => setShowEditor(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus size={18} />
            New Post
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 mb-6">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="Search posts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              {filteredPosts.map((post) => (
                <div key={post.id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                  <div className="flex gap-6">
                    <div className="w-32 h-24 bg-gray-200 rounded-lg flex items-center justify-center">
                      <Image className="text-gray-400" size={24} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{post.title}</h3>
                          <p className="text-gray-500 text-sm mt-1">{post.excerpt}</p>
                        </div>
                        <span
                          className={`px-3 py-1 text-xs font-medium rounded-full ${
                            post.status === "published"
                              ? "bg-green-100 text-green-700"
                              : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          {post.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <User size={14} /> {post.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar size={14} /> {post.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye size={14} /> {post.views} views
                        </span>
                        <span className="flex items-center gap-1">
                          <Tag size={14} /> {post.category}
                        </span>
                      </div>
                      <div className="flex gap-2 mt-3">
                        {post.tags.map((tag) => (
                          <span key={tag} className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => handlePublishToggle(post.id)}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                      >
                        {post.status === "published" ? <XCircle size={18} /> : <CheckCircle size={18} />}
                      </button>
                      <button className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg">
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDeletePost(post.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
              <div className="space-y-3">
                {categories.map((cat) => (
                  <div key={cat.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                    <span className="text-sm text-gray-700">{cat.name}</span>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">{cat.count}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Total Posts</span>
                  <span className="font-medium">{posts.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Published</span>
                  <span className="font-medium text-green-600">
                    {posts.filter((p) => p.status === "published").length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Drafts</span>
                  <span className="font-medium text-amber-600">
                    {posts.filter((p) => p.status === "draft").length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Total Views</span>
                  <span className="font-medium">{posts.reduce((sum, p) => sum + p.views, 0).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {showEditor && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold">Create New Post</h2>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    value={newPost.title}
                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter post title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt</label>
                  <textarea
                    value={newPost.excerpt}
                    onChange={(e) => setNewPost({ ...newPost, excerpt: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    rows={2}
                    placeholder="Brief description"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                      value={newPost.category}
                      onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select category</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.name}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                    <input
                      type="text"
                      value={newPost.tags}
                      onChange={(e) => setNewPost({ ...newPost, tags: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Comma-separated tags"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                  <textarea
                    value={newPost.content}
                    onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    rows={6}
                    placeholder="Write your article content..."
                  />
                </div>
              </div>
              <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
                <button
                  onClick={() => setShowEditor(false)}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreatePost}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Save as Draft
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
