import { useCallback, useEffect, useState } from "react"

export const useModalState = () => {
  const [isOpen, setIsOpen] = useState(false)

  const open = useCallback(() => {
    setIsOpen(true)
  }, [setIsOpen])

  const close = useCallback(() => {
    setIsOpen(false)
  }, [setIsOpen])

  return {
    isOpen,
    open,
    close
  }
}

export const useDisableScroll = (condition: boolean) => {
  useEffect(() => {
    if (condition) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [condition])

  useEffect(() => () => {
    document.body.style.overflow = 'auto';
  }, [])
}