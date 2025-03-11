import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import RecipeSearch from './pages/RecipeSearch'
import MealPlanner from './pages/MealPlanner'
import GroceryList from './pages/GroceryList'
import PantryTracker from './pages/PantryTracker'
import NutritionDashboard from './pages/NutritionDashboard'
import AppLayout from './components/AppLayout'

export default function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recipes" element={<RecipeSearch />} />
        <Route path="/plan" element={<MealPlanner />} />
        <Route path="/grocery" element={<GroceryList />} />
        <Route path="/pantry" element={<PantryTracker />} />
        <Route path="/nutrition" element={<NutritionDashboard />} />
      </Routes>
    </AppLayout>
  )
}
