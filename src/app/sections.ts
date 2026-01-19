export interface Section {
  id: string;
  title: string;
}

export const sections: Section[] = [
  { id: 'hero', title: 'Home' },
  { id: 'poems', title: 'Poetry' },
  { id: 'letter', title: 'Letter' },
  { id: 'timeline', title: 'Our Story' },
  { id: 'play', title: 'Play' }, // Changed 'games' to 'play' to match App.tsx view ID if needed, or keep 'games' if App uses 'play' mapped to 'Games' component. Let's stick to IDs used in App.tsx
  { id: 'surprises', title: 'Surprises' }, // ✅ Fixed: Matches App.tsx 'surprises'
  { id: 'playlist', title: 'Melodies' },   // ✅ ADDED: The new Playlist section
  { id: 'duas', title: 'Duas' },
  { id: 'forever', title: 'Forever' },
];