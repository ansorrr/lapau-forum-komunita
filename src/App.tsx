import { useState, useEffect } from 'react'
import { useKV } from '@github/spark/hooks'
import type { User, Thread, Comment, Report, Media, Advertisement } from './lib/types'
import { generateAvatarColor } from './lib/utils'
import { initializeSeedData } from './lib/seedData'
import { Header } from './components/Header'
import { AuthDialog } from './components/AuthDialog'
import { ThreadList } from './components/ThreadList'
import { CreateThreadDialog } from './components/CreateThreadDialog'
import { ThreadDetail } from './components/ThreadDetail'
import { AdminPanel } from './components/AdminPanel'
import { UserProfile } from './components/UserProfile'
import { SearchBar } from './components/SearchBar'
import { PremiumDialog } from './components/PremiumDialog'
import { UMKMVerificationDialog } from './components/UMKMVerificationDialog'
import { Toaster } from './components/ui/sonner'
import { toast } from 'sonner'

type View = 'home' | 'thread' | 'admin' | 'profile'

function App() {
  const [users, setUsers] = useKV<User[]>('users', [])
  const [threads, setThreads] = useKV<Thread[]>('threads', [])
  const [comments, setComments] = useKV<Comment[]>('comments', [])
  const [reports, setReports] = useKV<Report[]>('reports', [])
  const [ads, setAds] = useKV<Advertisement[]>('ads', [])
  const [currentUser, setCurrentUser] = useKV<User | null>('currentUser', null)
  
  useEffect(() => {
    const seedData = initializeSeedData(users || [], threads || [], comments || [], ads || [])
    if (seedData.users.length > 0 && (users || []).length === 0) {
      setUsers(seedData.users)
    }
    if (seedData.threads.length > 0 && (threads || []).length === 0) {
      setThreads(seedData.threads)
    }
    if (seedData.comments.length > 0 && (comments || []).length === 0) {
      setComments(seedData.comments)
    }
    if (seedData.ads.length > 0 && (ads || []).length === 0) {
      setAds(seedData.ads)
    }
  }, [])

  const [view, setView] = useState<View>('home')
  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(null)
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [authDialogOpen, setAuthDialogOpen] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login')
  const [createThreadOpen, setCreateThreadOpen] = useState(false)
  const [premiumDialogOpen, setPremiumDialogOpen] = useState(false)
  const [umkmDialogOpen, setUmkmDialogOpen] = useState(false)

  const handleLogin = (username: string, password: string) => {
    const user = (users || []).find(u => u.username === username)
    if (user) {
      setCurrentUser(user)
      setAuthDialogOpen(false)
      return true
    }
    return false
  }

  const handleRegister = (username: string) => {
    if ((users || []).find(u => u.username === username)) {
      return false
    }

    const newUser: User = {
      id: `user-${Date.now()}`,
      username,
      role: 'user',
      level: 'anak-lapau',
      totalPosts: 0,
      totalReactions: 0,
      createdAt: Date.now(),
      avatarColor: generateAvatarColor(`user-${Date.now()}`),
    }

    setUsers(current => [...(current || []), newUser])
    setCurrentUser(newUser)
    setAuthDialogOpen(false)
    return true
  }

  const handleLogout = () => {
    setCurrentUser(null)
    setView('home')
  }

  const handleCreateThread = (title: string, content: string, category: string, isAnonymous: boolean, media?: Media[]) => {
    if (!currentUser) return

    const newThread: Thread = {
      id: `thread-${Date.now()}`,
      authorId: currentUser.id,
      authorUsername: isAnonymous ? 'Urang Anonim' : currentUser.username,
      title,
      content,
      category,
      status: 'pending',
      createdAt: Date.now(),
      reactions: {
        'rendang': [],
        'teh-talua': [],
        'langkitang': [],
        'soto-padang': [],
        'samba-lado': [],
        'gulai': [],
        'asin': [],
      },
      commentCount: 0,
      isAnonymous,
      media,
    }

    setThreads(current => [newThread, ...(current || [])])
    setCreateThreadOpen(false)
  }

  const handleReaction = (threadId: string, reactionType: string) => {
    if (!currentUser) return

    setThreads(current => (current || []).map(thread => {
      if (thread.id !== threadId) return thread
      if (thread.authorId === currentUser.id && !thread.isAnonymous) return thread

      const reactions = { ...thread.reactions }
      const reactionArray = reactions[reactionType as keyof typeof reactions] || []
      
      const hasReacted = reactionArray.includes(currentUser.id)
      
      if (hasReacted) {
        reactions[reactionType as keyof typeof reactions] = reactionArray.filter(id => id !== currentUser.id)
      } else {
        Object.keys(reactions).forEach(key => {
          reactions[key as keyof typeof reactions] = reactions[key as keyof typeof reactions].filter(id => id !== currentUser.id)
        })
        reactions[reactionType as keyof typeof reactions] = [...reactionArray, currentUser.id]
      }

      return { ...thread, reactions }
    }))

    const thread = (threads || []).find(t => t.id === threadId)
    if (!thread?.isAnonymous && thread) {
      setUsers(current => (current || []).map(user => {
        if (user.id === thread.authorId) {
          const totalReactions = Object.values(
            (threads || []).find(t => t.id === threadId)?.reactions || {}
          ).reduce((sum, arr) => sum + arr.length, 0)
          return { ...user, totalReactions }
        }
        return user
      }))
    }
  }

  const handleAddComment = (threadId: string, content: string, parentId?: string, isAnonymous?: boolean) => {
    if (!currentUser) return

    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      threadId,
      authorId: currentUser.id,
      authorUsername: isAnonymous ? 'Urang Anonim' : currentUser.username,
      content,
      createdAt: Date.now(),
      parentId,
      isAnonymous,
    }

    setComments(current => [...(current || []), newComment])
    setThreads(current => (current || []).map(t => 
      t.id === threadId ? { ...t, commentCount: t.commentCount + 1 } : t
    ))
  }

  const handleReport = (threadId?: string, commentId?: string, reason?: string) => {
    if (!currentUser) return

    const newReport: Report = {
      id: `report-${Date.now()}`,
      threadId,
      commentId,
      reporterId: currentUser.id,
      reason,
      createdAt: Date.now(),
      status: 'pending',
    }

    setReports(current => [...(current || []), newReport])
  }

  const handleApproveThread = (threadId: string) => {
    setThreads(current => (current || []).map(t => {
      if (t.id === threadId) {
        const updatedThread = { ...t, status: 'approved' as const }
        
        setUsers(currentUsers => (currentUsers || []).map(user => {
          if (user.id === t.authorId && !t.isAnonymous) {
            return { ...user, totalPosts: user.totalPosts + 1 }
          }
          return user
        }))
        
        return updatedThread
      }
      return t
    }))
  }

  const handleRejectThread = (threadId: string, note?: string) => {
    setThreads(current => (current || []).map(t => 
      t.id === threadId ? { ...t, status: 'rejected' as const, rejectionNote: note } : t
    ))
  }

  const handleDeleteComment = (commentId: string) => {
    const comment = (comments || []).find(c => c.id === commentId)
    if (!comment) return

    setComments(current => (current || []).filter(c => c.id !== commentId))
    setThreads(current => (current || []).map(t => 
      t.id === comment.threadId ? { ...t, commentCount: Math.max(0, t.commentCount - 1) } : t
    ))
  }

  const handleMarkPetuah = (commentId: string) => {
    setComments(current => (current || []).map(c => 
      c.id === commentId ? { ...c, isPetuah: !c.isPetuah } : c
    ))
  }

  const handleViewThread = (threadId: string) => {
    setSelectedThreadId(threadId)
    setView('thread')
  }

  const handleViewProfile = (userId: string) => {
    setSelectedUserId(userId)
    setView('profile')
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setSelectedCategory('all')
  }

  const handleUpgradeToPremium = () => {
    if (!currentUser) return
    
    setUsers(current => (current || []).map(user => 
      user.id === currentUser.id 
        ? { ...user, isPremium: true, premiumColor: 'oklch(0.65 0.15 60)' }
        : user
    ))
    setCurrentUser(prev => prev ? { ...prev, isPremium: true, premiumColor: 'oklch(0.65 0.15 60)' } : null)
    toast.success('Selamat! Kamu sekarang member Premium Lapau! 🎉')
  }

  const handleUMKMVerification = (umkmName: string, umkmDescription: string) => {
    if (!currentUser) return
    
    setUsers(current => (current || []).map(user => 
      user.id === currentUser.id 
        ? { ...user, isUMKMVerified: true, umkmName, umkmDescription }
        : user
    ))
    setCurrentUser(prev => prev ? { ...prev, isUMKMVerified: true, umkmName, umkmDescription } : null)
    toast.success('Verifikasi UMKM berhasil diajukan! Admin akan meninjaunya segera.')
  }

  const handleAdClick = (adId: string) => {
    setAds(current => (current || []).map(ad =>
      ad.id === adId ? { ...ad, clicks: ad.clicks + 1 } : ad
    ))
  }

  const getFilteredThreads = () => {
    const approved = (threads || []).filter(t => t.status === 'approved')
    
    if (!searchQuery) return approved

    const query = searchQuery.toLowerCase()
    return approved.filter(t => 
      t.title.toLowerCase().includes(query) || 
      t.content.toLowerCase().includes(query)
    )
  }

  const selectedThread = (threads || []).find(t => t.id === selectedThreadId)
  const selectedUserProfile = (users || []).find(u => u.id === selectedUserId)

  return (
    <>
      <div className="min-h-screen bg-background">
        <Header 
          currentUser={currentUser || null}
          onLogin={() => {
            setAuthMode('login')
            setAuthDialogOpen(true)
          }}
          onRegister={() => {
            setAuthMode('register')
            setAuthDialogOpen(true)
          }}
          onLogout={handleLogout}
          onNavigateHome={() => {
            setView('home')
            setSelectedCategory('all')
          }}
          onNavigateAdmin={() => setView('admin')}
          onCreateThread={() => setCreateThreadOpen(true)}
          onViewProfile={() => currentUser && handleViewProfile(currentUser.id)}
          onOpenPremium={() => setPremiumDialogOpen(true)}
          onOpenUMKM={() => setUmkmDialogOpen(true)}
        />

        <main className="container mx-auto px-4 py-6 max-w-7xl">
          {view === 'home' && (
            <>
              <div className="mb-6">
                <SearchBar 
                  onSearch={handleSearch}
                  placeholder="Cari thread berdasarkan judul atau isi..."
                />
                {searchQuery && (
                  <div className="mt-3 text-sm text-muted-foreground">
                    Hasil pencarian untuk: <span className="font-medium text-foreground">"{searchQuery}"</span>
                  </div>
                )}
              </div>
              <ThreadList
                threads={searchQuery ? getFilteredThreads() : threads || []}
                users={users || []}
                currentUser={currentUser || null}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                onViewThread={handleViewThread}
                onReaction={handleReaction}
                onReport={handleReport}
                ads={ads || []}
                onAdClick={handleAdClick}
              />
            </>
          )}

          {view === 'thread' && selectedThread && (
            <ThreadDetail
              thread={selectedThread}
              comments={(comments || []).filter(c => c.threadId === selectedThread.id)}
              currentUser={currentUser || null}
              users={users || []}
              onBack={() => setView('home')}
              onReaction={handleReaction}
              onAddComment={handleAddComment}
              onReport={handleReport}
              onDeleteComment={handleDeleteComment}
              onMarkPetuah={handleMarkPetuah}
              onViewProfile={handleViewProfile}
            />
          )}

          {view === 'admin' && currentUser?.role === 'admin' && (
            <AdminPanel
              threads={threads || []}
              comments={comments || []}
              reports={reports || []}
              users={users || []}
              onApprove={handleApproveThread}
              onReject={handleRejectThread}
              onDeleteComment={handleDeleteComment}
              onViewThread={handleViewThread}
            />
          )}

          {view === 'profile' && selectedUserProfile && (
            <UserProfile
              user={selectedUserProfile}
              threads={(threads || []).filter(t => t.authorId === selectedUserProfile.id && t.status === 'approved')}
              isOwnProfile={currentUser?.id === selectedUserProfile.id}
              onBack={() => setView('home')}
              onViewThread={handleViewThread}
            />
          )}
        </main>
      </div>

      <AuthDialog
        open={authDialogOpen}
        mode={authMode}
        onClose={() => setAuthDialogOpen(false)}
        onLogin={handleLogin}
        onRegister={handleRegister}
        onSwitchMode={() => setAuthMode(mode => mode === 'login' ? 'register' : 'login')}
      />

      <CreateThreadDialog
        open={createThreadOpen}
        onClose={() => setCreateThreadOpen(false)}
        onCreate={handleCreateThread}
      />

      <PremiumDialog
        open={premiumDialogOpen}
        onClose={() => setPremiumDialogOpen(false)}
        currentUser={currentUser || null}
        onUpgradeToPremium={handleUpgradeToPremium}
      />

      <UMKMVerificationDialog
        open={umkmDialogOpen}
        onClose={() => setUmkmDialogOpen(false)}
        onSubmit={handleUMKMVerification}
      />

      <Toaster />
    </>
  )
}

export default App
