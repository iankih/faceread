import React from 'react'
import { useTranslation } from 'react-i18next'

const AppFooter: React.FC = () => {
  const { t } = useTranslation()

  return (
    <footer className="mt-auto bg-input border-t border-gray-100 py-6">
      <div className="container mx-auto px-4 text-center text-sm text-foreground">
        <p>
          {t('footer.madeBy')} | {t('footer.version', { version: '0.1.0-beta' })}{' '}
          | {t('footer.build', { date: '2025-07-17' })} |{' '}
          {t('footer.contact', { email: 'support@faceread.com' })}
        </p>
        <p className="mt-1">
          <a href="#" className="hover:underline">
            {t('footer.privacyPolicy')}
          </a>{' '}
          |{' '}
          <a href="#" className="hover:underline">
            {t('footer.termsOfService')}
          </a>{' '}
          |{' '}
          <a
            href="https://github.com/your-repo"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            {t('footer.githubSource')}
          </a>
        </p>
      </div>
    </footer>
  )
}

export default AppFooter