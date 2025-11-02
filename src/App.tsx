import React, { useState, useEffect } from 'react';
import Checkbox from './components/Checkbox';
import './index.css';
import clsx from 'clsx';
import djeday from './assets/djeday.jpg';
import sith from './assets/sith.jpg';

const App: React.FC = () => {
  // Load initial state from localStorage
  const savedDays = localStorage.getItem('novemberChallengeDays');
  const savedIsJedi = localStorage.getItem('novemberChallengeIsJedi');
  const savedLastChecked = localStorage.getItem('novemberChallengeLastChecked');
  const savedHasGivenUp = localStorage.getItem('novemberChallengeHasGivenUp');
  const savedAnimationPlayed = localStorage.getItem('novemberChallengeAnimationPlayed');

  const [days, setDays] = useState(savedDays ? JSON.parse(savedDays) : Array(31).fill(false));
  const [isJedi, setIsJedi] = useState(savedIsJedi ? JSON.parse(savedIsJedi) : true);
  const [lastChecked, setLastChecked] = useState(savedLastChecked ? JSON.parse(savedLastChecked) : -1);
  const [hasGivenUp, setHasGivenUp] = useState(savedHasGivenUp ? JSON.parse(savedHasGivenUp) : false);
  const [animationPlayed, setAnimationPlayed] = useState(savedAnimationPlayed ? JSON.parse(savedAnimationPlayed) : false);

  useEffect(() => {
    // If the user has given up
    if (hasGivenUp) {
      // If animation hasn't been played in this session, play it
      if (!animationPlayed) {
        setTimeout(() => {
          const mainDiv = document.querySelector('.main-container');
          if (mainDiv) {
            mainDiv.classList.add('flash-animation');
          }

          const checkboxes = document.querySelectorAll('.checkbox-item');
          checkboxes.forEach((checkbox, index) => {
            setTimeout(() => {
              (checkbox as HTMLElement).classList.add('fall-down');
              // Also hide the day number
              const daySpan = checkbox.nextElementSibling;
              if (daySpan && daySpan.tagName === 'SPAN') {
                daySpan.classList.add('fall-down');
              }
            }, index * 50);
          });

          // After animation completes, hide all checkboxes and day numbers
          setTimeout(() => {
            const allCheckboxes = document.querySelectorAll('.checkbox-item');
            allCheckboxes.forEach(checkbox => {
              checkbox.classList.add('hidden');
              const daySpan = checkbox.nextElementSibling;
              if (daySpan && daySpan.tagName === 'SPAN') {
                daySpan.classList.add('hidden');
              }
            });
          }, 50 * checkboxes.length + 500); // Wait for all animations to complete + buffer

          // Mark animation as played
          setAnimationPlayed(true);
          localStorage.setItem('novemberChallengeAnimationPlayed', 'true');
        }, 0);
      } else {
        // If animation has already been played, just hide everything
        const allCheckboxes = document.querySelectorAll('.checkbox-item');
        allCheckboxes.forEach(checkbox => {
          checkbox.classList.add('hidden');
          const daySpan = checkbox.nextElementSibling;
          if (daySpan && daySpan.tagName === 'SPAN') {
            daySpan.classList.add('hidden');
          }
        });
      }
    }
  }, [hasGivenUp, animationPlayed]);

  useEffect(() => {
    localStorage.setItem('novemberChallengeDays', JSON.stringify(days));
    localStorage.setItem('novemberChallengeIsJedi', JSON.stringify(isJedi));
    localStorage.setItem('novemberChallengeLastChecked', JSON.stringify(lastChecked));
    localStorage.setItem('novemberChallengeHasGivenUp', JSON.stringify(hasGivenUp));
    localStorage.setItem('novemberChallengeAnimationPlayed', JSON.stringify(animationPlayed));
  }, [days, isJedi, lastChecked, hasGivenUp, animationPlayed]);

  const handleCheckboxChange = (index: number, checked: boolean) => {
    if (index === 0 || (index === lastChecked + 1 && checked) || !checked) {
      const newDays = [...days];
      newDays[index] = checked;
      setDays(newDays);
      setLastChecked(checked ? index : lastChecked);
    }
  };

  const handleGiveUp = () => {
    setIsJedi(false);
    setHasGivenUp(true);
    // Add animation logic here
    const mainDiv = document.querySelector('.main-container');
    if (mainDiv) {
      mainDiv.classList.add('flash-animation');
    }

    const checkboxes = document.querySelectorAll('.checkbox-item');
    checkboxes.forEach((checkbox, index) => {
      setTimeout(() => {
        (checkbox as HTMLElement).classList.add('fall-down');
        // Also hide the day number
        const daySpan = checkbox.nextElementSibling;
        if (daySpan && daySpan.tagName === 'SPAN') {
          daySpan.classList.add('fall-down');
        }
      }, index * 50);
    });

    // After animation completes, hide all checkboxes and day numbers
    setTimeout(() => {
      const allCheckboxes = document.querySelectorAll('.checkbox-item');
      allCheckboxes.forEach(checkbox => {
        checkbox.classList.add('hidden');
        const daySpan = checkbox.nextElementSibling;
        if (daySpan && daySpan.tagName === 'SPAN') {
          daySpan.classList.add('hidden');
        }
      });
    }, 50 * checkboxes.length + 500); // Wait for all animations to complete + buffer
  };

  return (
    <div className={`min-h-screen ${isJedi ? 'bg-gray-900' : 'bg-red-900'} flex flex-col items-center justify-center p-4 main-container`}>
      <div className="absolute inset-0 w-full h-full z-10">
        <img
          src={isJedi ? djeday : sith}
          alt={isJedi ? 'Jedi' : 'Sith'}
          className="w-full h-full object-cover opacity-70"
        />
      </div>
      <div className='relative z-20 flex flex-col items-center justify-center'>
        <p className={clsx(' text-4xl mb-6',
          hasGivenUp ? 'text-red-200' : 'text-white'
        )}>{!hasGivenUp ? 'Джедай' : 'Ситх'}</p>
        <div className="grid grid-cols-7 gap-4 mb-8">
          {days.map((checked: boolean, index: number) => (
            <Checkbox
              key={index}
              checked={checked}
              onChange={(newChecked) => handleCheckboxChange(index, newChecked)}
              day={index + 1}
            />
          ))}
        </div>
        {!hasGivenUp && (
          <button
            onClick={handleGiveUp}
            className="bg-red-600/30 border border-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-600/40 transition-colors"
          >
            Сдаться
          </button>
        )}
      </div>
    </div>
  );
};

export default App;
