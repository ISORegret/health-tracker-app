/** Spot type for filtering (Locationscout/PIXEO + automotive photographer style) */
export type SpotType =
  | 'general'
  | 'urban'
  | 'industrial'
  | 'garage'
  | 'beach'
  | 'graffiti'
  | 'racetrack'
  | 'landscape'
  | 'architecture';

/** "Automotive" = urban, industrial, garage, graffiti, racetrack (car-photo focused) */
export const AUTOMOTIVE_SPOT_TYPES: SpotType[] = [
  'urban',
  'industrial',
  'garage',
  'graffiti',
  'racetrack',
];

export const SPOT_TYPE_LABELS: Record<SpotType, string> = {
  general: 'General',
  urban: 'Urban',
  industrial: 'Industrial',
  garage: 'Garage / Parking',
  beach: 'Beach / Marina',
  graffiti: 'Graffiti / Street',
  racetrack: 'Racetrack / Meet',
  landscape: 'Landscape',
  architecture: 'Architecture',
};

export type PhotoSpot = {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  bestTime: string;
  score: number;
  imageUri: string;
  photoBy: string;
  tags?: string[];
  /** General vs automotive-friendly (used for filtering) */
  spotType?: SpotType;
  /** Parking info (Locationscout-style) – e.g. "Street parking 50m, lot around corner" */
  parkingInfo?: string;
  /** Photography tips – angle, crowd level, best setup (PIXEO/Locationscout style) */
  photographyTips?: string;
  /** More photos at this spot (e.g. others who shot here). User-added spots only. Optional note from contributor. */
  additionalPhotos?: { imageUri: string; photoBy: string; note?: string }[];
};

export function isAutomotiveSpot(spot: PhotoSpot): boolean {
  return spot.spotType ? AUTOMOTIVE_SPOT_TYPES.includes(spot.spotType) : false;
}
