import { useState } from 'react'
import { 
  Paper, 
  Box, 
  Typography, 
  Button, 
  IconButton, 
  Collapse, 
  Chip,
  useTheme,
  useMediaQuery
} from '@mui/material'
import { Close as CloseIcon, Star as StarIcon, Check as CheckIcon } from '@mui/icons-material'

export default function PremiumBanner({ onClose }) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const [expanded, setExpanded] = useState(false)
  
  const premiumFeatures = [
    'Advanced nutritional analytics',
    'Personalized meal recommendations',
    'AI-powered ingredient substitutions',
    'Unlimited recipe collections',
    'Ad-free experience'
  ]
  
  return (
    <Collapse in={true}>
      <Paper
        elevation={3}
        sx={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          left: isMobile ? 20 : 'auto',
          maxWidth: 450,
          p: 2,
          borderRadius: 2,
          zIndex: 1000,
          background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
          color: 'white',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <StarIcon sx={{ mr: 1, color: theme.palette.secondary.main }} />
            <Typography variant="h6" component="div">
              Upgrade to Premium
            </Typography>
            <Chip 
              label="SAVE 20%" 
              size="small" 
              sx={{ 
                ml: 1, 
                backgroundColor: theme.palette.secondary.main,
                color: 'white',
                fontWeight: 'bold'
              }} 
            />
          </Box>
          <IconButton 
            size="small" 
            onClick={onClose}
            sx={{ 
              color: 'white',
              '&:hover': { 
                backgroundColor: 'rgba(255, 255, 255, 0.1)' 
              }
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
        
        <Typography variant="body2" sx={{ mb: 2 }}>
          Unlock advanced features to supercharge your meal planning and nutrition tracking.
        </Typography>
        
        {expanded && (
          <Box sx={{ mb: 2 }}>
            {premiumFeatures.map((feature, index) => (
              <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                <CheckIcon fontSize="small" sx={{ mr: 1, color: theme.palette.secondary.main }} />
                <Typography variant="body2">{feature}</Typography>
              </Box>
            ))}
          </Box>
        )}
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Button 
            variant="contained" 
            color="secondary"
            sx={{ 
              fontWeight: 'bold',
              '&:hover': { 
                backgroundColor: theme.palette.secondary.dark 
              }
            }}
          >
            Try Premium Free
          </Button>
          <Button 
            variant="text" 
            color="inherit"
            size="small"
            onClick={() => setExpanded(!expanded)}
            sx={{ 
              textTransform: 'none',
              '&:hover': { 
                backgroundColor: 'rgba(255, 255, 255, 0.1)' 
              }
            }}
          >
            {expanded ? 'Show less' : 'Learn more'}
          </Button>
        </Box>
      </Paper>
    </Collapse>
  )
}
