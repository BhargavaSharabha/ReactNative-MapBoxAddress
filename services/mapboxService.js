import Constants from 'expo-constants';

// Prefer Expo public env vars; fallback to config extra if provided
const MAPBOX_ACCESS_TOKEN =
  process.env.EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN ||
  process.env.MAPBOX_ACCESS_TOKEN ||
  Constants?.expoConfig?.extra?.mapboxAccessToken ||
  '';

const MAPBOX_BASE_URL =
  process.env.EXPO_PUBLIC_MAPBOX_BASE_URL ||
  process.env.MAPBOX_BASE_URL ||
  Constants?.expoConfig?.extra?.mapboxBaseUrl ||
  'https://api.mapbox.com/geocoding/v5/mapbox.places';

export const geocodeAddress = async (address) => {
  try {
    if (!MAPBOX_ACCESS_TOKEN) {
      throw new Error('Missing Mapbox access token. Set EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN in your .env');
    }
    const encodedAddress = encodeURIComponent(address);
    const url = `${MAPBOX_BASE_URL}/${encodedAddress}.json?access_token=${MAPBOX_ACCESS_TOKEN}&country=US&types=address`;
    
    console.log('🔍 Geocoding URL:', url);
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    
    console.log('ℹ️ Geocoding Response:', data);
    
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

    if (!MAPBOX_ACCESS_TOKEN) {
      console.warn('Mapbox token missing; address search will return empty results');
      return [];
    }
    const encodedQuery = encodeURIComponent(query);
    // Allow broader place types and enable autocomplete for partial queries
    const url = `${MAPBOX_BASE_URL}/${encodedQuery}.json?access_token=${MAPBOX_ACCESS_TOKEN}&country=US&types=address,place&autocomplete=true&limit=5`;

    console.log('🔍 Search URL:', url);

    const response = await fetch(url);
    console.log('ℹ️ Response status:', response.status);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('ℹ️ Search Response received');

    if (data.features && data.features.length > 0) {
      const results = data.features.map((feature) => {
        const findContext = (type) =>
          (feature.context || []).find((c) => c.id?.startsWith(`${type}.`));

        // Compose address line 1 where possible
        const isAddress = feature.place_type?.includes('address');
        const houseNumber = feature.address || feature.properties?.address || '';
        const streetName = feature.text || '';
        const address1 = isAddress
          ? [houseNumber, streetName].filter(Boolean).join(' ').trim()
          : streetName;

        const city = findContext('place')?.text || findContext('locality')?.text || '';
        const state = findContext('region')?.text || '';
        const zipcode = findContext('postcode')?.text || '';

        const [longitude, latitude] = feature.center || [undefined, undefined];

        return {
          id: feature.id,
          text: feature.place_name,
          relevance: feature.relevance,
          address1,
          city,
          state,
          zipcode,
          latitude,
          longitude,
        };
      });

      console.log('✅ Processed results (structured):', results);
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