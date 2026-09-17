import React, { useState } from 'react';
import { BLOG_POSTS, CLINIC_METADATA } from '../../data/mockData';
import { BlogPost } from '../../types';
import { 
  BookOpen, Clock, User, ArrowRight, X, Sparkles, 
  CheckCircle, Share2, Tag 
} from 'lucide-react';

export const PatientEducationBlog: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Restorative', 'Implants', 'Orthodontics', 'Prevention'];

  const filteredPosts = selectedCategory === 'All'
    ? BLOG_POSTS
    : BLOG_POSTS.filter(p => p.category === selectedCategory);

  return (
    <div className="w-full bg-[#FAF6F0] py-16 text-[#2B2B2B]" id="blog">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#B89368] mb-2 block">
            EVIDENCE-BASED DENTAL EDUCATION
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#2B2B2B] tracking-tight">
            Patient Guides & Clinical Insights
          </h2>
          <p className="text-sm text-gray-600 mt-3 leading-relaxed">
            Written and reviewed by {CLINIC_METADATA.founder} and faculty to help you make well-informed decisions regarding your oral health.
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-medium cursor-pointer transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#1F4E4A] text-white shadow-xs'
                    : 'bg-white text-gray-700 border border-[#E8DFD3] hover:bg-[#FAF6F0]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="bg-white rounded-2xl overflow-hidden border border-[#E8DFD3] hover:border-[#B89368] shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col group"
            >
              <div className="aspect-16/10 overflow-hidden relative">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-[#FAF6F0]/90 backdrop-blur-xs px-2.5 py-0.5 rounded-full text-[10px] font-bold text-[#1F4E4A] border border-[#E8DFD3]">
                  {post.category}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col space-y-3">
                <div className="flex items-center gap-3 text-[11px] text-gray-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#B89368]" />
                    {post.readTime}
                  </span>
                  <span>•</span>
                  <span>{post.date}</span>
                </div>

                <h3 className="font-serif font-bold text-base text-[#2B2B2B] group-hover:text-[#B89368] transition-colors line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                  {post.summary}
                </p>

                <div className="pt-3 mt-auto border-t border-gray-100 flex items-center justify-between text-xs text-[#1F4E4A] font-semibold">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Article Reading Modal */}
        {selectedPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fadeIn">
            <div className="bg-white w-full max-w-3xl max-h-[90vh] rounded-2xl shadow-2xl border border-[#E8DFD3] overflow-y-auto flex flex-col">
              {/* Header */}
              <div className="relative aspect-16/7 overflow-hidden shrink-0">
                <img
                  src={selectedPost.imageUrl}
                  alt={selectedPost.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <button
                  onClick={() => setSelectedPost(null)}
                  className="absolute top-4 right-4 bg-black/60 hover:bg-black text-white p-2 rounded-full cursor-pointer transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute bottom-4 left-6 right-6 text-white space-y-1">
                  <span className="text-[11px] font-bold text-[#B89368] uppercase tracking-wider">
                    {selectedPost.category} • {selectedPost.readTime}
                  </span>
                  <h3 className="font-serif font-bold text-xl sm:text-2xl leading-tight">
                    {selectedPost.title}
                  </h3>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 sm:p-8 space-y-6 text-gray-700 text-xs sm:text-sm leading-relaxed">
                {/* Author attribution */}
                <div className="flex items-center justify-between pb-4 border-b border-gray-100 text-xs">
                  <div className="flex items-center gap-2 text-gray-600">
                    <User className="w-4 h-4 text-[#B89368]" />
                    <span>Author: <strong>{selectedPost.author}</strong> ({selectedPost.authorTitle})</span>
                  </div>
                  <span className="text-gray-400">{selectedPost.date}</span>
                </div>

                <div className="space-y-3 text-gray-700 leading-relaxed">
                  {Array.isArray(selectedPost.content) ? (
                    selectedPost.content.map((paragraph, pIdx) => (
                      <p key={pIdx}>{paragraph}</p>
                    ))
                  ) : (
                    <p>{selectedPost.content}</p>
                  )}
                </div>

                {/* Clinical Takeaways Box */}
                {selectedPost.keyTakeaways && selectedPost.keyTakeaways.length > 0 && (
                  <div className="p-5 rounded-xl bg-[#FAF6F0] border border-[#E8DFD3] space-y-3">
                    <h4 className="font-serif font-bold text-sm text-[#1F4E4A] flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#B89368]" />
                      Clinical Takeaways & Patient Guidance
                    </h4>
                    <div className="space-y-2">
                      {selectedPost.keyTakeaways.map((takeaway, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-gray-700">
                          <CheckCircle className="w-4 h-4 text-[#B89368] shrink-0 mt-0.5" />
                          <span>{takeaway}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Footer Action */}
                <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
                  <span className="text-xs text-gray-500">
                    Reviewed by ARK Dental Studio Clinical Review Board
                  </span>
                  <button
                    onClick={() => setSelectedPost(null)}
                    className="px-5 py-2.5 rounded-xl bg-[#1F4E4A] text-white text-xs font-semibold cursor-pointer"
                  >
                    Close Article
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
