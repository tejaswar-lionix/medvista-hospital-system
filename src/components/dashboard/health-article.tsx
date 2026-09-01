"use client";

import { Calendar, User, Tag, ArrowRight } from "lucide-react";

interface HealthArticleProps {
  article: {
    id: number;
    title: string;
    excerpt: string;
    author: string;
    date: string;
    category: string;
    image?: string;
    readTime?: string;
  };
  onReadMore?: () => void;
}

const categoryColors: Record<string, string> = {
  Cardiology: "bg-red-100 text-red-700",
  Pediatrics: "bg-blue-100 text-blue-700",
  Oncology: "bg-purple-100 text-purple-700",
  "General Health": "bg-green-100 text-green-700",
  Nutrition: "bg-orange-100 text-orange-700",
  Mental: "bg-teal-100 text-teal-700",
};

export default function HealthArticle({ article, onReadMore }: HealthArticleProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
      <div className="h-40 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
        {article.image ? (
          <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
        ) : (
          <span className="text-white text-4xl font-bold opacity-30">H+</span>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className={`px-2 py-1 text-xs font-medium rounded ${categoryColors[article.category] || "bg-gray-100 text-gray-700"}`}>
            {article.category}
          </span>
          {article.readTime && <span className="text-xs text-gray-500">{article.readTime}</span>}
        </div>
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{article.title}</h3>
        <p className="text-sm text-gray-500 mb-4 line-clamp-2">{article.excerpt}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <User size={14} /> {article.author}
            </span>
            <span className="flex items-center gap-1">
              <Calendar size={14} /> {article.date}
            </span>
          </div>
          <button
            onClick={onReadMore}
            className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Read <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
