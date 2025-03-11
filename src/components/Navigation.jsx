import { useState } from 'react'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  InputBase,
  Badge,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material'
import { styled, alpha } from '@mui/material/styles'
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  AccountCircle,
  Notifications,
  RestaurantMenu,
  CalendarMonth,
  ShoppingCart,
  Kitchen,
  BarChart,
  Close as CloseIcon
} from '@mui/icons-material'

const pages = [
  { name: 'Recipes', path: '/recipes', icon: <RestaurantMenu /> },
  { name: 'Meal Planner', path: '/plan', icon: <CalendarMonth /> },
  { name: 'Grocery List', path: '/grocery', icon: <ShoppingCart /> },
  { name: 'Pantry', path: '/pantry', icon: <Kitchen /> },
  { name: 'Nutrition', path: '/nutrition', icon: <BarChart /> }
]

const settings = ['Profile', 'Preferences', 'Subscription', 'Logout']

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}))

export default function Navigation({ isMobile }) {
  const location = useLocation()
  const [anchorElNav, setAnchorElNav] = useState(null)
  const [anchorElUser, setAnchorElUser] = useState(null)
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }
  
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Navigate to search results with query
      window.location.href = `/recipes?search=${encodeURIComponent(searchQuery)}`
    }
  }

  const toggleMobileDrawer = () => {
    setMobileDrawerOpen(!mobileDrawerOpen)
  }

  return (
    <AppBar position="fixed" elevation={1}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo for desktop */}
          <Typography
            variant="h6"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.2rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            MEAL MAESTRO
          </Typography>

          {/* Mobile menu icon */}
          <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={toggleMobileDrawer}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>

          {/* Logo for mobile */}
          <Typography
            variant="h5"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.2rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            MM
          </Typography>

          {/* Desktop navigation */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                component={RouterLink}
                to={page.path}
                sx={{ 
                  my: 2, 
                  color: 'white', 
                  display: 'block',
                  borderBottom: location.pathname === page.path ? '2px solid white' : 'none',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  }
                }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          {/* Search bar */}
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <form onSubmit={handleSearchSubmit}>
              <StyledInputBase
                placeholder="Search recipes…"
                inputProps={{ 'aria-label': 'search' }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </Search>

          {/* Notifications */}
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton size="large" color="inherit">
              <Badge badgeContent={4} color="error">
                <Notifications />
              </Badge>
            </IconButton>
          </Box>

          {/* User menu */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="User" src="/avatar.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>

      {/* Mobile drawer */}
      <Drawer
        anchor="left"
        open={mobileDrawerOpen}
        onClose={toggleMobileDrawer}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleMobileDrawer}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
            <Typography variant="h6" component="div">
              Menu
            </Typography>
            <IconButton onClick={toggleMobileDrawer}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider />
          <List>
            {pages.map((page) => (
              <ListItem 
                button 
                key={page.name} 
                component={RouterLink} 
                to={page.path}
                selected={location.pathname === page.path}
              >
                <ListItemIcon>{page.icon}</ListItemIcon>
                <ListItemText primary={page.name} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  )
}
