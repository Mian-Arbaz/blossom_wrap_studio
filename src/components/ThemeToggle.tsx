import React from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { theme, setTheme, actualTheme } = useTheme();

  const themes = [
    { value: 'light', icon: Sun, label: 'Light' },
    { value: 'dark', icon: Moon, label: 'Dark' },
    { value: 'system', icon: Monitor, label: 'System' }
  ] as const;

  return (
    <div className="relative">
      <div className="flex items-center bg-gray-100 dark:bg-dark-surface-secondary rounded-lg p-1">
        {themes.map(({ value, icon: Icon, label }) => (
          <button
            key={value}
            onClick={() => setTheme(value)}
            className={`
              flex items-center justify-center w-8 h-8 rounded-md transition-all duration-200
              ${theme === value 
                ? 'bg-white dark:bg-dark-surface-tertiary shadow-sm text-dark-gray dark:text-dark-text-primary' 
                : 'text-gray-600 dark:text-dark-text-tertiary hover:text-dark-gray dark:hover:text-dark-text-secondary'
              }
            `}
            title={label}
            aria-label={`Switch to ${label.toLowerCase()} theme`}
          >
            <Icon size={16} />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemeToggle;