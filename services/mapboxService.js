const MAPBOX_ACCESS_TOKEN = 'YOUR_MAPBOX_ACCESS_TOKEN'; // Replace with your actual token
const MAPBOX_BASE_URL = 'https://api.mapbox.com/geocoding/v5/mapbox.places';

export const geocodeAddress = async (address) => {
  try {
    const encodedAddress = encodeURIComponent(address);
    const url = `${MAPBOX_BASE_URL}/${encodedAddress}.json?access_token=${MAPBOX_ACCESS_TOKEN}&country=US&types=address`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.features && data.features.length > 0) {
      const feature = data.features[0];
      return {
        latitude: feature.center[1],
        longitude: feature.center[0],
        formattedAddress: feature.place_name,
        confidence: feature.relevance
      };
    } else {
      throw new Error('No results found for this address');
    }
  } catch (error) {
    throw new Error(`Geocoding failed: ${error.message}`);
  }
};

export const searchAddresses = async (query) => {
  try {
    const encodedQuery = encodeURIComponent(query);
    const url = `${MAPBOX_BASE_URL}/${encodedQuery}.json?access_token=${MAPBOX_ACCESS_TOKEN}&country=US&types=address&limit=5`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.features && data.features.length > 0) {
      return data.features.map(feature => ({
        id: feature.id,
        text: feature.place_name,
        relevance: feature.relevance
      }));
    } else {
      return [];
    }
  } catch (error) {
    console.error('Address search failed:', error);
    return [];
  }
}; 