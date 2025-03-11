import { useState, useEffect } from 'react'
import { 
  Box, 
  Grid, 
  Card, 
  CardMedia, 
  CardContent, 
  Typography, 
  Chip, 
  Button, 
  CircularProgress,
  Alert,
  Collapse,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  Slider,
  Pagination,
  useTheme,
  TextField,
  IconButton,
  CardActions
} from '@mui/material'
import { 
  Search as SearchIcon,
  Timer,
  LocalDining,
  FavoriteBorder,
  FilterList,
  Close,
  Info
} from '@mui/icons-material'
import { searchRecipes } from '../services/spoonacular'
import RecipeModal from '../components/RecipeModal'

export default function RecipeSearch() {
  const theme = useTheme()
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [filters, setFilters] = useState({
    query: '',
    cuisine: [],
    diet: [],
    intolerances: [],
    type: '',
    maxReadyTime: 60,
    minCarbs: 0,
    maxCarbs: 100,
    page: 1
  })
  const [showFilters, setShowFilters] = useState(false)
  const [selectedRecipe, setSelectedRecipe] = useState(null)
  const [recipeModalOpen, setRecipeModalOpen] = useState(false)

  const cuisines = [
    'African', 'Asian', 'American', 'British', 'Cajun', 'Caribbean',
    'Chinese', 'European', 'French', 'Greek', 'Indian', 'Italian',
    'Japanese', 'Korean', 'Latin American', 'Mediterranean', 'Mexican',
    'Middle Eastern', 'Nordic', 'South American', 'Spanish', 'Thai', 'Vietnamese'
  ]

  const diets = [
    'Gluten Free', 'Ketogenic', 'Vegetarian', 'Lacto-Vegetarian',
    'Ovo-Vegetarian', 'Vegan', 'Pescetarian', 'Paleo', 'Primal', 'Whole30'
  ]

  const intolerances = [
    'Dairy', 'Egg', 'Gluten', 'Grain', 'Peanut', 'Seafood', 'Sesame',
    'Shellfish', 'Soy', 'Sulfite', 'Tree Nut', 'Wheat'
  ]

  const mealTypes = [
    'main course', 'side dish', 'dessert', 'appetizer',
    'salad', 'bread', 'breakfast', 'soup', 'beverage', 'sauce', 'marinade'
  ]

  const handleSearch = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const params = {
        query: filters.query,
        cuisine: filters.cuisine.join(','),
        diet: filters.diet.join(','),
        intolerances: filters.intolerances.join(','),
        type: filters.type,
        maxReadyTime: filters.maxReadyTime,
        minCarbs: filters.minCarbs,
        maxCarbs: filters.maxCarbs,
        offset: (filters.page - 1) * 10
      }

      const data = await searchRecipes(params)
      setRecipes(data.results || [])
    } catch (err) {
      setError('Failed to fetch recipes. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    handleSearch()
  }, [filters.page])

  const handleOpenRecipe = (recipe) => {
    setSelectedRecipe(recipe.id)
    setRecipeModalOpen(true)
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Search Header */}
      <Box sx={{ mb: 4, display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
        <TextField
          label="Search Recipes"
          variant="outlined"
          fullWidth
          sx={{ flexGrow: 1, maxWidth: 500 }}
          value={filters.query}
          onChange={(e) => setFilters({...filters, query: e.target.value})}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          InputProps={{
            endAdornment: filters.query && (
              <IconButton size="small" onClick={() => setFilters({...filters, query: ''})}>
                <Close fontSize="small" />
              </IconButton>
            )
          }}
        />

        <Button 
          variant="contained" 
          onClick={handleSearch}
          disabled={loading}
          startIcon={<SearchIcon />}
        >
          Search
        </Button>

        <Button
          variant="outlined"
          onClick={() => setShowFilters(!showFilters)}
          startIcon={<FilterList />}
        >
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </Button>
      </Box>

      {/* Filters */}
      <Collapse in={showFilters}>
        <Box sx={{ 
          p: 2, 
          mb: 4, 
          bgcolor: 'background.paper', 
          borderRadius: 2,
          boxShadow: theme.shadows[1]
        }}>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
            <FilterList sx={{ mr: 1 }} /> Filters
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Cuisine</InputLabel>
                <Select
                  multiple
                  value={filters.cuisine}
                  onChange={(e) => setFilters({...filters, cuisine: e.target.value})}
                  renderValue={(selected) => selected.join(', ')}
                >
                  {cuisines.map((cuisine) => (
                    <MenuItem key={cuisine} value={cuisine.toLowerCase()}>
                      <Checkbox checked={filters.cuisine.includes(cuisine.toLowerCase())} />
                      <ListItemText primary={cuisine} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Diet</InputLabel>
                <Select
                  multiple
                  value={filters.diet}
                  onChange={(e) => setFilters({...filters, diet: e.target.value})}
                  renderValue={(selected) => selected.join(', ')}
                >
                  {diets.map((diet) => (
                    <MenuItem key={diet} value={diet.toLowerCase()}>
                      <Checkbox checked={filters.diet.includes(diet.toLowerCase())} />
                      <ListItemText primary={diet} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Intolerances</InputLabel>
                <Select
                  multiple
                  value={filters.intolerances}
                  onChange={(e) => setFilters({...filters, intolerances: e.target.value})}
                  renderValue={(selected) => selected.join(', ')}
                >
                  {intolerances.map((intolerance) => (
                    <MenuItem key={intolerance} value={intolerance.toLowerCase()}>
                      <Checkbox checked={filters.intolerances.includes(intolerance.toLowerCase())} />
                      <ListItemText primary={intolerance} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Meal Type</InputLabel>
                <Select
                  value={filters.type}
                  onChange={(e) => setFilters({...filters, type: e.target.value})}
                  displayEmpty
                >
                  <MenuItem value="">Any Type</MenuItem>
                  {mealTypes.map((type) => (
                    <MenuItem key={type} value={type}>{type}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={4}>
              <Typography gutterBottom>Max Cooking Time (minutes)</Typography>
              <Slider
                value={filters.maxReadyTime}
                onChange={(e, newValue) => setFilters({...filters, maxReadyTime: newValue})}
                valueLabelDisplay="auto"
                min={10}
                max={120}
                step={5}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <Typography gutterBottom>Carbs Range (g)</Typography>
              <Slider
                value={[filters.minCarbs, filters.maxCarbs]}
                onChange={(e, newValue) => setFilters({
                  ...filters, 
                  minCarbs: newValue[0], 
                  maxCarbs: newValue[1]
                })}
                valueLabelDisplay="auto"
                min={0}
                max={200}
                step={10}
              />
            </Grid>
          </Grid>
        </Box>
      </Collapse>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Loading Indicator */}
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {/* Recipe Grid */}
      {!loading && recipes.length > 0 && (
        <Grid container spacing={3}>
          {recipes.map((recipe) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={recipe.id}>
              <Card 
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: theme.shadows[8]
                  }
                }}
              >
                <CardMedia
                  component="img"
                  height="180"
                  image={recipe.image}
                  alt={recipe.title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h6" component="div">
                    {recipe.title}
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1 }}>
                    <Chip 
                      icon={<Timer fontSize="small" />} 
                      label={`${recipe.readyInMinutes} min`} 
                      size="small" 
                    />
                    <Chip 
                      icon={<LocalDining fontSize="small" />} 
                      label={`${recipe.servings} servings`} 
                      size="small" 
                    />
                  </Box>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {recipe.dishTypes?.slice(0, 2).map((type, index) => (
                      <Chip key={index} label={type} size="small" variant="outlined" />
                    ))}
                  </Box>
                </CardContent>
                <CardActions>
                  <Button 
                    size="small" 
                    onClick={() => handleOpenRecipe(recipe)}
                    startIcon={<Info />}
                  >
                    View Details
                  </Button>
                  <Button 
                    size="small" 
                    startIcon={<FavoriteBorder />}
                  >
                    Save
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* No Results */}
      {!loading && recipes.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 5 }}>
          <Typography variant="h6" gutterBottom>No recipes found</Typography>
          <Typography variant="body1" color="text.secondary">
            Try adjusting your search criteria or filters
          </Typography>
        </Box>
      )}

      {/* Pagination */}
      {recipes.length > 0 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination
            count={10} // This would ideally be calculated from total results
            page={filters.page}
            onChange={(e, page) => setFilters({...filters, page})}
            color="primary"
          />
        </Box>
      )}

      {/* Recipe Modal */}
      <RecipeModal
        recipeId={selectedRecipe}
        open={recipeModalOpen}
        onClose={() => setRecipeModalOpen(false)}
      />
    </Box>
  )
}
