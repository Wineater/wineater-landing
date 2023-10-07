import { baseApiUrl } from "~/global";

export async function fetchRecommendations(dish: string, store?: string) {
    try {
      const response = await useFetch(`${baseApiUrl}dish/recommendations`, {
        method: 'POST',
        body: {
            text: dish,
            store: store
        }
      })
      return response.data;
    } catch (error) {
      console.error('Error fetching data from API:', error);
      throw error;
    }
  }