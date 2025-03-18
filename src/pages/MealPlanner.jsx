import { useState, useEffect } from 'react'
import { 
  Box, 
  Grid, 
  Paper, 
  Typography, 
  Chip, 
  Button, 
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useTheme,
  Snackbar,
  Alert,
  Tooltip
} from '@mui/material'
import {
  Add,
  Delete,
  RestaurantMenu,
  DragHandle,
  Info,
  CalendarToday,
  Share
} from '@mui/icons-material'
import { searchRecipes, getRecipeDetails } from '../services/spoonacular'
import NutritionProgress from '../components/NutritionProgress'
import RecipeModal from '../components/RecipeModal'
import { useNavigate } from 'react-router-dom'
import { shareMealPlan } from '../services/shareService'

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snacks']

export default function MealPlanner() {
  const theme = useTheme()
  const navigate = useNavigate()
  const [plans, setPlans] = useState(() => {
    const storedPlans = localStorage.getItem('mealPlans')
    return storedPlans ? JSON.parse(storedPlans) : 
      daysOfWeek.reduce((acc, day) => ({
        ...acc,
        [day]: mealTypes.reduce((mealAcc, meal) => ({
          ...mealAcc,
          [meal]: []
        }), {})
      }), {})
  })

  const [nutritionSummary, setNutritionSummary] = useState({})
  const [searchDialogOpen, setSearchDialogOpen] = useState(false)
  const [selectedDayMeal, setSelectedDayMeal] = useState({ day: '', meal: '' })
  const [error, setError] = useState(null)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')

  const handleShareMealPlan = async () => {
    try {
      const shareId = await shareMealPlan(plans)
      const shareUrl = `${window.location.origin}/shared/${shareId}`
      navigator.clipboard.writeText(shareUrl)
      setSnackbarMessage('Share link copied to clipboard!')
      setSnackbarOpen(true)
    } catch (error) {
      setError('Failed to share meal plan. Please try again.')
    }
  }

  // Calculate nutrition whenever plans change
  useEffect(() => {
    const calculateNutrition = () => {
      let summary = {
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0
      }

      Object.values(plans).forEach(day => {
        Object.values(day).forEach(meals => {
          meals.forEach(recipe => {
            summary.calories += recipe.nutrition?.calories || 0
            summary.protein += recipe.nutrition?.protein || 0
            summary.carbs += recipe.nutrition?.carbs || 0
            summary.fat += recipe.nutrition?.fat || 0
          })
        })
      })

      setNutritionSummary(summary)
      localStorage.setItem('mealPlans', JSON.stringify(plans))
    }

    calculateNutrition()
  }, [plans])

  const handleDragEnd = (result) => {
    if (!result.destination) return

    const { source, destination } = result
    const sourceDay = source.droppableId.split('-')[0]
    const sourceMeal = source.droppableId.split('-')[1]
    const destDay = destination.droppableId.split('-')[0]
    const destMeal = destination.droppableId.split('-')[1]

    const newPlans = { ...plans }
    const [removed] = newPlans[sourceDay][sourceMeal].splice(source.index, 1)
    newPlans[destDay][destMeal].splice(destination.index, 0, removed)

    setPlans(newPlans)
  }

  const handleAddRecipe = async (recipe) => {
    try {
      const details = await getRecipeDetails(recipe.id)
      const newPlans = { ...plans }
      
      newPlans[selectedDayMeal.day][selectedDayMeal.meal].push({
        id: details.id,
        title: details.title,
        image: details.image,
        nutrition: {
          calories: details.nutrition.nutrients.find(n => n.name === 'Calories')?.amount || 0,
          protein: details.nutrition.nutrients.find(n => n.name === 'Protein')?.amount || 0,
          carbs: details.nutrition.nutrients.find(n => n.name === 'Carbohydrates')?.amount || 0,
          fat: details.nutrition.nutrients.find(n => n.name === 'Fat')?.amount || 0
        },
        ingredients: details.ingredients
      })
      
      setPlans(newPlans)
      setSearchDialogOpen(false)
      setSnackbarMessage('Recipe added to your meal plan!')
      setSnackbarOpen(true)
    } catch (error) {
      setError('Failed to add recipe. Please try again.')
    }
  }

  const handleRemoveRecipe = (day, mealType, index) => {
    const newPlans = { ...plans }
    newPlans[day][mealType].splice(index, 1)
    setPlans(newPlans)
    setSnackbarMessage('Recipe removed from your meal plan')
    setSnackbarOpen(true)
  }

  const handleGenerateGroceryList = () => {
    // Save the current meal plans to localStorage before navigating
    localStorage.setItem('mealPlans', JSON.stringify(plans))
    
    // Navigate to the grocery list page
    navigate('/grocery')
    
    setSnackbarMessage('Grocery list generated from your meal plan!')
    setSnackbarOpen(true)
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Nutrition Summary */}
      <Paper sx={{ p: 3, mb: 4, bgcolor: 'background.paper' }}>
        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
          <Info sx={{ mr: 1 }} /> Weekly Nutrition Summary
        </Typography>
        <NutritionProgress
          calories={nutritionSummary.calories}
          protein={nutritionSummary.protein}
          carbs={nutritionSummary.carbs}
          fat={nutritionSummary.fat}
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
          <Tooltip title="Share your meal plan with others">
            <Button
              variant="outlined"
              startIcon={<Share />}
              onClick={handleShareMealPlan}
            >
              Share
            </Button>
          </Tooltip>
          <Button
            variant="outlined"
            startIcon={<CalendarToday />}
            onClick={handleGenerateGroceryList}
          >
            Generate Grocery List
          </Button>
        </Box>
      </Paper>

      {/* Meal Plan Grid */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Grid container spacing={3}>
          {daysOfWeek.map(day => (
            <Grid item xs={12} md={6} lg={4} key={day}>
              <Paper sx={{ p: 2, bgcolor: 'background.paper' }}>
                <Typography variant="h6" gutterBottom>{day}</Typography>
                {mealTypes.map(mealType => (
                  <Box key={mealType} sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="subtitle1">{mealType}</Typography>
                      <Button
                        size="small"
                        startIcon={<Add />}
                        onClick={() => {
                          setSelectedDayMeal({ day, meal: mealType })
                          setSearchDialogOpen(true)
                        }}
                      >
                        Add
                      </Button>
                    </Box>
                    
                    <Droppable droppableId={`${day}-${mealType}`}>
                      {(provided) => (
                        <Box
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          sx={{
                            minHeight: '100px',
                            bgcolor: theme.palette.grey[100],
                            borderRadius: 1,
                            p: 1
                          }}
                        >
                          {plans[day][mealType].map((recipe, index) => (
                            <Draggable
                              key={recipe.id}
                              draggableId={String(recipe.id)}
                              index={index}
                            >
                              {(provided) => (
                                <Paper
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  sx={{
                                    mb: 1,
                                    p: 1,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                    '&:hover': {
                                      boxShadow: theme.shadows[2]
                                    }
                                  }}
                                >
                                  <DragHandle fontSize="small" />
                                  <img
                                    src={recipe.image}
                                    alt={recipe.title}
                                    style={{ width: 40, height: 40, borderRadius: 4 }}
                                  />
                                  <Box sx={{ flexGrow: 1 }}>
                                    <Typography variant="body2">{recipe.title}</Typography>
                                    <Box sx={{ display: 'flex', gap: 0.5, mt: 0.5 }}>
                                      <Chip
                                        label={`${Math.round(recipe.nutrition.calories)} kcal`}
                                        size="small"
                                      />
                                      <Chip
                                        label={`${Math.round(recipe.nutrition.protein)}g protein`}
                                        size="small"
                                        color="primary"
                                      />
                                    </Box>
                                  </Box>
                                  <IconButton
                                    size="small"
                                    onClick={() => handleRemoveRecipe(day, mealType, index)}
                                  >
                                    <Delete fontSize="small" />
                                  </IconButton>
                                </Paper>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </Box>
                      )}
                    </Droppable>
                  </Box>
                ))}
              </Paper>
            </Grid>
          ))}
        </Grid>
      </DragDropContext>

      {/* Recipe Search Dialog */}
      <Dialog
        open={searchDialogOpen}
        onClose={() => setSearchDialogOpen(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Add Recipe to {selectedDayMeal.day} {selectedDayMeal.meal}</DialogTitle>
        <DialogContent>
          <RecipeModal 
            embedded={true}
            onSelectRecipe={handleAddRecipe}
            showActions={false}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSearchDialogOpen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar 
        open={snackbarOpen} 
        autoHideDuration={4000} 
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setSnackbarOpen(false)} 
          severity="success" 
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  )
}
