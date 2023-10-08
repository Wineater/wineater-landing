import { baseApiUrl } from "~/global";

export interface WineDetail {
    Appellation: string | null;
    Country: string;
    Grape: string;
    ID: string;
    Image: string;
    Price: string;
    Producer: string;
    Region: string;
    Store: string;
    Title: string;
    Type: string;
    Url: string;
  }

export async function fetchRecommendations(dish: string, store: string = "Climats") {
    try {
      const response = await useFetch(`${baseApiUrl}dish/recommendations`, {
        method: 'POST',
        body: {
            text: dish,
            store: store
        }
      });
      return response.data as unknown as WineDetail[];
    } catch (error) {
      console.error('Error fetching data from API:', error);
      throw error;
    }
  }
