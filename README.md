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

1. Go to [MapBox](https://www.mapbox.com/)
2. Create a free account
3. Navigate to your account dashboard
4. Create a new access token
5. Copy the token

### 3. Configure MapBox Token

Open `services/mapboxService.js` and replace `YOUR_MAPBOX_ACCESS_TOKEN` with your actual MapBox access token:

```javascript
const MAPBOX_ACCESS_TOKEN = 'your_actual_mapbox_token_here';
```

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
   - Check your MapBox access token
   - Verify internet connectivity
   - Ensure the address is valid

2. **Map not displaying**
   - Check if react-native-maps is properly installed
   - Verify MapBox token has map permissions

3. **Autocomplete not working**
   - Check MapBox API quota
   - Verify network connectivity

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