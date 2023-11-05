import { useEffect } from 'react'

export const useDocumentTitle = (title: string) => {
  return useEffect(() => {
    document.title = title
  }, [title])
}
