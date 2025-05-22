
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Send } from "lucide-react";

interface Comment {
  id: number;
  author: string;
  content: string;
  date: string;
}

interface CommentSectionProps {
  reviewId: number;
}

export const CommentSection = ({ reviewId }: CommentSectionProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now(),
      author: "Anonymous",
      content: newComment.trim(),
      date: new Date().toISOString()
    };

    setComments(prev => [...prev, comment]);
    setNewComment("");
  };

  return (
    <div className="mt-4 pt-4 border-t bg-gray-50 rounded-lg p-4">
      <h4 className="font-semibold mb-4">Comments</h4>
      
      {comments.length > 0 && (
        <div className="space-y-3 mb-4">
          {comments.map((comment) => (
            <Card key={comment.id} className="bg-white">
              <CardContent className="p-3">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-medium text-sm">{comment.author}</span>
                  <span className="text-xs text-gray-500">
                    {new Date(comment.date).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-gray-700">{comment.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      
      <form onSubmit={handleSubmitComment} className="space-y-3">
        <Textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment or ask a question about this review..."
          className="min-h-20"
        />
        <div className="flex justify-end">
          <Button type="submit" size="sm" disabled={!newComment.trim()}>
            <Send className="h-4 w-4 mr-1" />
            Post Comment
          </Button>
        </div>
      </form>
    </div>
  );
};
