import { Box, LinearProgress, Typography, useTheme } from '@mui/material'
import { useMemo } from 'react'

export default function NutritionProgress({ calories, protein, carbs, fat }) {
  const theme = useTheme()
  
  const goals = useMemo(() => ({
    calories: 2000,
    protein: 50,
    carbs: 300,
    fat: 65
  }), [])

  const getProgress = (value, goal) => Math.min((value / goal) * 100, 100)

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography variant="body2">Calories</Typography>
        <Typography variant="body2">{Math.round(calories)}/{goals.calories}kcal</Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={getProgress(calories, goals.calories)}
        sx={{
          height: 10,
          borderRadius: 5,
          mb: 2,
          backgroundColor: theme.palette.grey[200],
          '& .MuiLinearProgress-bar': {
            backgroundColor: theme.palette.error.main
          }
        }}
      />

      <Box sx={{ display: 'flex', gap: 3 }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="body2" gutterBottom>Protein ({Math.round(protein)}g)</Typography>
          <LinearProgress
            variant="determinate"
            value={getProgress(protein, goals.protein)}
            sx={{
              height: 8,
              borderRadius: 5,
              backgroundColor: theme.palette.grey[200],
              '& .MuiLinearProgress-bar': {
                backgroundColor: theme.palette.info.main
              }
            }}
          />
        </Box>
        
        <Box sx={{ flex: 1 }}>
          <Typography variant="body2" gutterBottom>Carbs ({Math.round(carbs)}g)</Typography>
          <LinearProgress
            variant="determinate"
            value={getProgress(carbs, goals.carbs)}
            sx={{
              height: 8,
              borderRadius: 5,
              backgroundColor: theme.palette.grey[200],
              '& .MuiLinearProgress-bar': {
                backgroundColor: theme.palette.warning.main
              }
            }}
          />
        </Box>

        <Box sx={{ flex: 1 }}>
          <Typography variant="body2" gutterBottom>Fat ({Math.round(fat)}g)</Typography>
          <LinearProgress
            variant="determinate"
            value={getProgress(fat, goals.fat)}
            sx={{
              height: 8,
              borderRadius: 5,
              backgroundColor: theme.palette.grey[200],
              '& .MuiLinearProgress-bar': {
                backgroundColor: theme.palette.success.main
              }
            }}
          />
        </Box>
      </Box>
    </Box>
  )
}
