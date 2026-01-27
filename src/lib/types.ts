export type UserRole = 'user' | 'admin'

export type UserLevel = 
  | 'anak-lapau'
  | 'urang-awak'
  | 'tukang-kieeh'
  | 'urang-lamo'
  | 'niniak-mamak'
  | 'pangulu-lapau'

export type PostStatus = 'pending' | 'approved' | 'rejected'

export type ReactionType = 
  | 'rendang'
  | 'teh-talua'
  | 'langkitang'
  | 'soto-padang'
  | 'samba-lado'
  | 'gulai'
  | 'asin'

export interface User {
  id: string
  username: string
  role: UserRole
  level: UserLevel
  totalPosts: number
  totalReactions: number
  createdAt: number
  avatar?: string
}

export interface Thread {
  id: string
  authorId: string
  authorUsername: string
  title: string
  content: string
  category: string
  status: PostStatus
  createdAt: number
  reactions: Record<ReactionType, string[]>
  commentCount: number
  isAnonymous?: boolean
  rejectionNote?: string
}

export interface Comment {
  id: string
  threadId: string
  authorId: string
  authorUsername: string
  content: string
  createdAt: number
  parentId?: string
  isPetuah?: boolean
  isAnonymous?: boolean
}

export interface Report {
  id: string
  threadId?: string
  commentId?: string
  reporterId: string
  reason?: string
  createdAt: number
  status: 'pending' | 'reviewed'
}

export interface Reaction {
  userId: string
  type: ReactionType
  threadId: string
  createdAt: number
}
