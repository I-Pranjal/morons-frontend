import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Video, MessageSquare, Phone, Users } from "lucide-react";

export default function SchedulingWorkflow() {
  return (
    <section className="w-full py-12 border-2 border-dashed border-gray-300 rounded-xl my-8">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-yellow-100 text-yellow-900 font-poppins">
            How it works
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-poppins">
            Your personalized journey starts here
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-poppins">
            We’ve simplified how you connect with Mr. Elite—because career growth should feel guided, not overwhelming.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {/* Step 1 */}
          <Card className="border border-gray-200">
            <CardContent className="p-6">
              <div className="bg-yellow-100 w-8 h-8 rounded-full flex items-center justify-center mb-4">
                <span className="font-semibold font-poppins">01</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 font-poppins">
                Sync your calendar
              </h3>
              <p className="text-gray-600 mb-6 font-poppins">
                We work silently behind the scenes to align with your schedule—no overlaps, no hassle.
              </p>

              <div className="mt-8 flex justify-center relative">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white rounded-full border border-gray-200 px-4 py-2">
                      <span className="font-medium font-poppins">Google / Outlook</span>
                    </div>
                  </div>
                  <div className="w-48 h-48 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full border-2 border-dashed border-gray-300"></div>
                  </div>
                  <div className="absolute top-1/4 right-0 bg-yellow-100 p-2 rounded-full">
                    <Calendar className="w-6 h-6 text-yellow-700" />
                  </div>
                  <div className="absolute bottom-0 right-1/4 bg-yellow-100 p-2 rounded-full">
                    <Calendar className="w-6 h-6 text-yellow-700" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Step 2 */}
          <Card className="border border-gray-200">
            <CardContent className="p-6">
              <div className="bg-yellow-100 w-8 h-8 rounded-full flex items-center justify-center mb-4">
                <span className="font-semibold font-poppins">02</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 font-poppins">
                Set your mentor time
              </h3>
              <p className="text-gray-600 mb-6 font-poppins">
                Pick slots that suit your focus hours — your AI coach adjusts to you.
              </p>

              <div className="mt-4 space-y-4">
                {["Morning Focus", "Midday Review", "Evening Sync"].map((label, idx) => (
                  <div key={idx} className="flex items-center justify-between border-b pb-2">
                    <div className="flex items-center">
                      <div className="w-6 h-6 rounded-full border border-gray-300 mr-3"></div>
                      <span className="font-poppins">{label}</span>
                    </div>
                    <span className="font-poppins text-sm text-gray-500">Flexible</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Step 3 */}
          <Card className="border border-gray-200">
            <CardContent className="p-6">
              <div className="bg-yellow-100 w-8 h-8 rounded-full flex items-center justify-center mb-4">
                <span className="font-semibold font-poppins">03</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 font-poppins">
                Choose how you connect
              </h3>
              <p className="text-gray-600 mb-6 font-poppins">
                Voice, video or chat—Mr. Elite meets you where you’re comfortable.
              </p>

              <div className="mt-4">
                <div className="flex flex-col items-center">
                  <div className="flex justify-center mb-8">
                    <div className="bg-gray-200 w-12 h-12 rounded-full mx-2"></div>
                    <div className="bg-gray-200 w-12 h-12 rounded-full mx-2"></div>
                  </div>
                  <div className="flex justify-center space-x-3">
                    <Button variant="outline" size="icon" className="rounded-full">
                      <Video className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-full">
                      <MessageSquare className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-full">
                      <Phone className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-full">
                      <Users className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
