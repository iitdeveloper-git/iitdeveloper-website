"use client";

import React from "react";
import { motion } from "framer-motion";
import { Phone } from "lucide-react";

// Custom SVG icon for WhatsApp to provide a premium and authentic look
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12.031 2c-5.516 0-9.99 4.474-9.99 9.99 0 2.028.608 3.912 1.649 5.486L2.33 22l4.697-1.336a9.905 9.905 0 0 0 4.996 1.328c5.524 0 10.007-4.474 10.007-9.99A10.015 10.015 0 0 0 12.031 2zm6.304 14.331c-.247.697-1.429 1.255-1.956 1.301-.486.041-.955.197-3.082-.638-2.723-1.07-4.474-3.83-4.606-4.01-.132-.18-1.077-1.433-1.077-2.73 0-1.298.675-1.936.914-2.199.238-.263.526-.329.7-.329.173 0 .346.008.494.016.157.008.371-.066.585.445.222.527.758 1.845.824 1.977.066.132.107.288.016.469-.09.18-.132.28-.263.428-.132.148-.271.329-.387.445-.132.132-.271.28-.115.544.156.263.692 1.137 1.483 1.837.997.881 1.846 1.153 2.11 1.285.263.132.412.107.568-.074.157-.18.667-.774.849-1.038.18-.263.363-.222.61-.132.247.09 1.569.741 1.84 1.013.272.271.272.412.206.577z" />
  </svg>
);

export default function ChatWidget() {
  // Predefined message for WhatsApp (URL encoded)
  const whatsappNumber = "917302755534";
  const whatsappMessage = encodeURIComponent(
    "Hi IITDeveloper, I would like to inquire about your services for my project."
  );
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
  const callLink = "tel:+917302755534";

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-4">
      {/* Phone Call Floating Action Button */}
      <div className="relative flex items-center group">
        {/* Label (Slides in smoothly on hover) */}
        <span className="absolute right-16 bg-background/90 border border-white/[0.08] text-foreground text-xs font-bold py-1.5 px-3.5 rounded-xl shadow-premium opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none whitespace-nowrap backdrop-blur-md">
          Call +91 73027 55534
        </span>
        {/* Circle Button */}
        <motion.a
          href={callLink}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="w-14 h-14 rounded-full flex items-center justify-center bg-secondary text-secondary-foreground shadow-glow-yellow border border-secondary/35 cursor-pointer transition-shadow duration-300"
        >
          <Phone className="w-6 h-6 flex-shrink-0" />
        </motion.a>
      </div>

      {/* WhatsApp Chat Floating Action Button */}
      <div className="relative flex items-center group">
        {/* Label (Slides in smoothly on hover) */}
        <span className="absolute right-16 bg-background/90 border border-white/[0.08] text-foreground text-xs font-bold py-1.5 px-3.5 rounded-xl shadow-premium opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none whitespace-nowrap backdrop-blur-md">
          Chat on WhatsApp
        </span>
        {/* Circle Button */}
        <motion.a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="w-14 h-14 rounded-full flex items-center justify-center bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-500/20 hover:shadow-green-500/30 border border-green-500/30 cursor-pointer transition-shadow duration-300"
        >
          <WhatsAppIcon className="w-6 h-6 flex-shrink-0" />
        </motion.a>
      </div>
    </div>
  );
}
