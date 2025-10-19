import React from "react";
import { Anton } from "next/font/google";

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

interface WidgetProps {
  title?: string;
  children: React.ReactNode;
}

const Widget: React.FC<WidgetProps> = ({ title, children }) => {
  return (
    <div className="p-0 bg-gray-50 border border-gray-400 mb-4">
      {title && (
        <div
          className={`text-xl bg-[#d40000] py-2 px-3 mx-[-5px] my-4 widget-title-shadow leading-tight text-white widget-text-shadow ${anton.className}`}
        >
          {title}
        </div>
      )}
      <div className="py-2 px-1.5 text-gray-700">{children}</div>
    </div>
  );
};

export default Widget;
