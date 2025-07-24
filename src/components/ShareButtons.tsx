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
        action: { 
          label: t('common.confirm'),
          onClick: () => {} 
        },
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
    const kakaoUrl = `https://story.kakao.com/share?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`
    window.open(kakaoUrl, '_blank', 'width=600,height=400')
  }

  const shareButtonClass = "w-12 h-12 rounded-xl border-2 border-border bg-card text-muted-foreground hover:bg-primary/10 hover:text-primary hover:border-primary/50 focus-visible:ring-primary transition-all duration-200"

  return (
    <div className="flex justify-center items-center gap-3">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={handleKakaoShare}
              variant="ghost"
              size="icon"
              className={shareButtonClass}
              aria-label={t('share.kakao')}
            >
              <MessageCircle className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{t('share.kakao')}</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={handleTwitterShare}
              variant="ghost"
              size="icon"
              className={shareButtonClass}
              aria-label={t('share.twitter')}
            >
              <Twitter className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{t('share.twitter')}</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={handleCopyLink}
              variant="ghost"
              size="icon"
              className={shareButtonClass}
              aria-label={t('share.copyLink')}
            >
              <Link className="h-5 w-5" />
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
