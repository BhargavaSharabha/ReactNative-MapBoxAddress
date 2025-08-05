import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Linking
} from 'react-native';

const ResultsDisplay = ({ coordinates, address, onReset }) => {
  const handleCopyCoordinates = () => {
    const coordText = `${coordinates.latitude}, ${coordinates.longitude}`;
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

      <View style={styles.mapPlaceholder}>
        <Text style={styles.mapPlaceholderText}>📍 Map View</Text>
        <Text style={styles.mapPlaceholderSubtext}>Location: {coordinates.latitude.toFixed(4)}, {coordinates.longitude.toFixed(4)}</Text>
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
  mapPlaceholder: {
    height: 200,
    backgroundColor: '#e9ecef',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#dee2e6',
  },
  mapPlaceholderText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6c757d',
    marginBottom: 5,
  },
  mapPlaceholderSubtext: {
    fontSize: 14,
    color: '#6c757d',
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