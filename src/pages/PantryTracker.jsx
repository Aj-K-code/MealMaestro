import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Grid, 
  Paper, 
  TextField, 
  Button, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemSecondaryAction, 
  IconButton, 
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import localforage from 'localforage';

const PantryTracker = () => {
  const [pantryItems, setPantryItems] = useState([]);
  const [newItem, setNewItem] = useState({
    name: '',
    quantity: '',
    unit: 'units',
    category: 'other',
    expirationDate: ''
  });
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const categories = [
    'dairy', 'meat', 'produce', 'grains', 
    'canned', 'frozen', 'spices', 'baking', 'other'
  ];

  const units = [
    'units', 'g', 'kg', 'oz', 'lb', 
    'ml', 'l', 'tsp', 'tbsp', 'cups'
  ];

  // Load pantry items from storage on component mount
  useEffect(() => {
    const loadPantryItems = async () => {
      try {
        const storedItems = await localforage.getItem('pantryItems');
        if (storedItems) {
          setPantryItems(storedItems);
        }
      } catch (error) {
        console.error('Error loading pantry items:', error);
      }
    };
    
    loadPantryItems();
  }, []);

  // Save pantry items to storage whenever they change
  useEffect(() => {
    const savePantryItems = async () => {
      try {
        await localforage.setItem('pantryItems', pantryItems);
      } catch (error) {
        console.error('Error saving pantry items:', error);
      }
    };
    
    savePantryItems();
  }, [pantryItems]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem(prev => ({ ...prev, [name]: value }));
  };

  const handleAddItem = () => {
    if (!newItem.name.trim()) return;
    
    if (editingItem !== null) {
      // Update existing item
      const updatedItems = pantryItems.map((item, index) => 
        index === editingItem ? { ...newItem } : item
      );
      setPantryItems(updatedItems);
      setEditingItem(null);
    } else {
      // Add new item
      setPantryItems([...pantryItems, { ...newItem }]);
    }
    
    // Reset form
    setNewItem({
      name: '',
      quantity: '',
      unit: 'units',
      category: 'other',
      expirationDate: ''
    });
  };

  const handleEditItem = (index) => {
    setNewItem(pantryItems[index]);
    setEditingItem(index);
  };

  const handleDeleteItem = (index) => {
    const updatedItems = pantryItems.filter((_, i) => i !== index);
    setPantryItems(updatedItems);
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
    setNewItem({
      name: '',
      quantity: '',
      unit: 'units',
      category: 'other',
      expirationDate: ''
    });
  };

  // Filter and search pantry items
  const filteredItems = pantryItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Pantry Tracker
      </Typography>
      
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          {editingItem !== null ? 'Edit Item' : 'Add New Item'}
        </Typography>
        
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Item Name"
              name="name"
              value={newItem.name}
              onChange={handleInputChange}
              variant="outlined"
              size="small"
            />
          </Grid>
          
          <Grid item xs={6} sm={2}>
            <TextField
              fullWidth
              label="Quantity"
              name="quantity"
              type="number"
              value={newItem.quantity}
              onChange={handleInputChange}
              variant="outlined"
              size="small"
            />
          </Grid>
          
          <Grid item xs={6} sm={2}>
            <FormControl fullWidth size="small">
              <InputLabel>Unit</InputLabel>
              <Select
                name="unit"
                value={newItem.unit}
                label="Unit"
                onChange={handleInputChange}
              >
                {units.map(unit => (
                  <MenuItem key={unit} value={unit}>{unit}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={6} sm={2}>
            <FormControl fullWidth size="small">
              <InputLabel>Category</InputLabel>
              <Select
                name="category"
                value={newItem.category}
                label="Category"
                onChange={handleInputChange}
              >
                {categories.map(category => (
                  <MenuItem key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={6} sm={2}>
            <TextField
              fullWidth
              label="Expiration Date"
              name="expirationDate"
              type="date"
              value={newItem.expirationDate}
              onChange={handleInputChange}
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              size="small"
            />
          </Grid>
          
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant="contained"
                color="primary"
                startIcon={editingItem !== null ? <EditIcon /> : <AddIcon />}
                onClick={handleAddItem}
              >
                {editingItem !== null ? 'Update' : 'Add'}
              </Button>
              
              {editingItem !== null && (
                <Button
                  variant="outlined"
                  onClick={handleCancelEdit}
                >
                  Cancel
                </Button>
              )}
            </Box>
          </Grid>
        </Grid>
      </Paper>
      
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          My Pantry
        </Typography>
        
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Search Items"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              variant="outlined"
              size="small"
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth size="small">
              <InputLabel>Filter by Category</InputLabel>
              <Select
                value={filterCategory}
                label="Filter by Category"
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                <MenuItem value="all">All Categories</MenuItem>
                {categories.map(category => (
                  <MenuItem key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        
        {filteredItems.length > 0 ? (
          <List>
            {filteredItems.map((item, index) => (
              <React.Fragment key={index}>
                <ListItem>
                  <ListItemText
                    primary={item.name}
                    secondary={
                      <>
                        <Typography component="span" variant="body2">
                          {`${item.quantity} ${item.unit} • ${item.category}`}
                        </Typography>
                        {item.expirationDate && (
                          <Typography component="span" variant="body2" sx={{ ml: 1 }}>
                            {` • Expires: ${item.expirationDate}`}
                          </Typography>
                        )}
                      </>
                    }
                  />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" onClick={() => handleEditItem(index)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton edge="end" onClick={() => handleDeleteItem(index)}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                {index < filteredItems.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        ) : (
          <Typography variant="body1" sx={{ textAlign: 'center', py: 3 }}>
            No pantry items found. Add some items to get started!
          </Typography>
        )}
      </Paper>
    </Container>
  );
};

export default PantryTracker;
