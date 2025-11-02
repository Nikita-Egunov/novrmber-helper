import React from 'react';

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  day: number;
}

const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange, day }) => {
  return (
    <label className="flex flex-col items-center space-y-2 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="hidden"
      />
      <div className={`checkbox-item w-12 h-12 rounded-full border-2 transition-all duration-300 ${checked ? 'checked bg-blue-600 border-blue-600' : 'bg-gray-700 border-gray-600'}`}>
        {checked && (
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        )}
      </div>
      <span className="text-sm text-gray-300">{day}</span>
    </label>
  );
};

export default Checkbox;
