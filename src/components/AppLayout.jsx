import { useState, useEffect } from 'react'
import { Box, CssBaseline, useMediaQuery, useTheme } from '@mui/material'
import Navigation from './Navigation'
import Footer from './Footer'
import PremiumBanner from './PremiumBanner'

export default function AppLayout({ children }) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [showPremiumBanner, setShowPremiumBanner] = useState(false)
  
  useEffect(() => {
    // Show premium banner after user has been active for some time
    const timer = setTimeout(() => {
      setShowPremiumBanner(true)
    }, 300000) // 5 minutes
    
    return () => clearTimeout(timer)
  }, [])

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column',
      minHeight: '100vh',
      backgroundColor: theme.palette.background.default
    }}>
      <CssBaseline />
      <Navigation isMobile={isMobile} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: isMobile ? 2 : 3,
          pt: isMobile ? 9 : 10,
          pb: isMobile ? 8 : 3
        }}
      >
        {children}
        {showPremiumBanner && <PremiumBanner onClose={() => setShowPremiumBanner(false)} />}
      </Box>
      <Footer />
    </Box>
  )
}
