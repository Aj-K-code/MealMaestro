import { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Divider,
  Grid,
  Paper,
  Typography,
  useTheme,
  useMediaQuery,
  Avatar,
  TextField,
  InputAdornment,
  IconButton,
  Chip
} from '@mui/material'
import {
  Search as SearchIcon,
  RestaurantMenu,
  CalendarMonth,
  ShoppingCart,
  Kitchen,
  BarChart,
  ArrowForward,
  Star,
  CheckCircle,
  Timer
} from '@mui/icons-material'

// Feature cards data
const features = [
  {
    title: 'Recipe Explorer',
    description: 'Discover thousands of recipes filtered by cuisine, diet, ingredients, and more.',
    icon: <RestaurantMenu fontSize="large" />,
    image: 'https://images.unsplash.com/photo-1505935428862-770b6f24f629?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1167&q=80',
    path: '/recipes'
  },
  {
    title: 'Meal Planner',
    description: 'Drag and drop recipes to plan your meals for the week or month ahead.',
    icon: <CalendarMonth fontSize="large" />,
    image: 'https://images.unsplash.com/photo-1455853828816-0c301a011711?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
    path: '/plan'
  },
  {
    title: 'Smart Grocery List',
    description: 'Automatically generate organized shopping lists from your meal plans.',
    icon: <ShoppingCart fontSize="large" />,
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
    path: '/grocery'
  },
  {
    title: 'Pantry Tracker',
    description: 'Keep track of what you have and get recipe suggestions to use up ingredients.',
    icon: <Kitchen fontSize="large" />,
    image: 'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    path: '/pantry'
  },
  {
    title: 'Nutrition Dashboard',
    description: 'Track your nutritional intake and get insights to meet your health goals.',
    icon: <BarChart fontSize="large" />,
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1153&q=80',
    path: '/nutrition'
  }
]

// Testimonials data
const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Busy Mom of 3',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    content: 'Meal Maestro has transformed our family dinners. I save hours each week on meal planning, and my grocery bills have gone down by 30%!'
  },
  {
    name: 'Michael Chen',
    role: 'Fitness Enthusiast',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    content: 'The nutrition tracking is incredible. I can easily see my macros for the week and adjust my meal plan to meet my fitness goals.'
  },
  {
    name: 'Emma Rodriguez',
    role: 'Home Chef',
    avatar: 'https://randomuser.me/api/portraits/women/63.jpg',
    content: 'I love discovering new recipes based on what I already have in my pantry. It\'s helped me reduce food waste and get creative in the kitchen.'
  }
]

// Premium features data
const premiumFeatures = [
  'Advanced nutritional analytics and personalized insights',
  'AI-powered meal recommendations based on your preferences',
  'Custom recipe collections and unlimited meal plans',
  'Smart ingredient substitutions for dietary restrictions',
  'Sync with fitness trackers and health apps',
  'Ad-free experience and priority support'
]

export default function HomePage() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'))
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/recipes?search=${encodeURIComponent(searchQuery)}`
    }
  }

  return (
    <Box>
      {/* Hero Section */}
      <Paper
        sx={{
          position: 'relative',
          height: isMobile ? '60vh' : '80vh',
          display: 'flex',
          alignItems: 'center',
          borderRadius: 0,
          overflow: 'hidden',
          mb: 8,
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ color: 'white', textAlign: 'center' }}>
            <Typography
              variant={isMobile ? 'h3' : 'h2'}
              component="h1"
              gutterBottom
              sx={{ fontWeight: 'bold' }}
            >
              Plan, Cook, and Eat Smarter
            </Typography>
            <Typography
              variant={isMobile ? 'body1' : 'h6'}
              sx={{ mb: 4, maxWidth: '800px', mx: 'auto' }}
            >
              Your all-in-one meal planning, recipe discovery, and nutrition management tool.
              Save time, reduce waste, and enjoy delicious, healthy meals.
            </Typography>
            
            <Box
              component="form"
              onSubmit={handleSearchSubmit}
              sx={{
                display: 'flex',
                flexDirection: isSmall ? 'column' : 'row',
                maxWidth: '600px',
                mx: 'auto',
                gap: isSmall ? 2 : 0
              }}
            >
              <TextField
                fullWidth
                placeholder="Search for recipes, ingredients, or cuisines..."
                variant="outlined"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                  sx: {
                    bgcolor: 'white',
                    borderRadius: isSmall ? 1 : '4px 0 0 4px',
                  }
                }}
              />
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                size="large"
                sx={{
                  px: 4,
                  borderRadius: isSmall ? 1 : '0 4px 4px 0',
                  height: isSmall ? 'auto' : '56px'
                }}
              >
                Explore
              </Button>
            </Box>
            
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, flexWrap: 'wrap', gap: 1 }}>
              <Chip 
                icon={<CheckCircle fontSize="small" />} 
                label="5,000+ Recipes" 
                sx={{ bgcolor: 'rgba(255, 255, 255, 0.2)', color: 'white', m: 0.5 }} 
              />
              <Chip 
                icon={<CheckCircle fontSize="small" />} 
                label="Detailed Nutrition" 
                sx={{ bgcolor: 'rgba(255, 255, 255, 0.2)', color: 'white', m: 0.5 }} 
              />
              <Chip 
                icon={<CheckCircle fontSize="small" />} 
                label="Smart Grocery Lists" 
                sx={{ bgcolor: 'rgba(255, 255, 255, 0.2)', color: 'white', m: 0.5 }} 
              />
              <Chip 
                icon={<Timer fontSize="small" />} 
                label="Save 3+ Hours Weekly" 
                sx={{ bgcolor: 'rgba(255, 255, 255, 0.2)', color: 'white', m: 0.5 }} 
              />
            </Box>
          </Box>
        </Container>
      </Paper>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
            Everything You Need in One Place
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: '800px', mx: 'auto' }}>
            Meal Maestro combines powerful features to make meal planning, cooking, and eating healthier easier than ever.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <Card 
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 20px rgba(0, 0, 0, 0.1)'
                  }
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={feature.image}
                  alt={feature.title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Box sx={{ 
                      mr: 2, 
                      color: 'white',
                      bgcolor: theme.palette.primary.main,
                      borderRadius: '50%',
                      p: 1,
                      display: 'flex'
                    }}>
                      {feature.icon}
                    </Box>
                    <Typography variant="h6" component="h3">
                      {feature.title}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {feature.description}
                  </Typography>
                  <Button 
                    component={RouterLink} 
                    to={feature.path}
                    endIcon={<ArrowForward />}
                    sx={{ mt: 1 }}
                  >
                    Explore
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Testimonials Section */}
      <Box sx={{ bgcolor: 'grey.100', py: 8 }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
              What Our Users Say
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: '800px', mx: 'auto' }}>
              Join thousands of satisfied users who have transformed their cooking and eating habits.
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', mb: 2 }}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} sx={{ color: theme.palette.secondary.main }} />
                      ))}
                    </Box>
                    <Typography variant="body1" paragraph sx={{ mb: 3, fontStyle: 'italic' }}>
                      "{testimonial.content}"
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar src={testimonial.avatar} sx={{ mr: 2 }} />
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                          {testimonial.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {testimonial.role}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Premium Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box>
              <Typography variant="overline" sx={{ color: theme.palette.secondary.main, fontWeight: 'bold' }}>
                PREMIUM FEATURES
              </Typography>
              <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
                Take Your Meal Planning to the Next Level
              </Typography>
              <Typography variant="body1" paragraph sx={{ mb: 4 }}>
                Unlock advanced features designed to save you even more time and help you achieve your health and budget goals.
              </Typography>
              
              <Box>
                {premiumFeatures.map((feature, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                    <CheckCircle sx={{ color: theme.palette.success.main, mr: 2, mt: 0.5 }} />
                    <Typography variant="body1">{feature}</Typography>
                  </Box>
                ))}
              </Box>
              
              <Button 
                variant="contained" 
                color="secondary" 
                size="large"
                sx={{ mt: 4, px: 4 }}
              >
                Try Premium Free
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="https://images.unsplash.com/photo-1543352634-99a5d50ae78e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
              alt="Premium features"
              sx={{
                width: '100%',
                height: 'auto',
                borderRadius: 2,
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)'
              }}
            />
          </Grid>
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box 
        sx={{ 
          bgcolor: theme.palette.primary.main, 
          color: 'white',
          py: 8,
          textAlign: 'center'
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
            Ready to Transform Your Meal Planning?
          </Typography>
          <Typography variant="h6" paragraph sx={{ mb: 4, maxWidth: '800px', mx: 'auto' }}>
            Join thousands of users who are saving time, reducing food waste, and eating healthier with Meal Maestro.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 2 }}>
            <Button 
              component={RouterLink}
              to="/recipes"
              variant="contained" 
              color="secondary" 
              size="large"
              sx={{ px: 4 }}
            >
              Get Started Free
            </Button>
            <Button 
              variant="outlined" 
              color="inherit" 
              size="large"
              sx={{ px: 4 }}
            >
              Learn More
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}
