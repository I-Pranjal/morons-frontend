import { Check, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

export default function CareerRoadmap() {
    const roadmapSteps = [
        {
            title: "Learn DSA Fundamentals",
            progress: 100,
            completed: true,
            timeframe: "Completed (8 weeks)",
            current: false,
        },
        {
            title: "Build Portfolio Projects",
            progress: 75,
            completed: false,
            timeframe: "In progress (4/6 weeks)",
            current: true,
        },
        {
            title: "Contribute to Open Source",
            progress: 0,
            completed: false,
            timeframe: "Upcoming (6 weeks)",
            current: false,
        },
        {
            title: "Interview Preparation",
            progress: 0,
            completed: false,
            timeframe: "Upcoming (4 weeks)",
            current: false,
        },
    ];

    return (
        <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
            <CardHeader className="pb-2 border-b border-gray-50">
                <CardTitle className="text-xl font-bold flex justify-between items-center text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Career Roadmap
                    <Badge className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-4 py-2 text-sm">
                        SDE Backend Path
                    </Badge>
                </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
                <div className="space-y-6">
                    {roadmapSteps.map((step, index) => (
                        <div key={index} className="relative">
                            <div className="flex items-start mb-3">
                                <div
                                    className={`h-10 w-10 rounded-full flex items-center justify-center mr-4 flex-shrink-0 shadow-sm
                                    ${
                                        step.completed
                                            ? "bg-green-500 text-white"
                                            : step.current
                                            ? "bg-yellow-400 text-black"
                                            : "bg-gray-100 text-gray-500 border-2 border-gray-200"
                                    }`}
                                >
                                    {step.completed ? (
                                        <Check className="h-5 w-5" />
                                    ) : (
                                        <span className="text-sm font-bold">
                                            {index + 1}
                                        </span>
                                    )}
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-center mb-2">
                                        <h4 className={`font-semibold text-lg ${step.current ? "text-gray-900" : "text-gray-700"}`} 
                                            style={{ fontFamily: 'Poppins, sans-serif' }}>
                                            {step.title}
                                        </h4>
                                        <span className="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
                                            {step.timeframe}
                                        </span>
                                    </div>
                                    <div className="mt-2">
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="text-gray-600">Progress</span>
                                            <span className="font-semibold text-gray-900">{step.progress}%</span>
                                        </div>
                                        <Progress
                                            value={step.progress}
                                            className="h-3 bg-gray-100 rounded-full"
                                            indicatorClassName={`${
                                                step.completed 
                                                    ? "bg-green-500" 
                                                    : step.current 
                                                    ? "bg-yellow-400" 
                                                    : "bg-gray-300"
                                            } rounded-full`}
                                        />
                                    </div>
                                </div>
                            </div>

                            {step.current && (
                                <div className="ml-14 mt-3 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                                    <p className="text-sm font-semibold text-gray-900 mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                        Current focus:
                                    </p>
                                    <ul className="space-y-2">
                                        <li className="flex items-center text-sm text-gray-700">
                                            <ChevronRight className="h-4 w-4 text-yellow-500 mr-2" />
                                            Complete the e-commerce API project
                                        </li>
                                        <li className="flex items-center text-sm text-gray-700">
                                            <ChevronRight className="h-4 w-4 text-yellow-500 mr-2" />
                                            Add authentication to your portfolio site
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}