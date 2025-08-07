const MAPBOX_ACCESS_TOKEN = process.env.MAPBOX_ACCESS_TOKEN || 'pk.eyJ1IjoiYmhhcmdhdmExNDU4IiwiYSI6ImNtZHlzN2w2cDA1N2EyanExc3Y3YXJreGwifQ.W8OJlNN_roEBFRj05Wmm5A';
const MAPBOX_BASE_URL = process.env.MAPBOX_BASE_URL || 'https://api.mapbox.com/geocoding/v5/mapbox.places';

export const geocodeAddress = async (address) => {
  try {
    const encodedAddress = encodeURIComponent(address);
    const url = `${MAPBOX_BASE_URL}/${encodedAddress}.json?access_token=${MAPBOX_ACCESS_TOKEN}&country=US&types=address`;
    
    console.log('🔍 Geocoding URL:', url);
    
    const response = await fetch(url);
    const data = await response.json();
    
    console.log('�� Geocoding Response:', data);
    
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
    console.error('❌ Geocoding Error:', error);
    throw new Error(`Geocoding failed: ${error.message}`);
  }
};

export const searchAddresses = async (query) => {
  try {
    console.log('🔍 Search Addresses called with query:', query);
    
    const encodedQuery = encodeURIComponent(query);
    const url = `${MAPBOX_BASE_URL}/${encodedQuery}.json?access_token=${MAPBOX_ACCESS_TOKEN}&country=US&types=address&limit=5`;
    
    console.log('🔍 Search URL:', url);
    
    const response = await fetch(url);
    console.log('�� Response status:', response.status);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('�� Search Response:', data);
    
    if (data.features && data.features.length > 0) {
      const results = data.features.map(feature => ({
        id: feature.id,
        text: feature.place_name,
        relevance: feature.relevance
      }));
      console.log('✅ Processed results:', results);
      return results;
    } else {
      console.log('⚠️ No features found in response');
      return [];
    }
  } catch (error) {
    console.error('❌ Address search failed:', error);
    return [];
  }
};