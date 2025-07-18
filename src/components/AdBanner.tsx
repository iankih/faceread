import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

interface AdBannerProps {
  className?: string;
}

const AdBanner: React.FC<AdBannerProps> = ({ className = '' }) => {
  const { t } = useTranslation()
  const [adLoaded] = useState(false) // State to manage ad loading

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
    <div className={`w-full bg-neutral-light border-b border-border ${className}`} style={{ minHeight: '90px' }}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-center min-h-[60px] rounded-lg">
          {adLoaded ? (
            // Actual Google AdSense Responsive Ad Code will be placed here
            // This div acts as a placeholder for the loaded ad unit
            <div className="w-full h-[90px] flex items-center justify-center bg-background-light text-muted-foreground border border-border rounded-md">
              Google AdSense Ad Unit
            </div>
          ) : (
            // Display only the "no ad message" when no ad is loaded
            <div className="text-sm font-medium text-muted-foreground text-center py-2 px-4 bg-background-light rounded-md border border-border">
              {t('ad.noAdMessage')}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdBanner