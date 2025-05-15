import { Edit, Mic } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useUser } from "../context/userContext";

export default function ProfilePanel() {
    const { user } = useUser();
    const { name, email , profilePicture} = user || {};
    return (
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-lg flex justify-between items-center">
                    Profile Overview
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit profile</span>
                    </Button>
                </CardTitle>
            </CardHeader>
            <CardContent className="pb-2">
                <div className="flex flex-col items-center">
                    <Avatar className="h-20 w-20 mb-4">
                        <AvatarImage src={profilePicture} alt="User" />
                        <AvatarFallback className="text-lg">JD</AvatarFallback>
                    </Avatar>
                    <h3 className="font-bold text-xl">{name}</h3>
                    <p className="text-muted-foreground mb-2">{email}</p>
                    <Badge className="bg-[#FFCB47] hover:bg-[#E6B840] mb-4">Premium Member</Badge>

                    <div className="w-full space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Member since:</span>
                            <span>Jan 15, 2023</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Location:</span>
                            <span>San Francisco, CA</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Education:</span>
                            <span>B.S. Computer Science</span>
                        </div>
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <Button className="w-full bg-[#FFCB47] hover:bg-[#E6B840] text-[#1B1B1B]">
                    <Mic className="mr-2 h-4 w-4" />
                    Check-in with Mr. Elite
                </Button>
            </CardFooter>
        </Card>
    );
}