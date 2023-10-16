import { Tab, Tabs } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { CategoryType } from '../../components/Categories/categories'
import { getCategoriesFromType } from './functions'

interface Props {
  type?: CategoryType
  catagories?: CategoryType[]
  value: string
}

export default function CategoriesTabList({ type, value }: Props) {
  const navigate = useNavigate()
  if (!type) {
    return null
  }

  const categories = getCategoriesFromType(type)

  const tabs = categories.map(({ name, url }) => (
    <Tab
      label={name}
      value={url}
      key={url}
      onClick={() => navigate(`/collections/${url}`)}
    />
  ))

  return (
    <Tabs value={value} aria-label="lab API tabs example">
      {tabs}
    </Tabs>
  )
}
