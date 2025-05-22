
import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StarRating } from "@/components/StarRating";
import { CommentSection } from "@/components/CommentSection";
import { MessageCircle, ThumbsUp, Flag } from "lucide-react";

const sampleReviews = [
  {
    id: 1,
    name: "Rahul Kumar",
    course: "Mechanical Engineering",
    year: "2023",
    overall: 4,
    academics: 4,
    facilities: 3,
    placement: 4,
    campus: 4,
    recommend: 4,
    review: "**Describe:** I completed my diploma in Mechanical Engineering from Madhupur Polytechnic in 2023. The college has a decent infrastructure with well-equipped labs and workshops. **Evaluate:** The faculty is knowledgeable and supportive, especially in practical subjects. However, the library needs more updated books and resources. Placement support is good with regular company visits. **Suggest:** The college should focus on improving digital resources and adding more modern equipment to labs.",
    date: "2024-01-15",
    helpful: 12,
    comments: []
  },
  {
    id: 2,
    name: "Priya Singh",
    course: "Civil Engineering",
    year: "2024",
    overall: 5,
    academics: 5,
    facilities: 4,
    placement: 5,
    campus: 4,
    recommend: 5,
    review: "**Describe:** As a recent graduate from the Civil Engineering department, I had an excellent experience. The course curriculum is well-structured and industry-relevant. **Evaluate:** The faculty members are highly qualified and always available for doubt clearing. The practical exposure through site visits and projects is commendable. Campus life is vibrant with various technical and cultural activities. **Suggest:** More focus on soft skills development and communication training would benefit students further.",
    date: "2024-02-20",
    helpful: 8,
    comments: []
  },
  {
    id: 3,
    name: "Anonymous",
    course: "Electrical Engineering",
    year: "2023",
    overall: 3,
    academics: 3,
    facilities: 2,
    placement: 3,
    campus: 4,
    recommend: 3,
    review: "**Describe:** I studied Electrical Engineering for three years here. The college has potential but needs significant improvements. **Evaluate:** While some faculty members are excellent, others lack the practical knowledge needed for industry preparation. The electrical lab equipment is outdated and needs upgrading. However, the student community is supportive and friendly. **Suggest:** Investment in modern lab equipment and regular faculty training programs would greatly improve the quality of education.",
    date: "2024-01-08",
    helpful: 15,
    comments: []
  }
];

export const ReviewSection = () => {
  const [reviews, setReviews] = useState(sampleReviews);
  const [expandedComments, setExpandedComments] = useState<number[]>([]);

  const toggleComments = (reviewId: number) => {
    setExpandedComments(prev => 
      prev.includes(reviewId) 
        ? prev.filter(id => id !== reviewId)
        : [...prev, reviewId]
    );
  };

  const handleHelpful = (reviewId: number) => {
    setReviews(prev => prev.map(review => 
      review.id === reviewId 
        ? { ...review, helpful: review.helpful + 1 }
        : review
    ));
  };

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Student Reviews
        </h2>
        
        <div className="max-w-4xl mx-auto space-y-6">
          {reviews.map((review) => (
            <Card key={review.id} className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{review.name}</h3>
                    <p className="text-gray-600">{review.course} • Class of {review.year}</p>
                  </div>
                  <div className="text-right">
                    <StarRating rating={review.overall} size="sm" />
                    <p className="text-sm text-gray-600 mt-1">
                      Overall: {review.overall}/5
                    </p>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Academics</p>
                    <StarRating rating={review.academics} size="sm" />
                  </div>
                  <div>
                    <p className="text-gray-600">Facilities</p>
                    <StarRating rating={review.facilities} size="sm" />
                  </div>
                  <div>
                    <p className="text-gray-600">Placement</p>
                    <StarRating rating={review.placement} size="sm" />
                  </div>
                  <div>
                    <p className="text-gray-600">Campus Life</p>
                    <StarRating rating={review.campus} size="sm" />
                  </div>
                </div>
                
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {review.review}
                  </p>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center space-x-4">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleHelpful(review.id)}
                      className="text-gray-600 hover:text-blue-600"
                    >
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      Helpful ({review.helpful})
                    </Button>
                    
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => toggleComments(review.id)}
                      className="text-gray-600 hover:text-blue-600"
                    >
                      <MessageCircle className="h-4 w-4 mr-1" />
                      Comments
                    </Button>
                    
                    <Button variant="ghost" size="sm" className="text-gray-600 hover:text-red-600">
                      <Flag className="h-4 w-4 mr-1" />
                      Report
                    </Button>
                  </div>
                  
                  <div className="text-sm text-gray-500">
                    {new Date(review.date).toLocaleDateString()}
                  </div>
                </div>
                
                {expandedComments.includes(review.id) && (
                  <CommentSection reviewId={review.id} />
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
