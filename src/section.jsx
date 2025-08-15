import React, { useState } from "react";
import personaPrompt from "./personaPrompt";

export default function Sections() {
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (index) => {
    setExpandedSection(expandedSection === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {personaPrompt.sections.map((section, index) => (
        <div
          key={index}
          className="bg-white p-4 rounded shadow hover:shadow-lg transition cursor-pointer"
          onClick={() => toggleSection(index)}
        >
          <h2 className="text-xl font-semibold">{section.title}</h2>
          {expandedSection === index && (
            <ul className="mt-2 list-disc list-inside space-y-1">
              {section.lines.map((line, i) => (
                <li key={i} className="text-gray-700">
                  {line}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
