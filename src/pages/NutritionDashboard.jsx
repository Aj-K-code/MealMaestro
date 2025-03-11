import { useState, useEffect } from 'react'
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  Paper, 
  Card, 
  CardContent,
  Divider,
  useTheme
} from '@mui/material'
import { 
  BarChart as BarChartIcon,
  TrendingUp,
  RestaurantMenu,
  FitnessCenter
} from '@mui/icons-material'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts'
import NutritionProgress from '../components/NutritionProgress'
import { getNutritionData } from '../services/spoonacular'

export default function NutritionDashboard() {
  const theme = useTheme()
  const [nutritionData, setNutritionData] = useState({
    calories: { current: 0, target: 2000, unit: 'kcal' },
    protein: { current: 0, target: 100, unit: 'g' },
    carbs: { current: 0, target: 250, unit: 'g' },
    fat: { current: 0, target: 70, unit: 'g' },
    dailyIntake: [],
    macroDistribution: []
  })
  
  useEffect(() => {
    const fetchNutritionData = async () => {
      try {
        const data = await getNutritionData()
        setNutritionData(data)
      } catch (error) {
        console.error('Error fetching nutrition data:', error)
      }
    }
    
    fetchNutritionData()
  }, [])

  const COLORS = [theme.palette.info.main, theme.palette.warning.main, theme.palette.success.main]

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        <BarChartIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
        Nutrition Dashboard
      </Typography>
      
      <Typography variant="body1" color="text.secondary" paragraph>
        Track your nutritional intake and get insights to meet your health goals.
      </Typography>
      
      <Grid container spacing={3}>
        {/* Summary Cards */}
        <Grid item xs={12} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Daily Calories
              </Typography>
              <Typography variant="h4" component="div">
                {nutritionData.calories.current}
                <Typography component="span" variant="body1" color="text.secondary">
                  /{nutritionData.calories.target} {nutritionData.calories.unit}
                </Typography>
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {Math.round((nutritionData.calories.current / nutritionData.calories.target) * 100)}% of daily goal
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Protein
              </Typography>
              <Typography variant="h4" component="div">
                {nutritionData.protein.current}
                <Typography component="span" variant="body1" color="text.secondary">
                  /{nutritionData.protein.target} {nutritionData.protein.unit}
                </Typography>
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {Math.round((nutritionData.protein.current / nutritionData.protein.target) * 100)}% of daily goal
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Carbohydrates
              </Typography>
              <Typography variant="h4" component="div">
                {nutritionData.carbs.current}
                <Typography component="span" variant="body1" color="text.secondary">
                  /{nutritionData.carbs.target} {nutritionData.carbs.unit}
                </Typography>
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {Math.round((nutritionData.carbs.current / nutritionData.carbs.target) * 100)}% of daily goal
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Fat
              </Typography>
              <Typography variant="h4" component="div">
                {nutritionData.fat.current}
                <Typography component="span" variant="body1" color="text.secondary">
                  /{nutritionData.fat.target} {nutritionData.fat.unit}
                </Typography>
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {Math.round((nutritionData.fat.current / nutritionData.fat.target) * 100)}% of daily goal
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Nutrition Progress */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              <TrendingUp sx={{ mr: 1, verticalAlign: 'middle' }} />
              Daily Progress
            </Typography>
            <NutritionProgress 
              calories={nutritionData.calories.current} 
              protein={nutritionData.protein.current} 
              carbs={nutritionData.carbs.current} 
              fat={nutritionData.fat.current} 
            />
          </Paper>
        </Grid>
        
        {/* Weekly Calorie Chart */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              <RestaurantMenu sx={{ mr: 1, verticalAlign: 'middle' }} />
              Weekly Calorie Intake
            </Typography>
            <Box sx={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={nutritionData.dailyIntake}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="calories" fill={theme.palette.primary.main} />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
        
        {/* Macro Distribution */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              <FitnessCenter sx={{ mr: 1, verticalAlign: 'middle' }} />
              Macro Distribution
            </Typography>
            <Box sx={{ height: 300, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={nutritionData.macroDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {nutritionData.macroDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
        
        {/* Recommendations */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Nutrition Recommendations
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <Typography variant="subtitle1" gutterBottom>Protein Intake</Typography>
                <Typography variant="body2" color="text.secondary">
                  You're currently at {Math.round((nutritionData.protein.current / nutritionData.protein.target) * 100)}% of your daily protein goal. 
                  Consider adding more lean meats, beans, or protein supplements to reach your target.
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="subtitle1" gutterBottom>Carbohydrate Balance</Typography>
                <Typography variant="body2" color="text.secondary">
                  Your carbohydrate intake is at {Math.round((nutritionData.carbs.current / nutritionData.carbs.target) * 100)}% of your daily goal.
                  Focus on complex carbs like whole grains and vegetables for sustained energy.
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="subtitle1" gutterBottom>Healthy Fats</Typography>
                <Typography variant="body2" color="text.secondary">
                  You've consumed {Math.round((nutritionData.fat.current / nutritionData.fat.target) * 100)}% of your fat target.
                  Incorporate sources of healthy fats like avocados, nuts, and olive oil in your meals.
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}
