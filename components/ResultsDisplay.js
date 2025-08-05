import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Linking
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const ResultsDisplay = ({ coordinates, address, onReset }) => {
  const handleCopyCoordinates = () => {
    const coordText = `${coordinates.latitude}, ${coordinates.longitude}`;
    // In a real app, you'd use Clipboard API
    Alert.alert('Coordinates Copied', coordText);
  };

  const handleOpenInMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${coordinates.latitude},${coordinates.longitude}`;
    Linking.openURL(url).catch(() => {
      Alert.alert('Error', 'Could not open maps app');
    });
  };

  if (!coordinates) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Location Found!</Text>
        <TouchableOpacity style={styles.resetButton} onPress={onReset}>
          <Text style={styles.resetButtonText}>New Search</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.addressContainer}>
        <Text style={styles.addressLabel}>Address:</Text>
        <Text style={styles.addressText}>{address}</Text>
      </View>

      <View style={styles.coordinatesContainer}>
        <Text style={styles.coordinatesLabel}>Coordinates:</Text>
        <View style={styles.coordinateRow}>
          <Text style={styles.coordinateText}>
            Latitude: {coordinates.latitude.toFixed(6)}
          </Text>
        </View>
        <View style={styles.coordinateRow}>
          <Text style={styles.coordinateText}>
            Longitude: {coordinates.longitude.toFixed(6)}
          </Text>
        </View>
      </View>

      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: coordinates.latitude,
            longitude: coordinates.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker
            coordinate={{
              latitude: coordinates.latitude,
              longitude: coordinates.longitude,
            }}
            title={address}
            description="Selected location"
          />
        </MapView>
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionButton} onPress={handleCopyCoordinates}>
          <Text style={styles.actionButtonText}>Copy Coordinates</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={handleOpenInMaps}>
          <Text style={styles.actionButtonText}>Open in Maps</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  resetButton: {
    backgroundColor: '#6c757d',
    padding: 10,
    borderRadius: 6,
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  addressContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  addressLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6c757d',
    marginBottom: 5,
  },
  addressText: {
    fontSize: 16,
    color: '#333',
  },
  coordinatesContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  coordinatesLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6c757d',
    marginBottom: 10,
  },
  coordinateRow: {
    marginBottom: 5,
  },
  coordinateText: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'monospace',
  },
  mapContainer: {
    height: 300,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  map: {
    flex: 1,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ResultsDisplay; 