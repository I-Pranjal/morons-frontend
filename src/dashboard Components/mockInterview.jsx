import { Calendar, Clock } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export default function MockInterviews() {
    return (
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-lg">Mock Interview Manager</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="bg-[#FFCB47]/10 p-3 rounded-md">
                        <div className="flex items-center mb-2">
                            <Clock className="h-4 w-4 text-[#FFCB47] mr-2" />
                            <h4 className="font-medium text-sm">Next Interview</h4>
                        </div>
                        <p className="text-sm mb-1">System Design Interview</p>
                        <div className="flex items-center text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3 mr-1" />
                            <span>Thursday, May 12 • 3:00 PM</span>
                        </div>
                        <div className="mt-2">
                            <div className="flex justify-between text-xs mb-1">
                                <span>2 days remaining</span>
                            </div>
                            <Progress
                                value={33}
                                className="h-1.5 bg-gray-200"
                                indicatorClassName="bg-[#FFCB47]"
                            />
                        </div>
                    </div>

                    <div>
                        <h4 className="font-medium text-sm mb-2">Last Session Score</h4>
                        <div className="flex items-center">
                            <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3">
                                <span className="font-bold text-blue-600 dark:text-blue-400">7.5</span>
                            </div>
                            <div className="text-xs">
                                <p className="font-medium">Frontend Technical Interview</p>
                                <p className="text-muted-foreground mt-0.5">Work on system design structure</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-medium text-sm mb-2">Interview History</h4>
                        <div className="space-y-2">
                            {[
                                { type: "Behavioral", date: "Apr 28", score: 8.0 },
                                { type: "Frontend Technical", date: "Apr 15", score: 7.5 },
                                { type: "Algorithms", date: "Mar 30", score: 6.5 },
                            ].map((interview, index) => (
                                <div
                                    key={index}
                                    className="flex justify-between items-center text-xs p-2 bg-gray-50 dark:bg-gray-800 rounded"
                                >
                                    <span>{interview.type}</span>
                                    <span className="text-muted-foreground">{interview.date}</span>
                                    <span
                                        className={`font-medium ${
                                            interview.score >= 8
                                                ? "text-green-600"
                                                : interview.score >= 7
                                                ? "text-blue-600"
                                                : "text-orange-500"
                                        }`}
                                    >
                                        {interview.score}/10
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <Button className="w-full">Schedule Mock Interview</Button>
            </CardFooter>
        </Card>
    );
}