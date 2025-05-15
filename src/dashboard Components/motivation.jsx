import { Heart, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function MotivationBox() {
  return (
    <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 h-full">
      <CardHeader className="pb-3 border-b border-gray-50">
        <CardTitle className="text-lg font-bold flex items-center text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
          <Heart className="h-5 w-5 text-red-500 mr-2" />
          Motivation & Wellbeing
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-5">
          {/* Current Energy Level */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-sm mb-3 text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Current Energy Level
            </h4>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-500">Low</span>
              <span className="text-xs text-gray-500">High</span>
            </div>
            <Progress
              value={75}
              className="h-3 bg-gray-200 rounded-full"
              indicatorClassName="bg-gradient-to-r from-yellow-400 to-green-500 rounded-full"
            />
            <div className="mt-2 text-center">
              <span className="text-sm font-semibold text-gray-900">75%</span>
            </div>
          </div>

          {/* Weekly Mood Trend */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-sm mb-3 text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Weekly Mood Trend
            </h4>
            <div className="grid grid-cols-7 gap-2">
              {[
                { day: "M", mood: "😊", color: "bg-green-100 text-green-600" },
                { day: "T", mood: "😐", color: "bg-yellow-100 text-yellow-600" },
                { day: "W", mood: "😊", color: "bg-green-100 text-green-600" },
                { day: "T", mood: "😔", color: "bg-red-100 text-red-600" },
                { day: "F", mood: "😊", color: "bg-green-100 text-green-600" },
                { day: "S", mood: "😊", color: "bg-green-100 text-green-600" },
                { day: "S", mood: "😊", color: "bg-green-100 text-green-600" },
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className={`h-10 w-10 rounded-lg ${item.color} flex items-center justify-center mb-1 text-lg`}>
                    {item.mood}
                  </div>
                  <span className="text-xs text-gray-600 font-medium">{item.day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Daily Motivation Quote */}
          <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 border border-yellow-200 p-4 rounded-lg">
            <h4 className="font-semibold text-sm mb-2 text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Daily Motivation
            </h4>
            <p className="text-sm italic text-gray-700 leading-relaxed">
              "The only way to do great work is to love what you do. If you haven't found it yet, keep looking."
            </p>
            <p className="text-xs text-right mt-2 text-gray-600 font-medium">
              - Steve Jobs
            </p>
          </div>

          {/* Insight Box */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 p-4 rounded-lg">
            <h4 className="font-semibold text-sm mb-2 flex items-center text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
              <TrendingUp className="h-4 w-4 text-blue-600 mr-2" />
              Insight
            </h4>
            <p className="text-xs text-gray-700 leading-relaxed">
              You tend to be most productive between 9-11 AM. Consider scheduling challenging tasks during this time.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}