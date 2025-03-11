import { useState, useEffect } from 'react'
import { 
  Box, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemIcon, 
  Checkbox,
  Typography,
  Chip,
  Divider,
  Button,
  Paper,
  useTheme
} from '@mui/material'
import {
  LocalGroceryStore,
  CheckCircle,
  Category,
  AttachMoney,
  Print
} from '@mui/icons-material'

const aisleCategories = {
  'Produce': { icon: '🥦', color: '#8BC34A' },
  'Dairy': { icon: '🥛', color: '#FFF8E1' },
  'Meat': { icon: '🥩', color: '#FFCDD2' },
  'Baking': { icon: '🍞', color: '#D7CCC8' },
  'Canned Goods': { icon: '🥫', color: '#BCAAA4' },
  'Spices': { icon: '🌶️', color: '#FFAB91' },
  'Frozen': { icon: '❄️', color: '#B3E5FC' },
  'Other': { icon: '📦', color: '#CFD8DC' }
}

export default function GroceryList() {
  const theme = useTheme()
  const [list, setList] = useState(() => {
    const savedList = localStorage.getItem('groceryList')
    return savedList ? JSON.parse(savedList) : []
  })

  const [checked, setChecked] = useState([])
  const [mealPlans] = useState(() => {
    return JSON.parse(localStorage.getItem('mealPlans')) || {}
  })

  // Process ingredients from meal plans
  useEffect(() => {
    const processIngredients = () => {
      const ingredientsMap = new Map()
      
      Object.values(mealPlans).forEach(day => {
        Object.values(day).forEach(meals => {
          meals.forEach(recipe => {
            recipe.ingredients?.forEach(ingredient => {
              const key = `${ingredient.name}-${ingredient.aisle}`
              if (ingredientsMap.has(key)) {
                ingredientsMap.get(key).amount += ingredient.amount
              } else {
                ingredientsMap.set(key, {
                  ...ingredient,
                  category: aisleCategories[ingredient.aisle] || aisleCategories.Other
                })
              }
            })
          })
        })
      })

      const sortedList = Array.from(ingredientsMap.values()).sort((a, b) => {
        const aisleA = a.aisle || 'ZZZ'
        const aisleB = b.aisle || 'ZZZ'
        return aisleA.localeCompare(aisleB)
      })

      setList(sortedList)
      localStorage.setItem('groceryList', JSON.stringify(sortedList))
    }

    processIngredients()
  }, [mealPlans])

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value)
    const newChecked = [...checked]

    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }

    setChecked(newChecked)
  }

  const estimateTotalCost = () => {
    return list.reduce((acc, item) => {
      const price = item.estimatedCost?.value || 2.5 // Fallback average
      return acc + (price * (item.amount || 1))
    }, 0).toFixed(2)
  }

  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center' }}>
            <LocalGroceryStore sx={{ mr: 1 }} /> Smart Grocery List
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Chip
              icon={<AttachMoney />}
              label={`Estimated Total: $${estimateTotalCost()}`}
              color="secondary"
            />
            <Button variant="outlined" startIcon={<Print />}>Print List</Button>
          </Box>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {Object.entries(aisleCategories).map(([category, config]) => {
          const categoryItems = list.filter(item => 
            item.category === config || item.aisle === category
          )
          
          return categoryItems.length > 0 && (
            <Box key={category} sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                <Box sx={{ 
                  mr: 1,
                  bgcolor: config.color,
                  p: 1,
                  borderRadius: '50%',
                  width: 40,
                  height: 40,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  {config.icon}
                </Box>
                {category}
              </Typography>
              
              <List dense sx={{ bgcolor: 'background.paper', borderRadius: 2 }}>
                {categoryItems.map((item, index) => {
                  const labelId = `checkbox-list-label-${index}`
                  return (
                    <ListItem
                      key={item.id}
                      sx={{
                        borderBottom: `1px solid ${theme.palette.divider}`,
                        '&:last-child': { borderBottom: 'none' }
                      }}
                    >
                      <ListItemIcon>
                        <Checkbox
                          edge="start"
                          checked={checked.indexOf(item.id) !== -1}
                          tabIndex={-1}
                          onChange={handleToggle(item.id)}
                          inputProps={{ 'aria-labelledby': labelId }}
                          color="primary"
                        />
                      </ListItemIcon>
                      <ListItemText
                        id={labelId}
                        primary={`${item.name}`}
                        secondary={`${item.amount} ${item.unit}`}
                        sx={{
                          textDecoration: checked.indexOf(item.id) !== -1 ? 'line-through' : 'none',
                          opacity: checked.indexOf(item.id) !== -1 ? 0.5 : 1
                        }}
                      />
                      <Chip
                        label={`$${(item.estimatedCost?.value || 2.5 * (item.amount || 1)).toFixed(2)}`}
                        size="small"
                        icon={<AttachMoney fontSize="small" />}
                      />
                    </ListItem>
                  )
                })}
              </List>
            </Box>
          )
        })}
      </Paper>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
        <Button
          variant="outlined"
          onClick={() => setChecked(list.map(item => item.id))}
        >
          Mark All Complete
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setChecked([])}
        >
          Clear Checked Items
        </Button>
      </Box>
    </Box>
  )
}
