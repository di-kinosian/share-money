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

interface UseModalsResult<T> {
  open: (name: T) => void
  close: (name: T) => void
  isOpen: (name: T) => boolean
}

export function useModals<T extends string>(...names: T[]): UseModalsResult<T> {
  const [state, setState] = useState<Record<T, boolean>>(names.reduce((acc, curr) => ({ ...acc, [curr]: false }), {} as Record<T, boolean>))

  const open = useCallback((name: T) => { setState({ ...state, [name]: true }) }, [state])
  const close = useCallback((name: T) => { setState({ ...state, [name]: false }) }, [state])
  const isOpen = useCallback((name: T) => state[name], [state])

  return { open, close, isOpen }
}