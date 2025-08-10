import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { searchAddresses } from '../services/mapboxService';

const AddressInput = ({ onAddressSelect }) => {
  // Structured address fields
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [city, setCity] = useState('');
  const [stateValue, setStateValue] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [lockLocationFields, setLockLocationFields] = useState(false);
  const address2Ref = useRef(null);

  // Suggestions state
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchTimeoutRef = useRef(null);

  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (address1.length >= 3) {
      if (__DEV__) console.log('Search: address1 length >= 3, querying for:', address1);
      setLoading(true);
      searchTimeoutRef.current = setTimeout(async () => {
        try {
          if (__DEV__) console.log('Debounced search triggered for:', address1);
          const results = await searchAddresses(address1);
          if (__DEV__) console.log('Search results received:', results);
          setSuggestions(results);
          setShowSuggestions(true);
          if (__DEV__) console.log('Suggestions updated, count:', results.length);
        } catch (error) {
          console.error('Search error:', error);
        } finally {
          setLoading(false);
        }
      }, 500);
    } else {
      if (__DEV__) console.log('Query too short or empty, clearing suggestions');
      setSuggestions([]);
      setShowSuggestions(false);
      setLoading(false);
    }

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [address1]);

  const handleSuggestionPress = (item) => {
    if (__DEV__) console.log('Address selected:', item);
    setAddress1(item.address1 || item.text || '');
    setCity(item.city || '');
    setStateValue(item.state || '');
    setZipcode(item.zipcode || '');
    setShowSuggestions(false);
    setLockLocationFields(true);
    // Move focus to Address 2 so the user can enter Apt/Suite
    setTimeout(() => {
      address2Ref.current?.focus();
    }, 0);
  };

  const handleSubmit = () => {
    const a1 = address1.trim();
    const a2 = address2.trim();
    const c = city.trim();
    const s = stateValue.trim();
    const z = zipcode.trim();

    if (a1 && c && s && z) {
      const fullAddress = [
        [a1, a2].filter(Boolean).join(', '),
        [c, s, z].filter(Boolean).join(', '),
      ]
        .filter(Boolean)
        .join(', ');

      onAddressSelect(fullAddress);
      setShowSuggestions(false);
    } else {
      Alert.alert('Error', 'Please complete Address 1, City, State, and Zipcode');
    }
  };

  if (__DEV__) {
    // lightweight debug
    // console.log('Render - showSuggestions:', showSuggestions, 'suggestions:', suggestions.length);
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 24}
    >
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Address line 1 (street address)"
          value={address1}
          onChangeText={(text) => {
            // If user edits Address 1 after selecting a suggestion,
            // unlock city/state/zip so they can type freely again
            if (lockLocationFields) {
              setLockLocationFields(false);
              setCity('');
              setStateValue('');
              setZipcode('');
            }
            setAddress1(text);
          }}
          onSubmitEditing={handleSubmit}
          returnKeyType="search"
          autoCapitalize="words"
        />
        {loading && (
          <ActivityIndicator style={styles.loading} size="small" color="#007AFF" />
        )}
      </View>

      <View style={styles.inlineRow}>
        <TextInput
          style={[styles.input, styles.halfInput, styles.leftInput]}
          placeholder="Apt/Suite (Address line 2)"
          value={address2}
          onChangeText={setAddress2}
          autoCapitalize="none"
          ref={address2Ref}
        />
      </View>

      <View style={styles.inlineRow}>
        <TextInput
          style={[styles.input, styles.flexInput, lockLocationFields && styles.disabledInput]}
          placeholder="City"
          value={city}
          onChangeText={setCity}
          autoCapitalize="words"
          editable={!lockLocationFields}
          selectTextOnFocus={!lockLocationFields}
        />
        <TextInput
          style={[styles.input, styles.stateInput, lockLocationFields && styles.disabledInput]}
          placeholder="State"
          value={stateValue}
          onChangeText={setStateValue}
          autoCapitalize="words"
          maxLength={20}
          editable={!lockLocationFields}
          selectTextOnFocus={!lockLocationFields}
        />
        <TextInput
          style={[styles.input, styles.zipInput, lockLocationFields && styles.disabledInput]}
          placeholder="Zipcode"
          value={zipcode}
          onChangeText={setZipcode}
          keyboardType="number-pad"
          maxLength={10}
          editable={!lockLocationFields}
          selectTextOnFocus={!lockLocationFields}
        />
      </View>

      {showSuggestions && suggestions.length > 0 && (
        <View style={styles.suggestionsContainer}>
          <Text style={styles.suggestionsHeader}>Suggestions ({suggestions.length}):</Text>
          <ScrollView
            style={styles.suggestionsList}
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={true}
            keyboardShouldPersistTaps="handled"
          >
            {suggestions.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.suggestionItem}
                onPress={() => handleSuggestionPress(item)}
              >
                <Text style={styles.suggestionText}>{item.text}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      <TouchableOpacity style={styles.searchButton} onPress={handleSubmit}>
        <Text style={styles.searchButtonText}>Search</Text>
      </TouchableOpacity>

      {/* Debug info */}
      <View style={styles.debugContainer}>
        <Text style={styles.debugText}>
          Show Suggestions: {showSuggestions ? 'YES' : 'NO'} | Count: {suggestions.length}
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    padding: 15,
    fontSize: 16,
  },
  loading: {
    marginRight: 10,
  },
  searchButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  debugContainer: {
    backgroundColor: '#e9ecef',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  debugText: {
    fontSize: 12,
    color: '#6c757d',
    textAlign: 'center',
  },
  suggestionsHeader: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    padding: 10,
    backgroundColor: '#f8f9fa',
    borderBottomWidth: 1,
    borderBottomColor: '#dee2e6',
  },
  inlineRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  halfInput: {
    flex: 1,
  },
  leftInput: {
    marginRight: 0,
  },
  flexInput: {
    flex: 1,
  },
  stateInput: {
    width: 90,
    marginLeft: 10,
  },
  zipInput: {
    width: 110,
    marginLeft: 10,
  },
  disabledInput: {
    backgroundColor: '#f1f3f5',
    color: '#6c757d',
  },
  suggestionsContainer: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#007AFF',
    borderRadius: 8,
    maxHeight: 250,
    marginTop: 5,
    elevation: 5,
    zIndex: 999, // ensure suggestions appear above other elements on both iOS & Android
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  suggestionsList: {},
  suggestionItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    backgroundColor: '#fff',
  },
  suggestionText: {
    fontSize: 14,
    color: '#333',
  },
});

export default AddressInput;