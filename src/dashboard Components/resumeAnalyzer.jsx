import { ArrowUp, Download, FileText, Upload } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

export default function ResumeAnalyzer() {
    return (
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-lg">Resume Analyzer</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                        <div className="h-10 w-10 rounded-md bg-[#FFCB47]/10 flex items-center justify-center mr-3">
                            <FileText className="h-5 w-5 text-[#FFCB47]" />
                        </div>
                        <div>
                            <p className="font-medium">resume_john_v3.pdf</p>
                            <p className="text-xs text-muted-foreground">Uploaded 2 weeks ago</p>
                        </div>
                    </div>
                    <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-1" /> View
                    </Button>
                </div>

                <div className="space-y-4 mb-4">
                    <div>
                        <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">Overall Score</span>
                            <span className="text-sm font-medium">78%</span>
                        </div>
                        <Progress
                            value={78}
                            className="h-2 bg-gray-200"
                            indicatorClassName="bg-[#FFCB47]"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="bg-green-50 dark:bg-green-950/20 p-3 rounded-md">
                            <h4 className="font-medium text-sm mb-1">Strengths</h4>
                            <ul className="text-xs space-y-1">
                                <li className="flex items-center">
                                    <ArrowUp className="h-3 w-3 text-green-600 mr-1" /> Strong frontend stack
                                </li>
                                <li className="flex items-center">
                                    <ArrowUp className="h-3 w-3 text-green-600 mr-1" /> Clear project descriptions
                                </li>
                                <li className="flex items-center">
                                    <ArrowUp className="h-3 w-3 text-green-600 mr-1" /> Quantified achievements
                                </li>
                            </ul>
                        </div>

                        <div className="bg-red-50 dark:bg-red-950/20 p-3 rounded-md">
                            <h4 className="font-medium text-sm mb-1">Areas to Improve</h4>
                            <ul className="text-xs space-y-1">
                                <li className="flex items-center">
                                    <Badge className="h-1.5 w-1.5 rounded-full bg-[#CB0000] mr-1 p-0" /> Add system design projects
                                </li>
                                <li className="flex items-center">
                                    <Badge className="h-1.5 w-1.5 rounded-full bg-[#CB0000] mr-1 p-0" /> More specific tech skills
                                </li>
                                <li className="flex items-center">
                                    <Badge className="h-1.5 w-1.5 rounded-full bg-[#CB0000] mr-1 p-0" /> Improve ATS compatibility
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-medium text-sm mb-2">Callback Rate Improvement</h4>
                        <div className="bg-gray-100 dark:bg-gray-800 rounded-md p-2">
                            <div className="flex items-center justify-between text-xs">
                                <span>Initial: 12%</span>
                                <span className="text-green-600 font-medium">Current: 23%</span>
                                <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 px-2 py-0.5 rounded-full text-xs">
                                    +11%
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <Button className="w-full">
                    <Upload className="mr-2 h-4 w-4" /> Upload New Resume
                </Button>
            </CardFooter>
        </Card>
    );
}