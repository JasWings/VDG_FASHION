import React from 'react';

const ProgressBar = ({ valueInGrams, totalKg }) => {
  // Convert grams to kilograms and ensure it's within the totalKg limit
  const valueInKg = valueInGrams / 1000;
  const valueInKgClamped = Math.min(Math.max(valueInKg, 0), totalKg);

  // Calculate the percentage and color
  const percentage = (valueInKgClamped / totalKg) * 100;
  const colorClass = percentage < 50 ? 'bg-[#ECAA00]' : 'bg-red-400';

  return (
    <div className="relative pt-1">
      <div className="flex mb-2 items-center justify-between">
        <div>
          <span className={` text-sm leading-6 font-semibold inline-block  text-[#009F7F]`}>
            {totalKg-valueInKgClamped} kg free space left
          </span>
        </div>
        <div className="text-right">
          <span className="text-xs font-semibold inline-block text-black">
            {/* {totalKg} kg */}
          </span>
        </div>
      </div>
      <div className="flex h-[9px] overflow-hidden text-xs bg-[#009F7F]">
        <div style={{ width: `${percentage}%` }} className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${colorClass}`}></div>
      </div>
    </div>
  );
};

export default ProgressBar;
