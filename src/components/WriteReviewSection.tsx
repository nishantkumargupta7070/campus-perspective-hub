import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StarRating } from "@/components/StarRating";
import { PenTool } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { StaffRating } from "@/components/StaffRating";

export const WriteReviewSection = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    course: "",
    year: "",
    overall: 0,
    academics: 0,
    facilities: 0,
    placement: 0,
    campus: 0,
    review: "",
    recommend: 0,
    staffRatings: {}
  });
  const { toast } = useToast();

  const handleStaffRatingChange = (staffRatings: any) => {
    setFormData({...formData, staffRatings});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.overall === 0 || formData.recommend === 0 || !formData.review.trim()) {
      toast({
        title: "Please complete all required fields",
        description: "Overall rating, recommendation, and review text are required.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Review submitted successfully!",
      description: "Thank you for sharing your experience. Your review will help future students.",
    });
    
    setFormData({
      name: "",
      course: "",
      year: "",
      overall: 0,
      academics: 0,
      facilities: 0,
      placement: 0,
      campus: 0,
      review: "",
      recommend: 0,
      staffRatings: {}
    });
    setShowForm(false);
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Share Your Experience</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Help future students by sharing your honest experience at Madhupur Polytechnic. 
            Use the describe-evaluate-suggest framework for constructive feedback.
          </p>
        </div>

        {!showForm ? (
          <div className="text-center">
            <Button 
              onClick={() => setShowForm(true)}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 px-8 py-4 text-lg"
            >
              <PenTool className="mr-2 h-5 w-5" />
              Write a Review
            </Button>
          </div>
        ) : (
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center">
                <PenTool className="mr-2 h-5 w-5" />
                Write Your Review
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="name">Your Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Anonymous"
                    />
                  </div>
                  <div>
                    <Label htmlFor="course">Course/Branch</Label>
                    <Input
                      id="course"
                      value={formData.course}
                      onChange={(e) => setFormData({...formData, course: e.target.value})}
                      placeholder="e.g., Civil Engineering"
                    />
                  </div>
                  <div>
                    <Label htmlFor="year">Year of Study/Graduation</Label>
                    <Input
                      id="year"
                      value={formData.year}
                      onChange={(e) => setFormData({...formData, year: e.target.value})}
                      placeholder="e.g., 2024"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label className="text-base font-semibold">Overall Rating *</Label>
                      <div className="mt-2">
                        <StarRating 
                          rating={formData.overall}
                          onChange={(rating) => setFormData({...formData, overall: rating})}
                          readonly={false}
                          size="lg"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label>Academics Quality</Label>
                      <div className="mt-2">
                        <StarRating 
                          rating={formData.academics}
                          onChange={(rating) => setFormData({...formData, academics: rating})}
                          readonly={false}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label>Facilities & Infrastructure</Label>
                      <div className="mt-2">
                        <StarRating 
                          rating={formData.facilities}
                          onChange={(rating) => setFormData({...formData, facilities: rating})}
                          readonly={false}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <Label>Placement Support</Label>
                      <div className="mt-2">
                        <StarRating 
                          rating={formData.placement}
                          onChange={(rating) => setFormData({...formData, placement: rating})}
                          readonly={false}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label>Campus Life</Label>
                      <div className="mt-2">
                        <StarRating 
                          rating={formData.campus}
                          onChange={(rating) => setFormData({...formData, campus: rating})}
                          readonly={false}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label className="text-base font-semibold">Would you recommend? *</Label>
                      <div className="mt-2">
                        <StarRating 
                          rating={formData.recommend}
                          onChange={(rating) => setFormData({...formData, recommend: rating})}
                          readonly={false}
                          size="lg"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Add the new Staff Rating component */}
                <StaffRating onChange={handleStaffRatingChange} />

                <div>
                  <Label htmlFor="review" className="text-base font-semibold">Your Review *</Label>
                  <p className="text-sm text-gray-600 mb-2">
                    Please follow the describe-evaluate-suggest framework: Describe your experience, 
                    evaluate what worked well and what didn't, and suggest improvements.
                  </p>
                  <Textarea
                    id="review"
                    value={formData.review}
                    onChange={(e) => setFormData({...formData, review: e.target.value})}
                    placeholder="Share your detailed experience about academics, facilities, campus life, placement support, and any suggestions for improvement..."
                    className="min-h-32"
                    required
                  />
                </div>

                <div className="flex justify-between">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setShowForm(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                    Submit Review
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
};
