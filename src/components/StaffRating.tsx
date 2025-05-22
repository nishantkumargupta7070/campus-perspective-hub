
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StarRating } from "@/components/StarRating";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface RatingCriteria {
  [key: string]: {
    label: string;
    criteria: {
      [key: string]: string;
    };
  };
}

const ratingCriteria: RatingCriteria = {
  teacher: {
    label: "Teachers",
    criteria: {
      knowledge: "Subject Knowledge",
      teaching: "Teaching Method",
      accessibility: "Accessibility",
      feedback: "Quality of Feedback",
      support: "Student Support"
    }
  },
  hod: {
    label: "HODs",
    criteria: {
      leadership: "Leadership",
      vision: "Department Vision",
      management: "Department Management",
      development: "Faculty Development",
      planning: "Curriculum Planning"
    }
  },
  staff: {
    label: "Staff",
    criteria: {
      helpfulness: "Helpfulness",
      efficiency: "Efficiency",
      communication: "Communication",
      knowledge: "Process Knowledge",
      attitude: "Attitude"
    }
  }
};

export const StaffRating = ({ onChange }: { onChange?: (ratings: any) => void }) => {
  const [activeTab, setActiveTab] = useState("teacher");
  const [ratings, setRatings] = useState({
    teacher: {
      knowledge: 0,
      teaching: 0,
      accessibility: 0,
      feedback: 0,
      support: 0
    },
    hod: {
      leadership: 0,
      vision: 0,
      management: 0,
      development: 0,
      planning: 0
    },
    staff: {
      helpfulness: 0,
      efficiency: 0,
      communication: 0,
      knowledge: 0,
      attitude: 0
    }
  });

  const handleRatingChange = (category: string, criterion: string, value: number) => {
    const newRatings = {
      ...ratings,
      [category]: {
        ...ratings[category as keyof typeof ratings],
        [criterion]: value
      }
    };
    
    setRatings(newRatings);
    onChange?.(newRatings);
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Rate Staff & Faculty</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-4">
            {Object.entries(ratingCriteria).map(([key, { label }]) => (
              <TabsTrigger key={key} value={key}>{label}</TabsTrigger>
            ))}
          </TabsList>
          
          {Object.entries(ratingCriteria).map(([category, { criteria, label }]) => (
            <TabsContent key={category} value={category} className="space-y-4">
              <p className="text-sm text-gray-600 mb-4">
                Rate your experience with the {label.toLowerCase()} at Madhupur Polytechnic:
              </p>
              
              {Object.entries(criteria).map(([key, label]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{label}</span>
                  <StarRating 
                    rating={ratings[category as keyof typeof ratings][key]} 
                    onChange={(value) => handleRatingChange(category, key, value)}
                    readonly={false}
                    size="sm"
                  />
                </div>
              ))}
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};
