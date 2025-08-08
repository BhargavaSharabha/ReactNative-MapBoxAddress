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
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchTimeoutRef = useRef(null);

  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (query.length >= 3) {
      console.log('�� Query length >= 3, starting search for:', query);
      setLoading(true);
      searchTimeoutRef.current = setTimeout(async () => {
        try {
          console.log('⏰ Debounced search triggered for:', query);
          const results = await searchAddresses(query);
          console.log('📋 Search results received:', results);
          setSuggestions(results);
          setShowSuggestions(true);
          console.log('✅ Suggestions updated, count:', results.length);
          console.log('🔍 showSuggestions set to:', true);
        } catch (error) {
          console.error('❌ Search error:', error);
        } finally {
          setLoading(false);
        }
      }, 500);
    } else {
      console.log('⚠️ Query too short or empty, clearing suggestions');
      setSuggestions([]);
      setShowSuggestions(false);
      setLoading(false);
    }

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [query]);

  const handleAddressSelect = (address) => {
    console.log('🎯 Address selected:', address.text);
    setQuery(address.text);
    setShowSuggestions(false);
    onAddressSelect(address.text);
  };

  const handleSubmit = () => {
    if (query.trim()) {
      onAddressSelect(query.trim());
      setShowSuggestions(false);
    } else {
      Alert.alert('Error', 'Please enter a valid address');
    }
  };



  console.log('�� Component render - showSuggestions:', showSuggestions, 'suggestions count:', suggestions.length);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 24}
    >
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter a USA address..."
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={handleSubmit}
          returnKeyType="search"
          autoCapitalize="words"
        />
        {loading && (
          <ActivityIndicator style={styles.loading} size="small" color="#007AFF" />
        )}
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
                onPress={() => handleAddressSelect(item)}
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
          Show Suggestions: {showSuggestions ? 'YES' : 'NO'} |
          Count: {suggestions.length}
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