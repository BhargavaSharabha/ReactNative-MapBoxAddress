# Address to Coordinates Converter

A React Native app built with Expo that converts USA addresses to latitude and longitude coordinates using MapBox API.

## Features

- ✅ Real-time address autocomplete suggestions
- ✅ Address to coordinates conversion
- ✅ Interactive map display
- ✅ Copy coordinates functionality
- ✅ Open location in external maps app
- ✅ Error handling and loading states
- ✅ Clean, modern UI

## Prerequisites

- Node.js (v14 or higher)
- Expo CLI
- MapBox account and access token

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Get MapBox Access Token

#### Detailed Steps to Get Your MapBox Access Token:

1. **Visit MapBox Website**

   - Go to [MapBox](https://www.mapbox.com/)
   - Click "Sign up" or "Log in" if you already have an account
2. **Create Account (if new user)**

   - Fill in your email, password, and name
   - Verify your email address
   - Complete the account setup
3. **Navigate to Access Tokens**

   - Log in to your MapBox account
   - Go to your [Account Dashboard](https://account.mapbox.com/)
   - Click on "Access tokens" in the left sidebar
4. **Create New Token**

   - Click "Create a token"
   - Give your token a name (e.g., "Address Converter App")
   - Set the token type to "Public" (for client-side usage)
   - Set the token scope to include:
     - `styles:read` (for map display)
     - `styles:tiles` (for map tiles)
     - `geocoding` (for address search and geocoding)
   - Click "Create token"
5. **Copy Your Token**

   - Copy the generated token (starts with `pk.`)
   - Keep it secure and don't share it publicly

### 3. Configure Environment Variables

1. **Create Environment File**

   - Create a new file called `.env` in the project root
   - Copy the content from the example below
2. **Example .env File**

   ```env
   # Mapbox Configuration (Expo public envs)
   EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN=your_actual_mapbox_token_here
   EXPO_PUBLIC_MAPBOX_BASE_URL=https://api.mapbox.com/geocoding/v5/mapbox.places
   ```
3. **Replace Token**

   - Replace `your_actual_mapbox_token_here` with your actual MapBox access token
   - Save the file

**Note**: Expo only exposes variables prefixed with `EXPO_PUBLIC_` to the app.

### 4. Run the App

```bash
# Start the development server
npx expo start

# Run on Android
npm run android

# Run on iOS (requires macOS)
npm run ios

# Run on web
npm run web
```

## Usage

1. **Enter Address**: Type a USA address in the input field
2. **Select Suggestion**: Choose from the autocomplete suggestions that appear
3. **View Results**: See the coordinates and map location
4. **Copy Coordinates**: Tap "Copy Coordinates" to copy lat/lng
5. **Open in Maps**: Tap "Open in Maps" to view in external maps app
6. **New Search**: Tap "New Search" to start over

## Project Structure

```
AddressConverter/
├── components/
│   ├── AddressInput.js      # Address input with autocomplete
│   └── ResultsDisplay.js    # Results display with map
├── services/
│   └── mapboxService.js     # MapBox API integration
├── App.js                   # Main app component
├── package.json
└── README.md
```

## API Usage

The app uses MapBox's Geocoding API with the following endpoints:

- **Geocoding**: Converts addresses to coordinates
- **Places API**: Provides address autocomplete suggestions

### Rate Limits

- MapBox free tier: 50,000 requests per month
- Rate limiting: 600 requests per minute

## Error Handling

The app handles various error scenarios:

- Invalid addresses
- Network connectivity issues
- API rate limiting
- No results found

## Customization

### Styling

All styles are defined in the respective component files using StyleSheet. You can customize:

- Colors and themes
- Layout and spacing
- Typography
- Component dimensions

### API Configuration

You can modify the MapBox service to:

- Change the country filter (currently set to US)
- Adjust result limits
- Add additional search parameters

## Troubleshooting

### Common Issues

1. **"Geocoding failed" error**

   - Check your MapBox access token in the `.env` file
   - Verify the token is valid and has the correct permissions
   - Ensure internet connectivity
   - Verify the address is valid
2. **Map not displaying**

   - Check if react-native-maps is properly installed
   - Verify MapBox token has map permissions (`styles:read`, `styles:tiles`)
   - Ensure the `.env` file is in the project root
3. **Autocomplete not working**

   - Check MapBox API quota (free tier: 50,000 requests/month)
   - Verify network connectivity
   - Ensure the token has `geocoding` permissions
4. **Environment variables not loading**

   - Make sure the `.env` file is in the project root directory
   - Verify the file is named exactly `.env` (not `.env.txt` or similar)
   - Restart the development server after creating the `.env` file

### Debug Mode

To enable debug logging, add console.log statements in the service files.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.

## Support

For issues and questions:

1. Check the troubleshooting section
2. Review MapBox documentation
3. Open an issue on GitHub

---

**Note**: This app requires a valid MapBox access token to function. The free tier provides 50,000 requests per month, which is sufficient for development and small-scale usage.
