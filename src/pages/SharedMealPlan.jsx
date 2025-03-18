import { useState, useEffect } from 'react'
import { Box, Typography, CircularProgress, Alert, Button } from '@mui/material'
import { useParams, useNavigate } from 'react-router-dom'
import { getSharedMealPlan } from '../services/shareService'
import MealPlanner from './MealPlanner'

export default function SharedMealPlan() {
  const { shareId } = useParams()
  const navigate = useNavigate()
  const [mealPlan, setMealPlan] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchSharedMealPlan = async () => {
      try {
        const plan = await getSharedMealPlan(shareId)
        setMealPlan(plan)
      } catch (error) {
        setError('Failed to load shared meal plan. It may have expired or been deleted.')
      } finally {
        setLoading(false)
      }
    }

    fetchSharedMealPlan()
  }, [shareId])

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Button variant="contained" onClick={() => navigate('/')}>
          Go to Home
        </Button>
      </Box>
    )
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Shared Meal Plan
      </Typography>
      <MealPlanner initialPlans={mealPlan} readOnly={true} />
    </Box>
  )
}
