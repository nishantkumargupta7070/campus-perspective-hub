
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

interface DisclaimerModalProps {
  onAccept: () => void;
}

export const DisclaimerModal = ({ onAccept }: DisclaimerModalProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <AlertTriangle className="h-12 w-12 text-amber-500" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            Important Disclaimer
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-gray-700 leading-relaxed space-y-4">
            <p>
              This website provides a platform for students to share their personal experiences and opinions about colleges. The reviews expressed here are solely those of individual students and do not necessarily reflect the views or official stance of the college in question, nor of this website's administrators.
            </p>
            
            <p>
              We aim to facilitate an open and honest exchange of information. However, we do not verify the accuracy of every statement made by reviewers and cannot be held responsible for any inaccuracies or misrepresentations. This platform is not intended to defame or disparage any educational institution. Our purpose is to offer prospective students a diverse range of student perspectives to aid their decision-making process.
            </p>
            
            <p>
              By using this site, you acknowledge that you are reading subjective opinions and agree not to hold this website or its creators liable for any consequences arising from the content. We encourage respectful and constructive contributions.
            </p>
          </div>
          
          <div className="flex justify-center pt-6">
            <Button 
              onClick={onAccept}
              className="px-8 py-3 text-lg bg-blue-600 hover:bg-blue-700"
            >
              I Understand and Accept
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
