import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Check,
  MessageSquare,
  Video,
  Link,
  CreditCard,
  Languages,
  Code,
  Bell
} from "lucide-react";

export default function FeatureSection() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const features = [
    {
      icon: <CreditCard className="w-8 h-8 text-gray-700" />,
      title: "Instant Resume Parsing",
      description: "Upload your CV and get instant feedback on structure and keywords.",
      hoverData: {
        statistic: "Parsed in <1s",
        users: "20K+ professionals",
        integrations: "PDF, DOCX & TXT support"
      }
    },
    {
      icon: <MessageSquare className="w-8 h-8 text-gray-700" />,
      title: "Personalized AI Assistance",
      description: "Real-time suggestions tailored to your job profile and goals.",
      hoverData: {
        statistic: "98% recommendation accuracy",
        users: "15K+ active mentees",
        integrations: "Slack, Teams & Email"
      }
    },
    {
      icon: <Bell className="w-8 h-8 text-gray-700" />,
      title: "Smart Reminders",
      description: "Never miss a session—get warm, AI-timed nudges before every meeting.",
      hoverData: {
        statistic: "85% reduced no-shows",
        users: "10K+ reminders sent/day",
        integrations: "SMS, Email & Push"
      }
    },
    {
      icon: <Code className="w-8 h-8 text-gray-700" />,
      title: "Deep Dashboard Analytics",
      description: "Visualize your progress with job-profile specific charts and insights.",
      hoverData: {
        statistic: "5+ interactive charts",
        users: "8K+ data-driven users",
        integrations: "CSV export & API access"
      }
    },
    {
      icon: <Languages className="w-8 h-8 text-gray-700" />,
      title: "Multilingual Support",
      description: "Get guidance and parsing in 65+ languages for a global career.",
      hoverData: {
        statistic: "65+ languages",
        users: "30M+ global profiles",
        integrations: "Auto-translate your CV"
      }
    },
    {
      icon: <Link className="w-8 h-8 text-gray-700" />,
      title: "Easy Embed Widget",
      description: "Add a “Book a Session” widget directly into your website or portfolio.",
      hoverData: {
        statistic: "3-line embed code",
        users: "5K+ active embeds",
        integrations: "React, Vue, plain HTML"
      }
    },
    {
      icon: <Check className="w-8 h-8 text-gray-700" />,
      title: "Custom Mentor Links",
      description: "Share a personalized URL so mentees always find your page.",
      hoverData: {
        statistic: "1K+ custom URLs created",
        users: "4K+ daily visits",
        integrations: "Custom domains supported"
      }
    },
    {
      icon: <Video className="w-8 h-8 text-gray-700" />,
      title: "Privacy & Security",
      description: "Bank-grade encryption ensures your data stays safe and confidential.",
      hoverData: {
        statistic: "256-bit AES",
        users: "1M+ secure sessions",
        integrations: "GDPR & CCPA compliant"
      }
    }
  ];

  return (
    <section className="w-full py-12 border-2 border-dashed border-gray-300 rounded-xl my-8">
      <div className="container px-4 md:px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 font-poppins">
          And that’s just the beginning…
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="bg-white border border-gray-200 transition-all duration-300 hover:shadow-lg cursor-pointer"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="bg-gray-100 rounded-md p-4 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2 font-poppins">
                  {feature.title}
                </h3>

                {hoveredIndex === index ? (
                  <div className="mt-4 space-y-2 animate-fadeIn font-poppins">
                    <p className="text-sm font-medium text-yellow-600">
                      {feature.hoverData.statistic}
                    </p>
                    <p className="text-sm text-gray-600">
                      {feature.hoverData.users}
                    </p>
                    <p className="text-xs text-gray-500">
                      {feature.hoverData.integrations}
                    </p>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 font-poppins">
                    {feature.description}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}