
import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StarRating } from "@/components/StarRating";
import { CommentSection } from "@/components/CommentSection";
import { MessageCircle, ThumbsUp, Flag, ChevronDown, ChevronUp } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

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
    staffRatings: {
      teacher: { knowledge: 4, teaching: 4, accessibility: 3, feedback: 4, support: 5 },
      hod: { leadership: 4, vision: 3, management: 4, development: 3, planning: 4 },
      staff: { helpfulness: 5, efficiency: 3, communication: 4, knowledge: 4, attitude: 5 }
    },
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
    staffRatings: {
      teacher: { knowledge: 5, teaching: 5, accessibility: 4, feedback: 5, support: 5 },
      hod: { leadership: 5, vision: 5, management: 4, development: 5, planning: 4 },
      staff: { helpfulness: 4, efficiency: 4, communication: 3, knowledge: 5, attitude: 4 }
    },
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
    staffRatings: {
      teacher: { knowledge: 4, teaching: 3, accessibility: 2, feedback: 2, support: 3 },
      hod: { leadership: 3, vision: 2, management: 3, development: 2, planning: 3 },
      staff: { helpfulness: 3, efficiency: 2, communication: 3, knowledge: 3, attitude: 4 }
    },
    review: "**Describe:** I studied Electrical Engineering for three years here. The college has potential but needs significant improvements. **Evaluate:** While some faculty members are excellent, others lack the practical knowledge needed for industry preparation. The electrical lab equipment is outdated and needs upgrading. However, the student community is supportive and friendly. **Suggest:** Investment in modern lab equipment and regular faculty training programs would greatly improve the quality of education.",
    date: "2024-01-08",
    helpful: 15,
    comments: []
  }
];

export const ReviewSection = () => {
  const [reviews, setReviews] = useState(sampleReviews);
  const [expandedComments, setExpandedComments] = useState<number[]>([]);
  const [expandedStaffRatings, setExpandedStaffRatings] = useState<number[]>([]);

  const toggleComments = (reviewId: number) => {
    setExpandedComments(prev => 
      prev.includes(reviewId) 
        ? prev.filter(id => id !== reviewId)
        : [...prev, reviewId]
    );
  };

  const toggleStaffRatings = (reviewId: number) => {
    setExpandedStaffRatings(prev => 
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

  const getAverageRating = (ratings: {[key: string]: number}) => {
    if (!ratings || Object.keys(ratings).length === 0) return 0;
    const sum = Object.values(ratings).reduce((acc, val) => acc + val, 0);
    return sum / Object.values(ratings).length;
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
                
                {/* Staff ratings collapsible section */}
                {review.staffRatings && (
                  <Collapsible 
                    open={expandedStaffRatings.includes(review.id)}
                    onOpenChange={() => toggleStaffRatings(review.id)}
                    className="border rounded-md p-3 bg-gray-50"
                  >
                    <div className="flex justify-between items-center">
                      <h4 className="text-sm font-medium">Staff & Faculty Ratings</h4>
                      <CollapsibleTrigger asChild>
                        <Button variant="ghost" size="sm" className="p-0 h-6 w-6">
                          {expandedStaffRatings.includes(review.id) ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </Button>
                      </CollapsibleTrigger>
                    </div>
                    
                    <CollapsibleContent className="mt-3 space-y-3">
                      {review.staffRatings && (
                        <>
                          {/* Teachers ratings */}
                          {review.staffRatings.teacher && (
                            <div>
                              <h5 className="text-sm font-medium mb-2">Teachers</h5>
                              <div className="grid grid-cols-2 gap-2 text-xs">
                                <div>
                                  <p>Knowledge</p>
                                  <StarRating rating={review.staffRatings.teacher.knowledge} size="sm" />
                                </div>
                                <div>
                                  <p>Teaching Method</p>
                                  <StarRating rating={review.staffRatings.teacher.teaching} size="sm" />
                                </div>
                                <div>
                                  <p>Accessibility</p>
                                  <StarRating rating={review.staffRatings.teacher.accessibility} size="sm" />
                                </div>
                                <div>
                                  <p>Feedback Quality</p>
                                  <StarRating rating={review.staffRatings.teacher.feedback} size="sm" />
                                </div>
                                <div>
                                  <p>Student Support</p>
                                  <StarRating rating={review.staffRatings.teacher.support} size="sm" />
                                </div>
                                <div>
                                  <p className="font-medium">Average</p>
                                  <StarRating rating={getAverageRating(review.staffRatings.teacher)} size="sm" />
                                </div>
                              </div>
                            </div>
                          )}
                          
                          {/* HODs ratings */}
                          {review.staffRatings.hod && (
                            <div className="mt-3">
                              <h5 className="text-sm font-medium mb-2">Department Heads (HODs)</h5>
                              <div className="grid grid-cols-2 gap-2 text-xs">
                                <div>
                                  <p>Leadership</p>
                                  <StarRating rating={review.staffRatings.hod.leadership} size="sm" />
                                </div>
                                <div>
                                  <p>Vision</p>
                                  <StarRating rating={review.staffRatings.hod.vision} size="sm" />
                                </div>
                                <div>
                                  <p>Department Management</p>
                                  <StarRating rating={review.staffRatings.hod.management} size="sm" />
                                </div>
                                <div>
                                  <p>Faculty Development</p>
                                  <StarRating rating={review.staffRatings.hod.development} size="sm" />
                                </div>
                                <div>
                                  <p>Curriculum Planning</p>
                                  <StarRating rating={review.staffRatings.hod.planning} size="sm" />
                                </div>
                                <div>
                                  <p className="font-medium">Average</p>
                                  <StarRating rating={getAverageRating(review.staffRatings.hod)} size="sm" />
                                </div>
                              </div>
                            </div>
                          )}
                          
                          {/* Staff ratings */}
                          {review.staffRatings.staff && (
                            <div className="mt-3">
                              <h5 className="text-sm font-medium mb-2">Administrative Staff</h5>
                              <div className="grid grid-cols-2 gap-2 text-xs">
                                <div>
                                  <p>Helpfulness</p>
                                  <StarRating rating={review.staffRatings.staff.helpfulness} size="sm" />
                                </div>
                                <div>
                                  <p>Efficiency</p>
                                  <StarRating rating={review.staffRatings.staff.efficiency} size="sm" />
                                </div>
                                <div>
                                  <p>Communication</p>
                                  <StarRating rating={review.staffRatings.staff.communication} size="sm" />
                                </div>
                                <div>
                                  <p>Process Knowledge</p>
                                  <StarRating rating={review.staffRatings.staff.knowledge} size="sm" />
                                </div>
                                <div>
                                  <p>Attitude</p>
                                  <StarRating rating={review.staffRatings.staff.attitude} size="sm" />
                                </div>
                                <div>
                                  <p className="font-medium">Average</p>
                                  <StarRating rating={getAverageRating(review.staffRatings.staff)} size="sm" />
                                </div>
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </CollapsibleContent>
                  </Collapsible>
                )}
                
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
                      Comments {expandedComments.includes(review.id) ? 'Hide' : 'Show'}
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
