import { Edit, Mic } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useUser } from "../context/userContext";
import { Link } from "react-router-dom";

export default function ProfilePanel() {
    const { user } = useUser();
    const { name, email, profilePictureUrl } = user || {};

    return (
        <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
            <CardHeader className="pb-2 border-b border-gray-50">
                <CardTitle className="text-xl font-bold flex justify-between items-center text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Profile Overview
                    <Button variant="ghost" size="icon" className="h-9 w-9 hover:bg-gray-100">
                     <Link to='/settings' >   <Edit className="h-5 w-5 text-gray-600" />    </Link>
                        <span className="sr-only">Edit profile</span>
                    </Button>
                </CardTitle>
            </CardHeader>
            <CardContent className="pb-2">
                <div className="flex flex-col items-center">
                    <Avatar className="h-24 w-24 mb-4 shadow-md">
                        <AvatarImage src={profilePictureUrl} alt="User" />
                        <AvatarFallback className="text-xl font-bold bg-gray-100 text-gray-700">JD</AvatarFallback>
                    </Avatar>
                    <h3 className="font-bold text-2xl text-gray-900 mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        {name || "John Doe"}
                    </h3>
                    <p className="text-gray-600 mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        {email || "john.doe@example.com"}
                    </p>
                    <Badge className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold mb-4 px-4 py-2">
                        Premium Member
                    </Badge>

                    <div className="w-full space-y-3 text-sm">
                        <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                            <span className="text-gray-600">Member since:</span>
                            <span className="font-semibold text-gray-900">Jan 15, 2025</span>
                        </div>
                        <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                            <span className="text-gray-600">Location:</span>
                            <span className="font-semibold text-gray-900">India</span>
                        </div>
                        <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                            <span className="text-gray-600">Education:</span>
                            <span className="font-semibold text-gray-900">B.tech.</span>
                        </div>
                    </div>
                </div>
            </CardContent>
                <Link to='/jarvis' >
            <CardFooter>
                <Button className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-3 transition-colors duration-200" 
                        style={{ fontFamily: 'Poppins, sans-serif' }}>
                    <Mic className="mr-2 h-4 w-4" />
                    Back to chat 
                </Button>
            </CardFooter>
                </Link>
        </Card>
    );
}