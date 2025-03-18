import axios from 'axios'

const API_URL = 'https://api.mealmaestro.com/share'

export const shareMealPlan = async (mealPlan) => {
  try {
    const response = await axios.post(API_URL, { mealPlan })
    return response.data.shareId
  } catch (error) {
    console.error('Error sharing meal plan:', error)
    throw error
  }
}

export const getSharedMealPlan = async (shareId) => {
  try {
    const response = await axios.get(`${API_URL}/${shareId}`)
    return response.data.mealPlan
  } catch (error) {
    console.error('Error getting shared meal plan:', error)
    throw error
  }
}
