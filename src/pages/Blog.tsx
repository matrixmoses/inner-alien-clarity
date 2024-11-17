import React from "react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BlogContent } from "@/components/blog/BlogContent";
import { CommentsSection } from "@/components/blog/CommentsSection";
import { BlogFooter } from "@/components/blog/BlogFooter";

const Blog = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#9C8ADE]/10 to-[#6EC4A8]/10">
      {/* Header */}
      <header className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4 py-6 gap-4">
        <Logo />
        <Link to="/">
          <Button variant="outline">Back to Home</Button>
        </Link>
      </header>

      {/* Blog Content */}
      <main className="container mx-auto py-12">
        <BlogContent />
        <CommentsSection />
      </main>

      <BlogFooter />
    </div>
  );
};

export default Blog;