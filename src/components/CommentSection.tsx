
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Send, ThumbsUp, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Comment {
  id: number;
  author: string;
  content: string;
  date: string;
  likes: number;
  replies?: Comment[];
}

interface CommentSectionProps {
  reviewId: number;
}

export const CommentSection = ({ reviewId }: CommentSectionProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyText, setReplyText] = useState("");
  const { toast } = useToast();

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now(),
      author: newAuthor.trim() || "Anonymous",
      content: newComment.trim(),
      date: new Date().toISOString(),
      likes: 0,
      replies: []
    };

    setComments(prev => [...prev, comment]);
    setNewComment("");
    
    toast({
      title: "Comment posted",
      description: "Your comment has been added to this review.",
    });
  };

  const handleSubmitReply = (commentId: number) => {
    if (!replyText.trim()) return;
    
    const reply: Comment = {
      id: Date.now(),
      author: "Anonymous",
      content: replyText.trim(),
      date: new Date().toISOString(),
      likes: 0
    };

    setComments(prev => prev.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [...(comment.replies || []), reply]
        };
      }
      return comment;
    }));

    setReplyText("");
    setReplyingTo(null);
    
    toast({
      title: "Reply posted",
      description: "Your reply has been added to this comment.",
    });
  };

  const handleLikeComment = (commentId: number) => {
    setComments(prev => prev.map(comment => {
      if (comment.id === commentId) {
        return { ...comment, likes: comment.likes + 1 };
      }
      return comment;
    }));
  };

  const handleLikeReply = (commentId: number, replyId: number) => {
    setComments(prev => prev.map(comment => {
      if (comment.id === commentId && comment.replies) {
        return {
          ...comment,
          replies: comment.replies.map(reply => {
            if (reply.id === replyId) {
              return { ...reply, likes: reply.likes + 1 };
            }
            return reply;
          })
        };
      }
      return comment;
    }));
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0).toUpperCase())
      .slice(0, 2)
      .join('');
  };

  return (
    <div className="mt-4 pt-4 border-t bg-gray-50 rounded-lg p-4">
      <h4 className="font-semibold mb-4">Discussion</h4>
      
      {comments.length > 0 && (
        <div className="space-y-4 mb-6">
          {comments.map((comment) => (
            <div key={comment.id} className="space-y-3">
              <Card className="bg-white">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-blue-100 text-blue-600 text-xs">
                        {getInitials(comment.author)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-medium text-sm">{comment.author}</span>
                        <span className="text-xs text-gray-500">
                          {new Date(comment.date).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700">{comment.content}</p>
                      <div className="flex items-center mt-2 space-x-3">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-6 text-xs text-gray-500 hover:text-blue-600"
                          onClick={() => handleLikeComment(comment.id)}
                        >
                          <ThumbsUp className="h-3 w-3 mr-1" /> 
                          {comment.likes > 0 && comment.likes}
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-6 text-xs text-gray-500 hover:text-blue-600"
                          onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                        >
                          Reply
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Replies to this comment */}
              {comment.replies && comment.replies.length > 0 && (
                <div className="ml-6 space-y-2">
                  {comment.replies.map((reply) => (
                    <Card key={reply.id} className="bg-gray-50">
                      <CardContent className="p-3">
                        <div className="flex items-start space-x-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="bg-gray-200 text-gray-600 text-xs">
                              {getInitials(reply.author)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <span className="font-medium text-xs">{reply.author}</span>
                              <span className="text-xs text-gray-500">
                                {new Date(reply.date).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-xs text-gray-700 mt-1">{reply.content}</p>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-5 text-xs text-gray-500 hover:text-blue-600 p-0 mt-1"
                              onClick={() => handleLikeReply(comment.id, reply.id)}
                            >
                              <ThumbsUp className="h-3 w-3 mr-1" />
                              {reply.likes > 0 && reply.likes}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
              
              {/* Reply form */}
              {replyingTo === comment.id && (
                <div className="ml-6 flex items-center space-x-2">
                  <Textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Write a reply..."
                    className="min-h-12 text-sm"
                  />
                  <div className="flex flex-col space-y-2">
                    <Button 
                      size="sm" 
                      className="h-8 px-2"
                      onClick={() => handleSubmitReply(comment.id)}
                      disabled={!replyText.trim()}
                    >
                      <Send className="h-3 w-3" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost"
                      className="h-8 px-2"
                      onClick={() => setReplyingTo(null)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      
      <form onSubmit={handleSubmitComment} className="space-y-3">
        <div>
          <Input 
            value={newAuthor}
            onChange={(e) => setNewAuthor(e.target.value)}
            placeholder="Your name (optional)"
            className="mb-2"
          />
          <Textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment or ask a question about this review..."
            className="min-h-20"
          />
        </div>
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
