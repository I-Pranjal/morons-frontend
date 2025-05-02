import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Bell } from "lucide-react";

export default function BookingExperience() {
  const calendarDays = [
    { day: "Mon", date: "06", events: ["Review Resume"] },
    { day: "Tue", date: "07", events: ["Mentorship Session"] },
    { day: "Wed", date: "08", events: ["AI Feedback", "Portfolio Review"] },
    { day: "Thu", date: "09", events: ["Mock Interview"] },
    { day: "Fri", date: "10", events: ["Career Strategy Call"] },
  ];

  const eventColors = {
    "Review Resume": "bg-blue-100",
    "Mentorship Session": "bg-purple-100",
    "AI Feedback": "bg-green-100",
    "Portfolio Review": "bg-teal-100",
    "Mock Interview": "bg-red-100",
    "Career Strategy Call": "bg-yellow-100",
  };

  return (
    <section className="w-full py-12 border-2 border-dashed border-gray-300 rounded-xl my-8">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left Section - AI-Powered Clarity */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 font-poppins">
              Let bookers sync their goals with your availability
            </h2>
            <p className="text-gray-600 mb-8 font-poppins">
              Empower your bookers with smart calendar overlays, intuitive reminders, and the ability to reschedule seamlessly — all backed by AI insights aligned with their career journey.
            </p>

            <div className="border-t border-gray-200 pt-6">
              <div className="flex items-center mb-4">
                <Switch id="overlay-toggle" />
                <label htmlFor="overlay-toggle" className="ml-2 font-medium font-poppins">
                  Show resume coaching slots on my calendar
                </label>
                <div className="ml-auto">
                  <Badge variant="outline" className="mr-2 bg-white">12h</Badge>
                  <Badge variant="outline" className="bg-gray-100 text-gray-500">24h</Badge>
                </div>
              </div>

              <div className="grid grid-cols-5 gap-2 mt-6">
                {calendarDays.map((day, index) => (
                  <div key={index} className="border border-gray-200 rounded">
                    <div className="p-2 text-center border-b border-gray-200">
                      <div className="text-sm text-gray-500 font-poppins">{day.day}</div>
                      <div className="font-medium font-poppins">{day.date}</div>
                    </div>
                    <div className="p-1">
                      {day.events.map((event, eventIndex) => (
                        <div 
                          key={eventIndex} 
                          className={`${eventColors[event]} text-xs p-1 mb-1 rounded font-poppins`}
                        >
                          {event}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Section - Warm Confirmation */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 font-poppins">
              Reduce no-shows with friendly, AI-backed reminders
            </h2>
            <p className="text-gray-600 mb-8 font-poppins">
              Keep your bookers in the loop with intelligent reminders via email or text, and gently nudge them with personalized follow-ups to help them prepare before each mentorship or parsing session.
            </p>

            <Card className="mt-12">
              <CardContent className="p-4">
                <div className="flex items-start">
                  <div className="bg-gray-800 text-white p-2 rounded font-semibold font-poppins">
                    AI Mentor
                  </div>
                  <div className="ml-4">
                    <div className="flex items-center justify-between w-full">
                      <h3 className="font-semibold font-poppins">New session confirmed</h3>
                      <span className="text-sm text-gray-500 font-poppins">A moment ago</span>
                    </div>
                    <p className="font-poppins">
                      Samira booked a 45min Career Mentorship session on Thu, May 2
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
