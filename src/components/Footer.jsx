import { Box, Container, Grid, Typography, Link, TextField, Button, Divider, useTheme, useMediaQuery } from '@mui/material'
import { Facebook, Twitter, Instagram, Pinterest, YouTube } from '@mui/icons-material'

export default function Footer() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const currentYear = new Date().getFullYear()

  return (
    <Box
      component="footer"
      sx={{
        py: 6,
        px: 2,
        mt: 'auto',
        backgroundColor: theme.palette.primary.main,
        color: 'white'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Meal Maestro
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Your all-in-one meal planning, recipe discovery, and nutrition management tool.
              Plan smarter, eat better, and save time and money.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Link href="#" color="inherit" aria-label="Facebook">
                <Facebook />
              </Link>
              <Link href="#" color="inherit" aria-label="Twitter">
                <Twitter />
              </Link>
              <Link href="#" color="inherit" aria-label="Instagram">
                <Instagram />
              </Link>
              <Link href="#" color="inherit" aria-label="Pinterest">
                <Pinterest />
              </Link>
              <Link href="#" color="inherit" aria-label="YouTube">
                <YouTube />
              </Link>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Link href="/" color="inherit" display="block" sx={{ mb: 1 }}>
              Home
            </Link>
            <Link href="/recipes" color="inherit" display="block" sx={{ mb: 1 }}>
              Recipe Explorer
            </Link>
            <Link href="/plan" color="inherit" display="block" sx={{ mb: 1 }}>
              Meal Planner
            </Link>
            <Link href="/grocery" color="inherit" display="block" sx={{ mb: 1 }}>
              Grocery List
            </Link>
            <Link href="/pantry" color="inherit" display="block" sx={{ mb: 1 }}>
              Pantry Tracker
            </Link>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Stay Updated
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Subscribe to get the latest recipes, meal plans, and cooking tips.
            </Typography>
            <Box component="form" noValidate sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row' }}>
              <TextField
                label="Email"
                variant="outlined"
                size="small"
                fullWidth
                sx={{ 
                  mr: isMobile ? 0 : 1, 
                  mb: isMobile ? 1 : 0,
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  input: { color: 'white' },
                  '& label': { color: 'rgba(255, 255, 255, 0.7)' },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.3)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.5)',
                    },
                  },
                }}
              />
              <Button 
                variant="contained" 
                color="secondary"
                sx={{ 
                  whiteSpace: 'nowrap',
                  minWidth: isMobile ? '100%' : 'auto'
                }}
              >
                Subscribe
              </Button>
            </Box>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 3, borderColor: 'rgba(255, 255, 255, 0.2)' }} />
        
        <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'center' }}>
          <Typography variant="body2" sx={{ mb: isMobile ? 1 : 0 }}>
            © {currentYear} Meal Maestro. All rights reserved.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Link href="/privacy" color="inherit" variant="body2">
              Privacy Policy
            </Link>
            <Link href="/terms" color="inherit" variant="body2">
              Terms of Service
            </Link>
            <Link href="/contact" color="inherit" variant="body2">
              Contact Us
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
