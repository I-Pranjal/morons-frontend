// src/components/TrustStrip.jsx
import React, { useState, useEffect } from 'react';

const TrustStrip = () => {
  const backers = [
    "https://www.health-thing.com/wp-content/uploads/2023/07/MS_Startups_Celebration_Badge_Dark.png",
    "https://www.iiitd.ac.in/sites/default/files/images/logo/style1colorlarge.png",
    "https://www.serversimply.com/media/20181218-Nvidia-Inception.png",
  ];

  const universities = [
    "IIT Delhi", "IIT Kanpur", "NIT Sikkim", "Banasthali",
    "GL Bajaj", "NIET", "IIITD", "DTU", "NSUT", "BML Munjal"
  ];

  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setScrollPosition(prev => prev + 0.5);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 bg-muted/3 border-y border-muted/20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center space-y-12">
          {/* Recognized & Backed by */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-6 uppercase tracking-wider">
              Recognized &amp; Backed by
            </h3>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
              {backers.map((backer, idx) => (
                <span
                  key={idx}
                  className="text-sm font-medium text-foreground/60 hover:text-foreground transition-all duration-300 hover:scale-105 cursor-default"
                >
                  <img 
                  src={backer}
                  className='inline-block md:w-28 mr-2 w-20'
                  />
                </span>
              ))}
            </div>
          </div>

          {/* Universities marquee */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-6 uppercase tracking-wider">
              Early Users From
            </h3>
            <div className="relative overflow-hidden h-8">
              <div
                className="flex space-x-12 absolute whitespace-nowrap"
                style={{
                  transform: `translateX(-${scrollPosition}px)`,
                  width: 'max-content'
                }}
              >
                {[...universities, ...universities, ...universities].map((uni, idx) => (
                  <span
                    key={idx}
                    className="text-sm font-medium text-foreground/50 hover:text-foreground transition-colors duration-300"
                  >
                    {uni}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustStrip;
