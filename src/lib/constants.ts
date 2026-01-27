import type { ReactionType, UserLevel } from './types'

export const CATEGORIES = [
  { id: 'lapau-umum', name: 'Lapau Umum', emoji: '☕' },
  { id: 'ota-viral', name: 'OTA Viral', emoji: '🔥' },
  { id: 'sindie-sarkas', name: 'Sindie & Sarkas', emoji: '😏' },
  { id: 'curhat-lapau', name: 'Curhat Lapau', emoji: '💭' },
  { id: 'politik-lapau', name: 'Politik Lapau', emoji: '🗳️' },
  { id: 'umkm-bisnis', name: 'UMKM & Bisnis', emoji: '💼' },
  { id: 'bebas-beradat', name: 'Bebas Tapi Beradat', emoji: '🌟' },
]

export const REACTIONS: Record<ReactionType, { emoji: string; name: string; description: string }> = {
  'rendang': { emoji: '🍛', name: 'Rendang', description: 'Apresiasi tinggi' },
  'teh-talua': { emoji: '☕', name: 'Teh Talua', description: 'Setuju / support' },
  'langkitang': { emoji: '🐌', name: 'Langkitang', description: 'Lucu / nyindir halus' },
  'soto-padang': { emoji: '🍜', name: 'Soto Padang', description: 'Berbobot' },
  'samba-lado': { emoji: '🌶️', name: 'Samba Lado', description: 'Pedas tapi jujur' },
  'gulai': { emoji: '🥥', name: 'Gulai', description: 'Panjang & dalem' },
  'asin': { emoji: '🧂', name: 'Asin', description: 'Sarkas keras' },
}

export const USER_LEVELS: Record<UserLevel, { name: string; minPosts: number; minReactions: number }> = {
  'anak-lapau': { name: 'Anak Lapau', minPosts: 0, minReactions: 0 },
  'urang-awak': { name: 'Urang Awak', minPosts: 5, minReactions: 10 },
  'tukang-kieeh': { name: 'Tukang Kieeh', minPosts: 15, minReactions: 50 },
  'urang-lamo': { name: 'Urang Lamo', minPosts: 30, minReactions: 150 },
  'niniak-mamak': { name: 'Niniak Mamak Online', minPosts: 50, minReactions: 300 },
  'pangulu-lapau': { name: 'Pangulu Lapau', minPosts: 100, minReactions: 500 },
}

export const calculateUserLevel = (totalPosts: number, totalReactions: number): UserLevel => {
  const levels: UserLevel[] = ['pangulu-lapau', 'niniak-mamak', 'urang-lamo', 'tukang-kieeh', 'urang-awak', 'anak-lapau']
  
  for (const level of levels) {
    const requirements = USER_LEVELS[level]
    if (totalPosts >= requirements.minPosts && totalReactions >= requirements.minReactions) {
      return level
    }
  }
  
  return 'anak-lapau'
}

export const KAMUS_LAPAU: Record<string, string> = {
  'Lapau': 'Warung kopi tradisional tempat berkumpul',
  'OTA': 'Omongan Tanpa Arah - diskusi santai',
  'Sindie': 'Sindiran halus khas Minang',
  'Kieeh': 'Guyonan, becanda',
  'Beradat': 'Mengikuti adat dan tata krama',
  'Urang': 'Orang',
  'Awak': 'Kita, kami',
  'Niniak Mamak': 'Sesepuh, orang yang dituakan',
  'Pangulu': 'Pemimpin tertinggi dalam adat',
  'Rendang': 'Masakan khas Minang, simbol apresiasi',
  'Teh Talua': 'Teh dengan telur, minuman khas',
  'Langkitang': 'Siput, lambat tapi pasti',
  'Samba Lado': 'Sambal cabai, pedas',
  'Petuah': 'Nasihat bijak',
}
