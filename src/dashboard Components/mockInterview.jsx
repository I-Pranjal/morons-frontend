import { Calendar, Clock, BarChart, TrendingUp } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

export default function MockInterviews() {
    const performanceData = [
        { name: 'Mar 15', score: 5.5 },
        { name: 'Mar 30', score: 6.5 },
        { name: 'Apr 15', score: 7.5 },
        { name: 'Apr 28', score: 8.0 },
        { name: 'May 12', score: 7.8 },
    ];

    return (
        <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
            <CardHeader className="pb-2 border-b border-gray-50">
                <CardTitle className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Mock Interview Manager
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                        <div className="flex items-center mb-3">
                            <Clock className="h-5 w-5 text-yellow-600 mr-2" />
                            <h4 className="font-semibold text-sm text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                Next Interview
                            </h4>
                        </div>
                        <p className="font-semibold text-gray-900 mb-1">System Design Interview</p>
                        <div className="flex items-center text-sm text-gray-600 mb-3">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>Thursday, May 12 • 3:00 PM</span>
                        </div>
                        <div className="mt-3">
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-gray-700">Preparation time</span>
                                <span className="font-semibold text-gray-900">2 days remaining</span>
                            </div>
                            <Progress
                                value={33}
                                className="h-3 bg-gray-100 rounded-full"
                                indicatorClassName="bg-yellow-400 rounded-full"
                            />
                        </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-sm mb-3 text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            Performance Trend
                        </h4>
                        <div className="h-40 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={performanceData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                                    <YAxis tick={{ fontSize: 12 }} domain={[0, 10]} />
                                    <Line 
                                        type="monotone" 
                                        dataKey="score" 
                                        stroke="#f59e0b" 
                                        strokeWidth={3}
                                        dot={{ fill: '#f59e0b', strokeWidth: 2, r: 6 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold text-sm mb-3 text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            Last Session Score
                        </h4>
                        <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                            <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                                <span className="font-bold text-2xl text-blue-600">7.5</span>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900">Frontend Technical Interview</p>
                                <p className="text-sm text-gray-600 mt-1">Work on system design structure</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold text-sm mb-3 text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            Interview History
                        </h4>
                        <div className="space-y-2">
                            {[
                                { type: "Behavioral", date: "Apr 28", score: 8.0 },
                                { type: "Frontend Technical", date: "Apr 15", score: 7.5 },
                                { type: "Algorithms", date: "Mar 30", score: 6.5 },
                            ].map((interview, index) => (
                                <div
                                    key={index}
                                    className="flex justify-between items-center p-3 bg-gray-50 hover:bg-gray-100 transition-colors duration-200 rounded-lg border border-gray-100"
                                >
                                    <span className="font-medium text-gray-900">{interview.type}</span>
                                    <span className="text-sm text-gray-600">{interview.date}</span>
                                    <span
                                        className={`font-bold text-lg ${
                                            interview.score >= 8
                                                ? "text-green-600"
                                                : interview.score >= 7
                                                ? "text-blue-600"
                                                : "text-yellow-600"
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
                <Button className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-3 transition-colors duration-200" 
                        style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Schedule Mock Interview
                </Button>
            </CardFooter>
        </Card>
    );
}