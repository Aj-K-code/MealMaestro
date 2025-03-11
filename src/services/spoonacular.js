import axios from 'axios'
import localforage from 'localforage'

const API_KEY = import.meta.env.VITE_SPOONACULAR_KEY
const BASE_URL = 'https://api.spoonacular.com'

const cache = localforage.createInstance({
  name: 'spoonacularCache',
  storeName: 'apiResponses'
})

// Mock data for recipes
const mockRecipes = [
  {
    id: 716429,
    title: "Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs",
    image: "https://spoonacular.com/recipeImages/716429-556x370.jpg",
    imageType: "jpg",
    servings: 2,
    readyInMinutes: 45,
    license: "CC BY-SA 3.0",
    sourceName: "Full Belly Sisters",
    sourceUrl: "http://fullbellysisters.blogspot.com/2012/06/pasta-with-garlic-scallions-cauliflower.html",
    spoonacularSourceUrl: "https://spoonacular.com/pasta-with-garlic-scallions-cauliflower-breadcrumbs-716429",
    healthScore: 19.0,
    spoonacularScore: 83.0,
    pricePerServing: 163.15,
    analyzedInstructions: [],
    cheap: false,
    creditsText: "Full Belly Sisters",
    cuisines: [],
    dairyFree: false,
    diets: [],
    gaps: "no",
    glutenFree: false,
    instructions: "",
    ketogenic: false,
    lowFodmap: false,
    occasions: [],
    sustainable: false,
    vegan: false,
    vegetarian: false,
    veryHealthy: false,
    veryPopular: false,
    whole30: false,
    weightWatcherSmartPoints: 17,
    dishTypes: ["lunch", "main course", "main dish", "dinner"],
    extendedIngredients: [
      {
        id: 1001,
        name: "butter",
        amount: 1,
        unit: "tbsp",
        aisle: "Dairy",
        estimatedCost: { value: 0.5, unit: "USD" }
      },
      {
        id: 10011135,
        name: "cauliflower florets",
        amount: 2,
        unit: "cups",
        aisle: "Produce",
        estimatedCost: { value: 1.0, unit: "USD" }
      },
      {
        id: 1034053,
        name: "extra virgin olive oil",
        amount: 1,
        unit: "tbsp",
        aisle: "Oil, Vinegar, Salad Dressing",
        estimatedCost: { value: 0.5, unit: "USD" }
      }
    ],
    summary: "Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs might be a good recipe to expand your main course repertoire.",
    nutrition: {
      nutrients: [
        {
          name: "Calories",
          amount: 584.46,
          unit: "kcal"
        },
        {
          name: "Fat",
          amount: 19.83,
          unit: "g"
        },
        {
          name: "Protein",
          amount: 18.98,
          unit: "g"
        },
        {
          name: "Carbohydrates",
          amount: 84.82,
          unit: "g"
        }
      ]
    }
  },
  {
    id: 715538,
    title: "What to make for dinner tonight?? Bruschetta Style Pork & Pasta",
    image: "https://spoonacular.com/recipeImages/715538-556x370.jpg",
    imageType: "jpg",
    servings: 2,
    readyInMinutes: 35,
    license: "CC BY-SA 3.0",
    sourceName: "Pink When",
    sourceUrl: "http://www.pinkwhen.com/bruschetta-style-pork-pasta/",
    spoonacularSourceUrl: "https://spoonacular.com/what-to-make-for-dinner-tonight-bruschetta-style-pork-pasta-715538",
    healthScore: 56.0,
    spoonacularScore: 96.0,
    pricePerServing: 466.33,
    analyzedInstructions: [],
    cheap: false,
    creditsText: "Pink When",
    cuisines: [],
    dairyFree: false,
    diets: [],
    gaps: "no",
    glutenFree: false,
    instructions: "How to make Bruschetta Style Pork & Pasta...",
    ketogenic: false,
    lowFodmap: false,
    occasions: [],
    sustainable: false,
    vegan: false,
    vegetarian: false,
    veryHealthy: true,
    veryPopular: false,
    whole30: false,
    weightWatcherSmartPoints: 12,
    dishTypes: ["lunch", "main course", "main dish", "dinner"],
    extendedIngredients: [
      {
        id: 10120420,
        name: "farfalle pasta",
        amount: 8,
        unit: "ounces",
        aisle: "Pasta and Rice",
        estimatedCost: { value: 1.0, unit: "USD" }
      },
      {
        id: 10010219,
        name: "pork loin",
        amount: 1,
        unit: "pound",
        aisle: "Meat",
        estimatedCost: { value: 5.0, unit: "USD" }
      },
      {
        id: 11529,
        name: "tomato",
        amount: 1,
        unit: "large",
        aisle: "Produce",
        estimatedCost: { value: 0.75, unit: "USD" }
      }
    ],
    summary: "Bruschetta Style Pork & Pasta is a main course that serves 2. One serving contains 661 calories, 51g of protein, and 20g of fat.",
    nutrition: {
      nutrients: [
        {
          name: "Calories",
          amount: 661.23,
          unit: "kcal"
        },
        {
          name: "Fat",
          amount: 20.31,
          unit: "g"
        },
        {
          name: "Protein",
          amount: 51.38,
          unit: "g"
        },
        {
          name: "Carbohydrates",
          amount: 70.49,
          unit: "g"
        }
      ]
    }
  },
  {
    id: 782601,
    title: "Red Kidney Bean Jambalaya",
    image: "https://spoonacular.com/recipeImages/782601-556x370.jpg",
    imageType: "jpg",
    servings: 6,
    readyInMinutes: 45,
    license: "CC BY-SA 3.0",
    sourceName: "Foodista",
    sourceUrl: "http://www.foodista.com/recipe/6BFKWQ7R/red-kidney-bean-jambalaya",
    spoonacularSourceUrl: "https://spoonacular.com/red-kidney-bean-jambalaya-782601",
    healthScore: 100.0,
    spoonacularScore: 99.0,
    pricePerServing: 170.63,
    analyzedInstructions: [],
    cheap: false,
    creditsText: "Foodista.com – The Cooking Encyclopedia Everyone Can Edit",
    cuisines: ["Cajun", "Creole"],
    dairyFree: true,
    diets: ["gluten free", "dairy free", "lacto ovo vegetarian", "vegan"],
    gaps: "no",
    glutenFree: true,
    instructions: "Rinse the kidney beans and put in a pot. Cover with water and bring to a boil. Let boil for 10 minutes. Cover and let sit for 1 hour. Drain and rinse.\r\nIn a large pot, put the kidney beans, 5 cups of water, the garlic, 1 teaspoon of salt, the bay leaf, and the kombu. Cover and bring to a boil. Reduce the heat to medium-low and let simmer for 30 minutes. Remove the bay leaf and kombu. Drain the beans, reserving the bean broth.\r\nIn the same pot, heat the olive oil over medium heat. Add the onion, bell pepper, and celery. Let cook, stirring occasionally, for 8 minutes. Add the thyme, oregano, smoked paprika, black pepper, cayenne, remaining ½ teaspoon of salt, tomatoes, and kidney beans. Stir well. Add 4 cups of the reserved bean broth and bring to a boil. Reduce the heat to medium-low, cover, and let simmer for 30 minutes. Stir occasionally. Add more bean broth if needed. Serve over rice.",
    ketogenic: false,
    lowFodmap: false,
    occasions: [],
    sustainable: false,
    vegan: true,
    vegetarian: true,
    veryHealthy: true,
    veryPopular: false,
    whole30: false,
    weightWatcherSmartPoints: 12,
    dishTypes: ["lunch", "main course", "main dish", "dinner"],
    extendedIngredients: [
      {
        id: 16033,
        name: "kidney beans",
        amount: 1,
        unit: "cup",
        aisle: "Canned and Jarred",
        estimatedCost: { value: 0.87, unit: "USD" }
      },
      {
        id: 11282,
        name: "onion",
        amount: 1,
        unit: "large",
        aisle: "Produce",
        estimatedCost: { value: 0.7, unit: "USD" }
      },
      {
        id: 11333,
        name: "bell pepper",
        amount: 1,
        unit: "",
        aisle: "Produce",
        estimatedCost: { value: 0.99, unit: "USD" }
      }
    ],
    summary: "Red Kidney Bean Jambalaya might be a good recipe to expand your main course recipe box. This recipe makes 6 servings with 370 calories, 17g of protein, and 1g of fat each.",
    nutrition: {
      nutrients: [
        {
          name: "Calories",
          amount: 370.35,
          unit: "kcal"
        },
        {
          name: "Fat",
          amount: 1.29,
          unit: "g"
        },
        {
          name: "Protein",
          amount: 17.16,
          unit: "g"
        },
        {
          name: "Carbohydrates",
          amount: 73.83,
          unit: "g"
        }
      ]
    }
  }
];

// Mock recipe details
const mockRecipeDetails = {
  716429: {
    id: 716429,
    title: "Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs",
    image: "https://spoonacular.com/recipeImages/716429-556x370.jpg",
    servings: 2,
    readyInMinutes: 45,
    instructions: "Bring a large pot of water to boil for the pasta. While it's heating, melt butter in a large heavy skillet over medium heat. Add the cauliflower and cook, stirring occasionally, until golden, about 6 minutes. Add breadcrumbs and cook, stirring, until golden, about 2 minutes. Stir in salt and pepper to taste and reserve.\nCook pasta until it's almost al dente. Meanwhile, in another large skillet, heat the olive oil over medium-low heat. Add garlic and scallions and cook, stirring occasionally, until soft, about 3 minutes.\nDrain pasta and add it to the skillet with the garlic and scallions. Cook for 1 minute, stirring. Add 1/2 cup of the pasta cooking water and cook until the pasta is al dente and the sauce coats the pasta, about 1 minute longer. Season with salt and pepper and transfer to a large bowl. Add the cauliflower breadcrumb mixture and toss well. Serve immediately.",
    ingredients: [
      {
        id: 1001,
        name: "butter",
        amount: 1,
        unit: "tbsp",
        aisle: "Dairy",
        estimatedCost: { value: 0.5, unit: "USD" }
      },
      {
        id: 10011135,
        name: "cauliflower florets",
        amount: 2,
        unit: "cups",
        aisle: "Produce",
        estimatedCost: { value: 1.0, unit: "USD" }
      },
      {
        id: 1034053,
        name: "extra virgin olive oil",
        amount: 1,
        unit: "tbsp",
        aisle: "Oil, Vinegar, Salad Dressing",
        estimatedCost: { value: 0.5, unit: "USD" }
      }
    ],
    nutrition: {
      nutrients: [
        {
          name: "Calories",
          amount: 584.46,
          unit: "kcal"
        },
        {
          name: "Fat",
          amount: 19.83,
          unit: "g"
        },
        {
          name: "Protein",
          amount: 18.98,
          unit: "g"
        },
        {
          name: "Carbohydrates",
          amount: 84.82,
          unit: "g"
        }
      ]
    }
  }
};

export const searchRecipes = async (params) => {
  try {
    // First try to get from cache
    const cacheKey = `search:${JSON.stringify(params)}`
    const cached = await cache.getItem(cacheKey)
    if (cached) return cached

    // If using mock data (or if API call fails)
    const mockResponse = {
      results: mockRecipes,
      offset: 0,
      number: mockRecipes.length,
      totalResults: mockRecipes.length
    }

    // Try real API call if we have a valid API key
    if (API_KEY && API_KEY !== '1a2b3c4d5e6f7g8h9i0j') {
      try {
        const response = await axios.get(`${BASE_URL}/recipes/complexSearch`, {
          params: {
            apiKey: API_KEY,
            addRecipeInformation: true,
            addRecipeNutrition: true,
            ...params
          }
        })
        await cache.setItem(cacheKey, response.data)
        return response.data
      } catch (error) {
        console.log('API call failed, using mock data', error)
        await cache.setItem(cacheKey, mockResponse)
        return mockResponse
      }
    }

    // Use mock data
    await cache.setItem(cacheKey, mockResponse)
    return mockResponse
  } catch (error) {
    console.error('Error in searchRecipes:', error)
    return {
      results: mockRecipes,
      offset: 0,
      number: mockRecipes.length,
      totalResults: mockRecipes.length
    }
  }
}

export const getRecipeDetails = async (id) => {
  try {
    // First try to get from cache
    const cacheKey = `recipe-${id}`
    const cached = await cache.getItem(cacheKey)
    if (cached) return cached

    // If using mock data (or if API call fails)
    const mockDetail = mockRecipeDetails[id] || {
      ...mockRecipes.find(r => r.id === parseInt(id)) || mockRecipes[0],
      ingredients: (mockRecipes.find(r => r.id === parseInt(id)) || mockRecipes[0]).extendedIngredients.map(ing => ({
        id: ing.id,
        name: ing.name,
        amount: ing.amount,
        unit: ing.unit,
        aisle: ing.aisle,
        estimatedCost: ing.estimatedCost
      }))
    }

    // Try real API call if we have a valid API key
    if (API_KEY && API_KEY !== '1a2b3c4d5e6f7g8h9i0j') {
      try {
        const response = await axios.get(`${BASE_URL}/recipes/${id}/information`, {
          params: {
            apiKey: API_KEY,
            includeNutrition: true
          }
        })
        
        const recipeData = {
          ...response.data,
          ingredients: response.data.extendedIngredients.map(ing => ({
            id: ing.id,
            name: ing.name,
            amount: ing.amount,
            unit: ing.unit,
            aisle: ing.aisle,
            estimatedCost: ing.estimatedCost
          }))
        }

        await cache.setItem(cacheKey, recipeData)
        return recipeData
      } catch (error) {
        console.log('API call failed, using mock data', error)
        await cache.setItem(cacheKey, mockDetail)
        return mockDetail
      }
    }

    // Use mock data
    await cache.setItem(cacheKey, mockDetail)
    return mockDetail
  } catch (error) {
    console.error('Error in getRecipeDetails:', error)
    return mockRecipeDetails[716429]
  }
}

// Mock nutrition data for the nutrition dashboard
export const getNutritionData = async () => {
  return {
    calories: {
      current: 1850,
      target: 2000,
      unit: 'kcal'
    },
    protein: {
      current: 85,
      target: 100,
      unit: 'g'
    },
    carbs: {
      current: 210,
      target: 250,
      unit: 'g'
    },
    fat: {
      current: 65,
      target: 70,
      unit: 'g'
    },
    dailyIntake: [
      { day: 'Mon', calories: 1950 },
      { day: 'Tue', calories: 2100 },
      { day: 'Wed', calories: 1850 },
      { day: 'Thu', calories: 1750 },
      { day: 'Fri', calories: 2200 },
      { day: 'Sat', calories: 2300 },
      { day: 'Sun', calories: 1900 }
    ],
    macroDistribution: [
      { name: 'Protein', value: 25 },
      { name: 'Carbs', value: 50 },
      { name: 'Fat', value: 25 }
    ]
  }
}
