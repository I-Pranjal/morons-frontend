import { ArrowUp, Download, FileText, Upload, TrendingUp } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { RadialBarChart, RadialBar, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';

export default function ResumeAnalyzer() {
    const overallScore = 78;
    const improvementData = [
        { name: 'Initial', value: 12 },
        { name: 'Current', value: 23 },
    ];
    
    const scoreBreakdown = [
        { name: 'Technical Skills', value: 85, color: '#10b981' },
        { name: 'Experience', value: 75, color: '#3b82f6' },
        { name: 'Projects', value: 80, color: '#f59e0b' },
        { name: 'ATS Compatibility', value: 60, color: '#ef4444' },
    ];

    return (
        <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
            <CardHeader className="pb-2 border-b border-gray-50">
                <CardTitle className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Resume Analyzer
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-between mb-6 p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                        <div className="h-12 w-12 rounded-lg bg-yellow-100 flex items-center justify-center mr-4">
                            <FileText className="h-6 w-6 text-yellow-600" />
                        </div>
                        <div>
                            <p className="font-semibold text-gray-900">resume_john_v3.pdf</p>
                            <p className="text-sm text-gray-600">Uploaded 2 weeks ago</p>
                        </div>
                    </div>
                    <Button variant="outline" size="sm" className="border-black text-black hover:bg-black hover:text-white">
                        <Download className="h-4 w-4 mr-2" /> View
                    </Button>
                </div>

                <div className="space-y-6 mb-6">
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex justify-between mb-2">
                            <span className="font-semibold text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                Overall Score
                            </span>
                            <span className="font-bold text-2xl text-gray-900">{overallScore}%</span>
                        </div>
                        <Progress
                            value={overallScore}
                            className="h-4 bg-gray-200 rounded-full"
                            indicatorClassName="bg-yellow-400 rounded-full"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                            <h4 className="font-semibold text-sm mb-3 text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                Strengths
                            </h4>
                            <ul className="space-y-2">
                                <li className="flex items-center text-sm text-gray-700">
                                    <ArrowUp className="h-4 w-4 text-green-600 mr-2" /> 
                                    Strong frontend stack
                                </li>
                                <li className="flex items-center text-sm text-gray-700">
                                    <ArrowUp className="h-4 w-4 text-green-600 mr-2" /> 
                                    Clear project descriptions
                                </li>
                                <li className="flex items-center text-sm text-gray-700">
                                    <ArrowUp className="h-4 w-4 text-green-600 mr-2" /> 
                                    Quantified achievements
                                </li>
                            </ul>
                        </div>

                        <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                            <h4 className="font-semibold text-sm mb-3 text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                Areas to Improve
                            </h4>
                            <ul className="space-y-2">
                                <li className="flex items-center text-sm text-gray-700">
                                    <Badge className="h-2 w-2 rounded-full bg-red-500 mr-2 p-0" /> 
                                    Add system design projects
                                </li>
                                <li className="flex items-center text-sm text-gray-700">
                                    <Badge className="h-2 w-2 rounded-full bg-red-500 mr-2 p-0" /> 
                                    More specific tech skills
                                </li>
                                <li className="flex items-center text-sm text-gray-700">
                                    <Badge className="h-2 w-2 rounded-full bg-red-500 mr-2 p-0" /> 
                                    Improve ATS compatibility
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-sm mb-3 text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            Skill Assessment Breakdown
                        </h4>
                        <div className="h-40 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={scoreBreakdown}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={40}
                                        outerRadius={60}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {scoreBreakdown.map((entry, index) => (
                                            <Cell key={index} fill={entry.color} />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="grid grid-cols-2 gap-2 mt-3">
                            {scoreBreakdown.map((item, index) => (
                                <div key={index} className="flex items-center text-xs">
                                    <div 
                                        className="w-3 h-3 rounded-full mr-2" 
                                        style={{ backgroundColor: item.color }}
                                    ></div>
                                    <span className="text-gray-700">{item.name}: {item.value}%</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                        <h4 className="font-semibold text-sm mb-3 flex items-center text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            <TrendingUp className="h-4 w-4 text-yellow-600 mr-2" />
                            Callback Rate Improvement
                        </h4>
                        <div className="flex items-center justify-between">
                            <div className="text-center">
                                <p className="text-2xl font-bold text-gray-900">12%</p>
                                <p className="text-sm text-gray-600">Initial</p>
                            </div>
                            <div className="text-center">
                                <p className="text-3xl font-bold text-green-600">23%</p>
                                <p className="text-sm text-gray-600">Current</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-bold text-yellow-600">+11%</p>
                                <p className="text-sm text-gray-600">Improvement</p>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <Button className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-3 transition-colors duration-200" 
                        style={{ fontFamily: 'Poppins, sans-serif' }}>
                    <Upload className="mr-2 h-4 w-4" /> Upload New Resume
                </Button>
            </CardFooter>
        </Card>
    );
}