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
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-lg flex justify-between items-center">
                    Career Roadmap
                    <Badge className="bg-[#FFCB47] hover:bg-[#E6B840]">SDE Backend Path</Badge>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-5">
                    {roadmapSteps.map((step, index) => (
                        <div key={index} className={`relative ${step.current ? "pl-0" : "pl-0"}`}>
                            <div className="flex items-start mb-1">
                                <div
                                    className={`h-6 w-6 rounded-full flex items-center justify-center mr-2 flex-shrink-0 
                                    ${
                                        step.completed
                                            ? "bg-green-100 dark:bg-green-900"
                                            : step.current
                                            ? "bg-[#FFCB47]/20"
                                            : "bg-gray-100 dark:bg-gray-800"
                                    }`}
                                >
                                    {step.completed ? (
                                        <Check className="h-3 w-3 text-green-600" />
                                    ) : (
                                        <span className={`text-xs font-medium ${step.current ? "text-[#FFCB47]" : "text-gray-500"}`}>
                                            {index + 1}
                                        </span>
                                    )}
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-center">
                                        <h4 className={`font-medium ${step.current ? "text-[#FFCB47]" : ""}`}>{step.title}</h4>
                                        <span className="text-xs text-muted-foreground">{step.timeframe}</span>
                                    </div>
                                    <div className="mt-1">
                                        <Progress
                                            value={step.progress}
                                            className="h-1.5 bg-gray-100 dark:bg-gray-800"
                                            indicatorClassName={`${step.completed ? "bg-green-500" : "bg-[#FFCB47]"}`}
                                        />
                                    </div>
                                </div>
                            </div>

                            {step.current && (
                                <div className="ml-8 mt-2 text-sm border-l-2 border-[#FFCB47]/30 pl-3 py-1">
                                    <p className="text-xs mb-1">Current focus:</p>
                                    <ul className="space-y-1 text-xs">
                                        <li className="flex items-center">
                                            <ChevronRight className="h-3 w-3 text-[#FFCB47] mr-1" />
                                            Complete the e-commerce API project
                                        </li>
                                        <li className="flex items-center">
                                            <ChevronRight className="h-3 w-3 text-[#FFCB47] mr-1" />
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