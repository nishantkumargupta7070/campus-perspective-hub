
import { Card, CardContent } from "@/components/ui/card";
import { StarRating } from "@/components/StarRating";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";

const data = [
  { name: '5★', count: 45 },
  { name: '4★', count: 32 },
  { name: '3★', count: 18 },
  { name: '2★', count: 8 },
  { name: '1★', count: 3 },
];

export const ReviewStats = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">4.2</div>
              <StarRating rating={4.2} />
              <p className="text-sm text-gray-600 mt-2">Overall Rating</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">106</div>
              <p className="text-sm text-gray-600">Total Reviews</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">89%</div>
              <p className="text-sm text-gray-600">Would Recommend</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-3 text-center">Rating Distribution</h3>
              <div className="h-24">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data}>
                    <XAxis dataKey="name" fontSize={12} />
                    <YAxis hide />
                    <Bar dataKey="count" fill="#3B82F6" radius={2} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
