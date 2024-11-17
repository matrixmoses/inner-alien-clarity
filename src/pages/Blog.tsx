import { useState } from "react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, X } from "lucide-react";
import { Link } from "react-router-dom";

interface Comment {
  id: number;
  author: string;
  content: string;
  date: string;
}

const Blog = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const { toast } = useToast();

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) {
      toast({
        title: "Error",
        description: "Please enter a comment",
        variant: "destructive",
      });
      return;
    }

    const comment: Comment = {
      id: Date.now(),
      author: "Anonymous User",
      content: newComment,
      date: new Date().toLocaleDateString(),
    };

    setComments([...comments, comment]);
    setNewComment("");
    toast({
      title: "Success",
      description: "Comment posted successfully!",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#9C8ADE]/10 to-[#6EC4A8]/10">
      {/* Header */}
      <header className="container mx-auto flex items-center justify-between px-4 py-6">
        <Logo />
        <Link to="/">
          <Button variant="outline">Back to Home</Button>
        </Link>
      </header>

      {/* Blog Content */}
      <main className="container mx-auto px-4 py-12">
        <article className="prose prose-lg mx-auto max-w-4xl">
          <h1 className="mb-8 text-4xl font-bold">5 Ways to Overcome Procrastination</h1>
          <div className="mb-4 flex items-center gap-4 text-sm text-gray-600">
            <span>Published: November 16, 2024</span>
            <span>By: The Inner Alien Team</span>
          </div>

          {/* Added Featured Image */}
          <div className="mb-8 overflow-hidden rounded-lg">
            <img
              src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
              alt="A laptop on a desk representing work and productivity"
              className="w-full object-cover"
              style={{ maxHeight: "400px" }}
            />
          </div>
          
          <p className="lead">
            Procrastination is something we all experience at some point. It's that nagging feeling that keeps us from starting or finishing tasks, even when we know they're important. While it can feel overwhelming, overcoming procrastination is possible with the right strategies.
          </p>

          <h2 className="text-2xl font-bold mt-8">1. Break Tasks into Smaller Steps</h2>
          <p>
            One of the main reasons we procrastinate is feeling overwhelmed by the size of a task. Breaking it into smaller, manageable steps makes it less daunting and helps you build momentum.
          </p>
          <h3 className="text-xl font-semibold mt-4">How to Do It:</h3>
          <ul className="list-disc pl-6">
            <li>Identify the smallest actionable step you can take.</li>
            <li>Focus on completing that step instead of the whole task.</li>
            <li>Celebrate each small win to stay motivated.</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8">2. Use the "2-Minute Rule"</h2>
          <p>
            The 2-minute rule states that if a task takes two minutes or less, do it immediately. For larger tasks, spend just two minutes getting started. This approach overcomes the inertia of starting and often leads to working longer.
          </p>

          <h2 className="text-2xl font-bold mt-8">3. Eliminate Distractions</h2>
          <p>
            Distractions are procrastination's best friend. Whether it's social media, notifications, or a noisy environment, minimizing distractions can help you focus better.
          </p>

          <h2 className="text-2xl font-bold mt-8">4. Set Realistic Goals and Deadlines</h2>
          <p>
            Unrealistic goals can make tasks seem impossible, leading to procrastination. Setting achievable objectives with clear deadlines helps you stay on track.
          </p>

          <h2 className="text-2xl font-bold mt-8">5. Build Accountability</h2>
          <p>
            Having someone to hold you accountable can significantly reduce procrastination. When you know someone is checking on your progress, you're more likely to follow through.
          </p>

          <h2 className="text-2xl font-bold mt-8">Final Thoughts</h2>
          <p>
            Procrastination doesn't mean you're lazy or incapable; it's often a sign of being overwhelmed or afraid of failure. By applying these strategies, you can build momentum, regain focus, and take meaningful steps toward your goals.
          </p>
          <p className="font-semibold mt-4">
            Start small, experiment with different methods, and remember: progress is better than perfection.
          </p>
        </article>

        {/* Comments Section */}
        <section className="mx-auto mt-16 max-w-4xl">
          <h2 className="mb-8 text-2xl font-bold">What's your favorite method for overcoming procrastination? Let us know in the comments!</h2>
          
          {/* Comment Form */}
          <form onSubmit={handleCommentSubmit} className="mb-8">
            <Textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Share your thoughts..."
              className="mb-4"
            />
            <Button type="submit">Post Comment</Button>
          </form>

          {/* Comments List */}
          <div className="space-y-6">
            {comments.map((comment) => (
              <div key={comment.id} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-semibold">{comment.author}</span>
                  <span className="text-sm text-gray-500">{comment.date}</span>
                </div>
                <p className="text-gray-700">{comment.content}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#9C8ADE]/10 py-8">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <h3 className="mb-4 font-semibold text-gray-900">Contact Us</h3>
              <div className="space-y-2 text-gray-600">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <a href="mailto:YourInnerAlien@gmail.com" className="hover:text-[#9C8ADE]">
                    YourInnerAlien@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <X className="h-4 w-4" />
                  <a href="https://x.com/MyInnerAlien" target="_blank" rel="noopener noreferrer" className="hover:text-[#9C8ADE]">
                    @MyInnerAlien
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-200 pt-8 text-center text-sm text-gray-600">
            © {new Date().getFullYear()} TheInnerAlien.co. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Blog;