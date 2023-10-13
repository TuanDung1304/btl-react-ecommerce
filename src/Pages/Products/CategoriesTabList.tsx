import { Tab, Tabs } from '@mui/material'
import { SyntheticEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Categories,
  CategoriesType,
} from '../../components/Categories/categories'

interface Props {
  onChange: (e: SyntheticEvent, newValue: string) => void
  type?: CategoriesType
  catagories?: Categories[]
  value: string
}

export default function CategoriesTabList({
  type,
  onChange,
  catagories,
  value,
}: Props) {
  const navigate = useNavigate()
  if (!type || !catagories) {
    return null
  }

  return (
    <Tabs onChange={onChange} value={value} aria-label="lab API tabs example">
      {catagories.map(({ name, url }) => (
        <Tab
          label={name}
          value={url}
          key={url}
          onClick={() => navigate(`/collections/${url}`)}
        />
      ))}
    </Tabs>
  )
}
