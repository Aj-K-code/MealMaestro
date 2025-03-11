import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Box,
  Chip,
  Button,
  Divider,
  useMediaQuery,
  Grid,
  TextField,
  Card,
  CardContent,
  CardMedia,
  CardActions
} from '@mui/material'
import {
  Close,
  Timer,
  LocalDining,
  NavigateBefore,
  NavigateNext,
  Fullscreen,
  Search as SearchIcon,
  Add
} from '@mui/icons-material'
import { getRecipeDetails, searchRecipes } from '../services/spoonacular'

export default function RecipeModal({ recipeId, open, onClose, embedded = false, onSelectRecipe, showActions = true }) {
  const [recipe, setRecipe] = useState(null)
  const [activeStep, setActiveStep] = useState(0)
  const [fullscreen, setFullscreen] = useState(false)
  const isMobile = useMediaQuery('(max-width:600px)')
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const data = await getRecipeDetails(recipeId)
        setRecipe(data)
      } catch (error) {
        console.error('Error fetching recipe details:', error)
      }
    }

    if (open && recipeId) {
      fetchRecipe()
      setActiveStep(0)
    }
  }, [open, recipeId])

  const handleStepChange = (step) => {
    if (!recipe || !recipe.analyzedInstructions || !recipe.analyzedInstructions[0]) return;
    setActiveStep(Math.max(0, Math.min(step, recipe.analyzedInstructions[0]?.steps.length - 1)))
  }

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    try {
      const data = await searchRecipes({ query: searchQuery });
      setSearchResults(data.results || []);
    } catch (error) {
      console.error('Error searching recipes:', error);
    } finally {
      setLoading(false);
    }
  }

  // If embedded mode (for MealPlanner), show search interface
  if (embedded) {
    return (
      <Box>
        <Box sx={{ display: 'flex', mb: 3 }}>
          <TextField
            fullWidth
            label="Search for recipes"
            variant="outlined"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <Button 
            variant="contained" 
            sx={{ ml: 1 }}
            onClick={handleSearch}
            startIcon={<SearchIcon />}
          >
            Search
          </Button>
        </Box>

        <Grid container spacing={3}>
          {searchResults.map(recipe => (
            <Grid item xs={12} sm={6} md={4} key={recipe.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={recipe.image}
                  alt={recipe.title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h6" component="div">
                    {recipe.title}
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
                    <Chip 
                      size="small" 
                      label={`${Math.round(recipe.nutrition?.nutrients?.find(n => n.name === 'Calories')?.amount || 0)} kcal`} 
                    />
                    <Chip 
                      size="small" 
                      color="primary" 
                      label={`${Math.round(recipe.nutrition?.nutrients?.find(n => n.name === 'Protein')?.amount || 0)}g protein`} 
                    />
                  </Box>
                </CardContent>
                <CardActions>
                  <Button 
                    size="small" 
                    startIcon={<Add />}
                    onClick={() => onSelectRecipe && onSelectRecipe(recipe)}
                  >
                    Add to Plan
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {searchResults.length === 0 && searchQuery && !loading && (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h6">No recipes found</Typography>
            <Typography variant="body2" color="text.secondary">
              Try another search term
            </Typography>
          </Box>
        )}
      </Box>
    );
  }

  if (!recipe) return null;

  return (
    <Dialog
      fullScreen={fullscreen || isMobile}
      maxWidth="md"
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDialog-paper': {
          background: 'linear-gradient(145deg, #f5f5f5 30%, #ffffff 90%)'
        }
      }}
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5">{recipe.title}</Typography>
        <Box>
          <IconButton onClick={() => setFullscreen(!fullscreen)}>
            <Fullscreen />
          </IconButton>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent dividers>
        {/* Recipe Image */}
        {recipe.image && (
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <img 
              src={recipe.image} 
              alt={recipe.title} 
              style={{ 
                maxWidth: '100%', 
                maxHeight: '300px', 
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
              }} 
            />
          </Box>
        )}

        {/* Cooking Mode Stepper */}
        {recipe.analyzedInstructions && recipe.analyzedInstructions[0] && recipe.analyzedInstructions[0].steps && (
          <>
            <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 3 }}>
              {recipe.analyzedInstructions[0].steps.map((step, index) => (
                <Step key={step.number}>
                  <StepLabel>{`Step ${step.number}`}</StepLabel>
                </Step>
              ))}
            </Stepper>

            {/* Current Step Content */}
            {recipe.analyzedInstructions[0].steps[activeStep] && (
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" gutterBottom>
                  Step {activeStep + 1}
                </Typography>
                <Typography paragraph>
                  {recipe.analyzedInstructions[0].steps[activeStep].step}
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {recipe.analyzedInstructions[0].steps[activeStep].ingredients && 
                   recipe.analyzedInstructions[0].steps[activeStep].ingredients.map(ingredient => (
                    <Chip
                      key={ingredient.id}
                      label={ingredient.name}
                      size="small"
                      icon={<LocalDining fontSize="small" />}
                    />
                  ))}
                </Box>
              </Box>
            )}
          </>
        )}

        <Divider sx={{ my: 2 }} />

        {/* Recipe Metadata */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>Ingredients</Typography>
            <ul style={{ paddingLeft: 20, margin: 0 }}>
              {recipe.extendedIngredients && recipe.extendedIngredients.map(ingredient => (
                <li key={ingredient.id || ingredient.name}>
                  <Typography variant="body1">
                    {ingredient.amount} {ingredient.unit} {ingredient.name}
                  </Typography>
                </li>
              ))}
            </ul>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>Nutrition Facts</Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
              {recipe.nutrition && recipe.nutrition.nutrients && recipe.nutrition.nutrients.slice(0, 8).map(nutrient => (
                <Box key={nutrient.name} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography>{nutrient.name}</Typography>
                  <Typography>
                    {nutrient.amount} {nutrient.unit}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
      </DialogContent>

      {showActions && recipe.analyzedInstructions && recipe.analyzedInstructions[0] && recipe.analyzedInstructions[0].steps && (
        <DialogActions sx={{ justifyContent: 'space-between', p: 2 }}>
          <Button
            variant="outlined"
            startIcon={<NavigateBefore />}
            onClick={() => handleStepChange(activeStep - 1)}
            disabled={activeStep === 0}
          >
            Previous Step
          </Button>
          <Button
            variant="contained"
            endIcon={<NavigateNext />}
            onClick={() => handleStepChange(activeStep + 1)}
            disabled={activeStep === recipe.analyzedInstructions[0].steps.length - 1}
          >
            Next Step
          </Button>
        </DialogActions>
      )}
    </Dialog>
  )
}
