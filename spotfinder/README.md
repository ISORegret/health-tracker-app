# SpotFinder – Photo & Car Spots

A mobile-only app for **photographers and automotive/car photographers**: find photo spots, see parking & tips (Locationscout/PIXEO-style), best time & GPS (Atlas Photo–style), and add your own spots. Built with **Expo** and **React Native**.

## What’s included

- **For You** – List of photo spots with image, score, best time, and **spot type** (Urban, Garage, Industrial, etc.). **Filter chips**: All, Car spots, Urban, Industrial, Garage, Beach, Graffiti, Landscape, Architecture.
- **Spot detail** – Full screen: name, best time, address, **Parking** (when available), **Photography tips** (when available), GPS, photo credit.
- **Map** – All spots on a map; tap a marker → callout → tap to open detail.
- **Add spot** – Add your own spot with **spot type**, **parking info**, **photography tips**, address/coordinates (or “Use my location”), best time, image URL.

## Inspired by

- **Atlas Photo** – Best time to shoot, GPS, map, add your own.
- **Locationscout** – Parking info, photography tips, GPS, filters.
- **PIXEO** – Spot types, crowdsourced spots, tips.
- **Automotive photography** – Urban, industrial, garage, graffiti, racetrack, beach spots; parking and shoot tips for car photographers.

## Run the app

From the `spotfinder` folder:

```bash
npm start
```

Then:

- **Android:** Press `a` or run `npm run android` (device/emulator with Expo Go or dev build).
- **iOS:** Press `i` or run `npm run ios` (Mac + simulator or device with Expo Go).
- **Web:** Press `w` or run `npm run web` (Map tab may be limited on web).

## Tech stack

- **Expo SDK 54** – React Native + Expo tooling
- **Expo Router** – File-based routing (`app/` directory)
- **react-native-maps** – Map and markers (native on iOS/Android)
- **expo-location** – User location (“Use my location” in Add spot + map)
- **AsyncStorage** – User-added spots saved on device
- **TypeScript** – Types in `src/types/spot.ts`, curated + user spots in `src/data/`

## Project layout

```
spotfinder/
├── app/
│   ├── _layout.tsx       # Root stack + SpotsProvider
│   ├── index.tsx         # Redirect to For You tab
│   ├── (tabs)/
│   │   ├── _layout.tsx   # Tab bar (For You, Map, Add spot)
│   │   ├── index.tsx     # For You + filter chips
│   │   ├── map.tsx       # Map screen
│   │   └── add.tsx       # Add spot form
│   └── spot/
│       └── [id].tsx      # Spot detail (parking, tips, GPS)
├── src/
│   ├── types/spot.ts     # PhotoSpot, SpotType, parkingInfo, photographyTips
│   ├── context/SpotsContext.tsx
│   ├── data/spots.ts     # Curated spots (general + automotive)
│   └── data/spotStore.ts # AsyncStorage for user spots
└── app.json
```

## Next steps you could add

- Backend so spots sync across devices and users can share spots.
- Favorites / “want to shoot here” list.
- Weather or sun/moon times per spot (e.g. Photo Ephemeris–style).
- On Android: Google Maps API key in `app.json` if needed for full map features.
