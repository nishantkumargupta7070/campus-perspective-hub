
import { GraduationCap } from "lucide-react";

export const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <GraduationCap className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Madhupur Polytechnic Reviews
              </h1>
              <p className="text-sm text-gray-600">Student experiences and insights</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">Share Your Experience</p>
            <p className="text-xs text-gray-600">Help future students decide</p>
          </div>
        </div>
      </div>
    </header>
  );
};
