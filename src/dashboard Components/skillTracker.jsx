import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, RadialBarChart, RadialBar, PieChart, Pie, Cell } from 'recharts';

export default function SkillTracker() {
    const skills = [
        { name: "Technical skills", level: "85%", progress: 85, trending: "up" },
        { name: "Work Experience", level: "65%", progress: 65, trending: "up" },
        { name: "Education", level: "30%", progress: 30, trending: "neutral" },
        { name: "Projects", level: "70%", progress: 70, trending: "up" },
        { name: "Soft Skills", level: "60%", progress: 60, trending: "up" },
    ];

    const weeklyLearning = [
        { day: 'Mon', hours: 2 },
        { day: 'Tue', hours: 3 },
        { day: 'Wed', hours: 1 },
        { day: 'Thu', hours: 2.5 },
        { day: 'Fri', hours: 1.5 },
        { day: 'Sat', hours: 3 },
        { day: 'Sun', hours: 1 },
    ];

    const skillDistribution = [
        { name: 'JavaScript', value: 30, color: '#f59e0b' },
        { name: 'React', value: 25, color: '#3b82f6' },
        { name: 'Node.js', value: 20, color: '#10b981' },
        { name: 'Other', value: 25, color: '#9ca3af' },
    ];

    return (
        <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
            <CardHeader className="pb-2 border-b border-gray-50">
                <CardTitle className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Skill Tracker
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    {skills.map((skill, index) => (
                        <div key={index} className="p-3 bg-gray-50 rounded-lg">
                            <div className="flex justify-between items-center mb-2">
                                <div className="flex items-center">
                                    <span className="font-semibold text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                        {skill.name}
                                    </span>
                                    {skill.trending === "up" && (
                                        <Badge className="ml-2 bg-green-100 hover:bg-green-100 text-green-800 text-xs px-2 py-1">
                                            ↑
                                        </Badge>
                                    )}
                                </div>
                                <span className="font-bold text-gray-900">{skill.level}</span>
                            </div>
                            <Progress
                                value={skill.progress}
                                className="h-3 bg-gray-200 rounded-full"
                                indicatorClassName="bg-yellow-400 rounded-full"
                            />
                        </div>
                    ))}
                </div>

                <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-sm mb-3 text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        Weekly Learning Hours
                    </h4>
                    <div className="h-32 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={weeklyLearning}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                                <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                                <YAxis tick={{ fontSize: 12 }} />
                                <Bar dataKey="hours" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-sm mb-3 text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        Learning Focus Distribution
                    </h4>
                    <div className="h-32 w-full mb-3">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={skillDistribution}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={30}
                                    outerRadius={50}
                                    paddingAngle={3}
                                    dataKey="value"
                                >
                                    {skillDistribution.map((entry, index) => (
                                        <Cell key={index} fill={entry.color} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        {skillDistribution.map((item, index) => (
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

                <div className="mt-6 bg-blue-50 border border-blue-200 p-4 rounded-lg">
                    <h4 className="font-semibold text-sm mb-2 text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        Learning Insights
                    </h4>
                    <p className="text-sm text-gray-700 mb-2">
                        You've spent 12 hours learning this week, focusing mostly on JavaScript and React.
                    </p>
                    <p className="text-sm font-semibold text-blue-600">
                        Recommendation: Increase focus on System Design.
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}