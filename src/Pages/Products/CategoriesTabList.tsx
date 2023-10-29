import { Tab, Tabs } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { CategoryType } from '../../components/Categories/categories'
import { getCategoriesFromType, getCategoryTypeFromUrl } from './functions'

interface Props {
  catagories?: CategoryType[]
  tab: string
}

export default function CategoriesTabList({ tab }: Props) {
  const navigate = useNavigate()
  const categoryType = getCategoryTypeFromUrl(tab)
  if (!categoryType) {
    return null
  }

  const categories = getCategoriesFromType(categoryType)

  const tabs = categories.map(({ name, url }) => (
    <Tab
      label={name}
      value={url}
      key={url}
      onClick={() => navigate(`/collections/${url}`)}
    />
  ))

  return <Tabs value={tab}>{tabs}</Tabs>
}
