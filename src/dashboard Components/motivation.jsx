import { Heart, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function MotivationBox() {
    return (
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                    <Heart className="h-4 w-4 text-[#CB0000] mr-2" />
                    Motivation & Wellbeing
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div>
                        <h4 className="font-medium text-sm mb-2">Current Energy Level</h4>
                        <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-muted-foreground">Low</span>
                            <span className="text-xs text-muted-foreground">High</span>
                        </div>
                        <Progress
                            value={65}
                            className="h-2 bg-gray-100 dark:bg-gray-800"
                            indicatorClassName="bg-green-500"
                        />
                    </div>

                    <div>
                        <h4 className="font-medium text-sm mb-2">Weekly Mood Trend</h4>
                        <div className="grid grid-cols-7 gap-1 text-center">
                            {["M", "T", "W", "T", "F", "S", "S"].map((day, index) => (
                                <div key={index} className="text-xs">
                                    <div
                                        className={`h-10 rounded-md flex items-center justify-center mb-1 ${
                                            index === 0
                                                ? "bg-orange-100 dark:bg-orange-900/30"
                                                : index === 3
                                                ? "bg-red-100 dark:bg-red-900/30"
                                                : "bg-green-100 dark:bg-green-900/30"
                                        }`}
                                    >
                                        {index === 0 ? "😐" : index === 3 ? "😔" : "😊"}
                                    </div>
                                    <span className="text-muted-foreground">{day}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-[#FFCB47]/10 p-3 rounded-md">
                        <h4 className="font-medium text-sm mb-1">Daily Motivation</h4>
                        <p className="text-sm italic">
                            "The only way to do great work is to love what you do. If you
                            haven't found it yet, keep looking."
                        </p>
                        <p className="text-xs text-right mt-1 text-muted-foreground">
                            - Steve Jobs
                        </p>
                    </div>

                    <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded-md">
                        <h4 className="font-medium text-sm mb-1 flex items-center">
                            <TrendingUp className="h-3 w-3 text-blue-600 mr-1" />
                            Insight
                        </h4>
                        <p className="text-xs">
                            You tend to be most productive between 9-11 AM. Consider
                            scheduling challenging tasks during this time.
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}