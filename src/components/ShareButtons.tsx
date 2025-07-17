import React from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Twitter, Link, MessageCircle } from 'lucide-react'
import { toast } from 'sonner'

interface ShareButtonsProps {
  shareText: string
  shareUrl: string
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ shareText, shareUrl }) => {
  const { t } = useTranslation()

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      toast(t('share.copyLinkSuccess'), {
        description: t('share.copyLinkDescription'),
      })
    } catch (err) {
      console.error('Failed to copy: ', err)
      toast(t('share.copyLinkFail'), {
        description: t('share.copyLinkFailDescription'),
        action: { label: t('common.confirm') },
        duration: 5000,
      })
    }
  }

  const handleTwitterShare = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      shareText
    )}&url=${encodeURIComponent(shareUrl)}`
    window.open(url, '_blank', 'width=600,height=400')
  }

  const handleKakaoShare = () => {
    // TODO: Kakao SDK 연동 필요
    toast(t('share.kakaoNotReady'), {
      description: t('share.kakaoNotReadyDescription'),
    })
  }

  return (
    <div className="flex justify-center items-center gap-4">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={handleKakaoShare}
              variant="outline"
              size="icon"
              className="w-14 h-14 rounded-full border-2 hover:bg-primary/10 hover:text-primary hover:border-primary/30 focus-visible:ring-primary"
              aria-label={t('share.kakao')}
            >
              <MessageCircle className="h-6 w-6" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{t('share.kakao')}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={handleTwitterShare}
              variant="outline"
              size="icon"
              className="w-14 h-14 rounded-full border-2 hover:bg-primary/10 hover:text-primary hover:border-primary/30 focus-visible:ring-primary"
              aria-label={t('share.twitter')}
            >
              <Twitter className="h-6 w-6" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{t('share.twitter')}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={handleCopyLink}
              variant="outline"
              size="icon"
              className="w-14 h-14 rounded-full border-2 hover:bg-primary/10 hover:text-primary hover:border-primary/30 focus-visible:ring-primary"
              aria-label={t('share.copyLink')}
            >
              <Link className="h-6 w-6" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{t('share.copyLink')}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}

export default ShareButtons
