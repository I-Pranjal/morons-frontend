import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

export default function SkillTracker() {
    const skills = [
        { name: "Technical skills", level: "85%", progress: 85, trending: "up" },
        { name: "Work Experience", level: "65%", progress: 65, trending: "up" },
        { name: "Education", level: "30%", progress: 30, trending: "neutral" },
        { name: "Projects", level: "70%", progress: 70, trending: "up" },
        { name: "Soft Skills", level: "60%", progress: 60, trending: "up" },
    ];

    return (
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-lg">Skill Tracker</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {skills.map((skill, index) => (
                        <div key={index}>
                            <div className="flex justify-between items-center mb-1">
                                <div className="flex items-center">
                                    <span className="font-medium text-sm">{skill.name}</span>
                                    {skill.trending === "up" && (
                                        <Badge className="ml-2 bg-green-100 hover:bg-green-100 text-green-800 text-xs px-1.5">↑</Badge>
                                    )}
                                </div>
                                <span className="text-xs text-muted-foreground">{skill.level}</span>
                            </div>
                            <Progress
                                value={skill.progress}
                                className="h-2 bg-gray-100 dark:bg-gray-800"
                                indicatorClassName="bg-[#FFCB47]"
                            />
                        </div>
                    ))}
                </div>

                <div className="mt-4 bg-blue-50 dark:bg-blue-950/20 p-3 rounded-md">
                    <h4 className="font-medium text-sm mb-1">Learning Insights</h4>
                    <p className="text-xs">You've spent 12 hours learning this week, focusing mostly on JavaScript and React.</p>
                    <p className="text-xs mt-1 text-blue-600 dark:text-blue-400">
                        Recommendation: Increase focus on System Design.
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}