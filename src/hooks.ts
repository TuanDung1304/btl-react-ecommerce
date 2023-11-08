import { useCallback, useEffect } from 'react'
import { client as filestack } from 'filestack-react'

export const useDocumentTitle = (title: string) => {
  return useEffect(() => {
    document.title = title
  }, [title])
}

export const useFilestack = () => {
  const client = filestack.init('AdycHUcHuRhacN6VSzxRYz')
  return useCallback((props?: filestack.PickerOptions) => {
    return client.picker({
      ...props,
    })
  }, [])
}
