import React from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface Comment {
  id: number;
  author: string;
  content: string;
  date: string;
}

export const CommentsSection = () => {
  const initialComments: Comment[] = [
    {
      id: 1,
      author: "Sarah Johnson",
      content: "Breaking tasks into smaller steps has been a game-changer for me! I used to feel overwhelmed by big projects, but now I just focus on one small task at a time.",
      date: "March 15, 2024"
    },
    {
      id: 2,
      author: "Michael Chen",
      content: "The 2-minute rule really works! I've been using it for a month now and my productivity has improved significantly.",
      date: "March 14, 2024"
    },
    {
      id: 3,
      author: "Emma Williams",
      content: "I love the accountability tip! Having a study buddy has helped me stay on track with my goals.",
      date: "March 13, 2024"
    }
  ];

  const [comments, setComments] = React.useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = React.useState("");
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
    <section className="mx-auto mt-16 max-w-4xl px-4 md:px-0">
      <h2 className="mb-8 text-xl md:text-2xl font-bold">What's your favorite method for overcoming procrastination? Let us know in the comments!</h2>
      
      <form onSubmit={handleCommentSubmit} className="mb-8">
        <Textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Share your thoughts..."
          className="mb-4"
        />
        <Button type="submit">Post Comment</Button>
      </form>

      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            <div className="mb-2 flex flex-wrap items-center justify-between">
              <span className="font-semibold">{comment.author}</span>
              <span className="text-sm text-gray-500">{comment.date}</span>
            </div>
            <p className="text-gray-700">{comment.content}</p>
          </div>
        ))}
      </div>
    </section>
  );
};