import { useRouter } from 'expo-router';
import { useCallback, useRef, useState, useMemo } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { useSpots } from '../../src/context/SpotsContext';
import { useTheme } from '../../src/context/ThemeContext';
import { PhotoSpot } from '../../src/types/spot';

type MapCoordinate = { latitude: number; longitude: number };

const INITIAL_REGION = {
  latitude: 37.8021,
  longitude: -122.4488,
  latitudeDelta: 40,
  longitudeDelta: 40,
};

export default function MapScreen() {
  const { allSpots } = useSpots();
  const { theme } = useTheme();
  const router = useRouter();
  const mapRef = useRef<MapView>(null);
  const [selectedSpot, setSelectedSpot] = useState<PhotoSpot | null>(null);
  const [longPressCoord, setLongPressCoord] = useState<MapCoordinate | null>(null);
  const styles = useMemo(() => makeStyles(theme), [theme]);

  const onMarkerPress = useCallback((spot: PhotoSpot) => {
    setSelectedSpot(spot);
    setLongPressCoord(null);
    mapRef.current?.animateToRegion({
      latitude: spot.latitude,
      longitude: spot.longitude,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    });
  }, []);

  const onMapLongPress = useCallback((event: { nativeEvent: { coordinate: MapCoordinate } }) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setLongPressCoord({ latitude, longitude });
    setSelectedSpot(null);
  }, []);

  const openSpot = (spot: PhotoSpot) => {
    router.push(`/spot/${spot.id}`);
  };

  const addSpotHere = () => {
    if (!longPressCoord) return;
    const { latitude, longitude } = longPressCoord;
    setLongPressCoord(null);
    router.push({
      pathname: '/(tabs)/add',
      params: {
        lat: latitude.toFixed(6),
        lng: longitude.toFixed(6),
      },
    });
  };

  const dismissAddMenu = () => {
    setLongPressCoord(null);
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={StyleSheet.absoluteFillObject}
        initialRegion={INITIAL_REGION}
        mapType="standard"
        showsUserLocation
        showsMyLocationButton
        onLongPress={onMapLongPress}
      >
        {allSpots.map((spot) => (
          <Marker
            key={spot.id}
            coordinate={{ latitude: spot.latitude, longitude: spot.longitude }}
            title={spot.name}
            description={spot.bestTime}
            onPress={() => onMarkerPress(spot)}
            pinColor={theme.accent}
          />
        ))}
        {longPressCoord && (
          <Marker
            coordinate={longPressCoord}
            pinColor={theme.success}
            title="New spot"
            description="Add spot here"
          />
        )}
      </MapView>

      <View style={styles.hint}>
        <Text style={styles.hintText}>Long press map to add a spot here</Text>
      </View>

      {selectedSpot && (
        <Pressable
          style={styles.callout}
          onPress={() => openSpot(selectedSpot)}
        >
          <Text style={styles.calloutTitle} numberOfLines={1}>
            {selectedSpot.name}
          </Text>
          <Text style={styles.calloutTime} numberOfLines={1}>
            {selectedSpot.bestTime}
          </Text>
          <Text style={styles.calloutScore}>Score: {selectedSpot.score}</Text>
          <Text style={styles.calloutTap}>Tap to open</Text>
        </Pressable>
      )}

      {longPressCoord && (
        <View style={styles.addMenu}>
          <Text style={styles.addMenuTitle}>Add spot here?</Text>
          <Text style={styles.addMenuSub}>
            {longPressCoord.latitude.toFixed(4)}, {longPressCoord.longitude.toFixed(4)}
          </Text>
          <View style={styles.addMenuActions}>
            <Pressable
              style={({ pressed }) => [styles.addMenuBtn, styles.addMenuBtnCancel, pressed && styles.addMenuBtnPressed]}
              onPress={dismissAddMenu}
            >
              <Text style={styles.addMenuBtnTextCancel}>Cancel</Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => [styles.addMenuBtn, styles.addMenuBtnAdd, pressed && styles.addMenuBtnPressed]}
              onPress={addSpotHere}
            >
              <Ionicons name="add-circle" size={20} color="#fff" />
              <Text style={styles.addMenuBtnTextAdd}>Add spot</Text>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
}

function makeStyles(theme: ReturnType<typeof useTheme>['theme']) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.bg,
    },
    hint: {
      position: 'absolute',
      top: 16,
      left: 20,
      right: 20,
      alignItems: 'center',
    },
    hintText: {
      fontSize: 13,
      color: theme.text,
      backgroundColor: theme.surface,
      paddingHorizontal: 14,
      paddingVertical: 10,
      borderRadius: 24,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: theme.border,
      fontWeight: '500',
    },
    callout: {
      position: 'absolute',
      bottom: 32,
      left: 20,
      right: 20,
      backgroundColor: theme.surface,
      borderRadius: 18,
      padding: 18,
      borderWidth: 1,
      borderColor: theme.border,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 12,
      elevation: 4,
    },
    calloutTitle: {
      fontSize: 18,
      fontWeight: '700',
      color: theme.text,
    },
    calloutTime: {
      fontSize: 13,
      color: theme.textSecondary,
      marginTop: 4,
    },
    calloutScore: {
      fontSize: 12,
      color: theme.accent,
      marginTop: 6,
      fontWeight: '600',
    },
    calloutTap: {
      fontSize: 12,
      color: theme.textMuted,
      marginTop: 4,
    },
    addMenu: {
      position: 'absolute',
      bottom: 32,
      left: 20,
      right: 20,
      backgroundColor: theme.surface,
      borderRadius: 18,
      padding: 18,
      borderWidth: 1,
      borderColor: theme.border,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 12,
      elevation: 4,
    },
    addMenuTitle: {
      fontSize: 18,
      fontWeight: '700',
      color: theme.text,
    },
    addMenuSub: {
      fontSize: 13,
      color: theme.textSecondary,
      marginTop: 4,
      fontFamily: 'monospace',
    },
    addMenuActions: {
      flexDirection: 'row',
      gap: 12,
      marginTop: 14,
    },
    addMenuBtn: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      paddingVertical: 12,
      borderRadius: 12,
    },
    addMenuBtnPressed: {
      opacity: 0.9,
    },
    addMenuBtnCancel: {
      backgroundColor: theme.surfaceMuted,
    },
    addMenuBtnAdd: {
      backgroundColor: theme.accent,
    },
    addMenuBtnTextCancel: {
      fontSize: 15,
      fontWeight: '600',
      color: theme.textSecondary,
    },
    addMenuBtnTextAdd: {
      fontSize: 15,
      fontWeight: '600',
      color: '#fff',
    },
  });
}
