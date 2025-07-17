import React, { useState, useEffect } from 'react'
import { AlertCircle } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface AdBannerProps {
  className?: string;
  height?: string; // New prop for height adjustment
}

const AdBanner: React.FC<AdBannerProps> = ({ className = '', height = '90px' }) => {
  const { t } = useTranslation()
  const [adLoaded, setAdLoaded] = useState(false) // State to manage ad loading

  // In a real scenario, this would be triggered by Google AdSense events
  // For demonstration, let's simulate ad loading after a delay
  useEffect(() => {
    // Example: Simulate ad loading after 3 seconds
    // const timer = setTimeout(() => {
    //   setAdLoaded(true);
    // }, 3000);
    // return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`w-full bg-input border-b border-gray-200 ${className}`} style={{ height: adLoaded ? height : '60px' }}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-center min-h-[60px] rounded-lg">
          {adLoaded ? (
            // Actual Google AdSense Responsive Ad Code will be placed here
            // This div acts as a placeholder for the loaded ad unit
            <div className="w-full h-[90px] flex items-center justify-center bg-gray-100 text-gray-500">
              Google AdSense Ad Unit
            </div>
          ) : (
            // Display only the "no ad message" when no ad is loaded
            <div className="text-sm font-medium text-gray-500 text-center py-2 px-4">
              {t('ad.noAdMessage')}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdBanner