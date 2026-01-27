# Lapau - Forum Komunitas Minangkabau

A culturally-rich community forum platform celebrating Minangkabau identity through modern web technology, where tradition meets digital conversation in a space for discussion, humor, and community building with proper moderation and local customs.

**Experience Qualities**: 
1. **Culturally Authentic** - Every interaction reflects Minangkabau values, language, and communication style with local terms and customs integrated throughout
2. **Warmly Engaging** - The interface feels like sitting in a traditional coffee shop (lapau) with earth tones, comfortable spacing, and inviting interactions
3. **Respectfully Moderated** - Content flows through thoughtful approval processes that maintain community standards while preserving the spirit of open discussion

**Complexity Level**: Complex Application (advanced functionality, likely with multiple views)
This is a full-featured forum platform with user authentication, role-based access control, content moderation workflows, nested commenting systems, reaction mechanics, reputation tracking, and community governance features.

## Essential Features

### User Authentication & Profiles
- **Functionality**: User registration, login, logout with persistent sessions and profile management
- **Purpose**: Establish identity and track contributions within the community
- **Trigger**: Click "Daftar Duduak" or "Masuk Lapau" buttons
- **Progression**: Form entry → Validation → Session creation → Dashboard access
- **Success criteria**: Users can register, login, view/edit profiles with stats (posts, reactions, level, badges)

### Thread Creation & Moderation
- **Functionality**: Users create discussion threads that enter approval queue; admins review and approve/reject
- **Purpose**: Maintain quality content while enabling community participation
- **Trigger**: Click "Buek Thread" button
- **Progression**: Category selection → Title/content entry → Submit → Pending status → Admin review → Approved/Rejected → Published or notification
- **Success criteria**: Threads flow through moderation pipeline; only approved content displays publicly

### Reaction System (Khas Lapau)
- **Functionality**: Eight unique local reactions (Rendang, Teh Talua, Langkitang, Soto Padang, Samba Lado, Gulai, Asin) users can give to posts
- **Purpose**: Express nuanced responses reflecting local culture beyond simple likes
- **Trigger**: Click reaction icon on post
- **Progression**: Click → Animation feedback → Count increment → Profile stats update
- **Success criteria**: Reactions display correctly, count accurately, prevent self-reaction, update user reputation

### Nested Comment System
- **Functionality**: Multi-level threaded discussions under each post with moderation capability
- **Purpose**: Enable detailed conversations while maintaining structure
- **Trigger**: Click reply button on post or comment
- **Progression**: Click reply → Comment form opens → Text entry → Submit → Comment appears in thread
- **Success criteria**: Comments nest properly, display hierarchy, support moderation actions

### Level & Reputation System
- **Functionality**: User progression through ranks (Anak Lapau → Pangulu Lapau) based on activity and reactions
- **Purpose**: Gamify participation and recognize valuable contributors
- **Trigger**: Automatic calculation on post approval, comment, or reaction received
- **Progression**: Activity occurs → Points calculated → Level check → Badge/rank update → Profile display updated
- **Success criteria**: Levels display correctly, unlock features appropriately, motivate continued participation

### Content Categorization
- **Functionality**: Organize threads into categories (Lapau Umum, OTA Viral, Sindie & Sarkas, Curhat Lapau, etc.)
- **Purpose**: Help users find relevant discussions and maintain topical organization
- **Trigger**: Select category during thread creation or filter on homepage
- **Progression**: Browse categories → Click filter → View filtered threads
- **Success criteria**: Categories clearly organized, filterable, display thread counts

### Admin Dashboard & Moderation
- **Functionality**: Admin-only interface to approve/reject posts, manage users, moderate comments, view reports
- **Purpose**: Maintain community standards and handle governance
- **Trigger**: Admin logs in and accesses moderation panel
- **Progression**: View pending queue → Review content → Approve/reject with optional note → Content published or user notified
- **Success criteria**: Admins can efficiently process queue, take moderation actions, view analytics

### "Ingatkan Adat" Reporting System
- **Functionality**: Soft moderation where users flag content for review without harsh "report" language
- **Purpose**: Community-driven content policing aligned with cultural values
- **Trigger**: Click "Ingatkan Adat" button on problematic content
- **Progression**: Click → Optional note → Submit → Admin notification → Review → Action taken
- **Success criteria**: Reports logged, admins notified, repeat offenders tracked, cultural tone maintained

### Trending & Highlights
- **Functionality**: Display most active threads by day/week based on comments, reactions, and velocity
- **Purpose**: Surface engaging content and reward quality discussions
- **Trigger**: Automatic calculation; users view "Lapau Paling Rami" section
- **Progression**: Algorithm runs → Scores calculated → Ranking updated → Display refreshed
- **Success criteria**: Trending accurately reflects activity, updates regularly, showcases best content

## Edge Case Handling

- **Empty States**: Display culturally-appropriate messaging ("Lapau masih sepi, buek thread pertamo ko!") when no content exists
- **Network Failures**: Show toast notifications with local flavor when actions fail, maintain form state
- **Duplicate Reactions**: Prevent users from reacting multiple times; show current reaction state
- **Self-Interaction Prevention**: Block users from reacting to own posts or reporting own content
- **Deleted User Content**: Mark as "[Urang Lah Pulang]" but preserve discussion context
- **Long Content**: Truncate with "Baco Salanjutnyo" expand button for lengthy posts
- **Anonymous Posts**: Display consistent anonymous avatar/name while tracking real identity server-side
- **Spam Prevention**: Rate limit thread creation based on user level
- **Offensive Content**: Queue for immediate review when multiple "Ingatkan Adat" reports received

## Design Direction

The design should evoke the warmth and authenticity of a traditional Minangkabau coffee shop (lapau) - a welcoming community gathering space where people share stories over coffee. The interface should feel grounded, earthy, and conversational with subtle cultural motifs, warm browns and creams, and typography that balances modern readability with cultural character. Every interaction should reinforce the sense of belonging to a tight-knit community bound by shared values and respectful discourse.

## Color Selection

Warm, earthy palette inspired by traditional lapau - coffee, spices, and natural materials:

- **Primary Color**: Rich Coffee Brown `oklch(0.35 0.05 60)` - Represents the warmth and depth of community conversation, used for primary actions and important elements
- **Secondary Colors**: 
  - Warm Cream `oklch(0.92 0.02 80)` - Subtle backgrounds and cards, provides breathing room
  - Deep Green `oklch(0.42 0.06 160)` - Approval actions, success states, represents growth
  - Charcoal `oklch(0.25 0.01 60)` - Text and borders, maintains readability without harshness
- **Accent Color**: Spicy Orange `oklch(0.68 0.15 50)` - Hot actions, highlights, notifications, captures the "pedas" spirit
- **Foreground/Background Pairings**: 
  - Primary Brown `oklch(0.35 0.05 60)`: Cream text `oklch(0.97 0.01 80)` - Ratio 7.2:1 ✓
  - Cream Background `oklch(0.92 0.02 80)`: Charcoal text `oklch(0.25 0.01 60)` - Ratio 10.1:1 ✓
  - Accent Orange `oklch(0.68 0.15 50)`: White text `oklch(1 0 0)` - Ratio 4.9:1 ✓
  - Deep Green `oklch(0.42 0.06 160)`: Cream text `oklch(0.97 0.01 80)` - Ratio 8.4:1 ✓

## Font Selection

Typography should balance modern web readability with a warm, approachable personality that reflects the conversational nature of forum discussions.

- **Primary Font**: Bricolage Grotesque - Distinctive, slightly playful character for headings and UI elements that feels both contemporary and welcoming
- **Body Font**: Inter - Exceptional readability for long-form content and comments while maintaining clean lines

- **Typographic Hierarchy**: 
  - Forum Title (Lapau Header): Bricolage Grotesque Bold/32px/tight tracking
  - Thread Title: Bricolage Grotesque SemiBold/24px/normal spacing
  - Category Labels: Bricolage Grotesque Medium/14px/wide tracking uppercase
  - Body Text: Inter Regular/16px/1.6 line-height
  - Comments: Inter Regular/15px/1.5 line-height
  - Metadata (timestamps, counts): Inter Medium/13px/muted color
  - Buttons: Bricolage Grotesque SemiBold/15px

## Animations

Animations should feel warm and organic - like natural conversations flowing, not mechanical transitions. Use subtle motion to guide attention and provide feedback, with a focus on micro-interactions that delight without distracting. Reaction animations should feel playful and satisfying (emoji bounce/scale), while navigation should be smooth and grounded. Avoid aggressive motion; prefer gentle fades and subtle scaling that reinforce the relaxed lapau atmosphere.

## Component Selection

- **Components**: 
  - Dialog: Thread creation form, login/register modals
  - Card: Individual thread items, comment containers, user profile cards
  - Button: Primary actions with distinct variants for approve/reject
  - Textarea: Thread content and comment input
  - Select: Category picker, filter dropdowns
  - Badge: User levels, category tags, status indicators
  - Tabs: Switch between categories, trending time periods
  - Avatar: User identities throughout
  - Alert: Moderation notices, system messages
  - Separator: Visual breaks between sections
  - Scroll Area: Long comment threads, content feeds
  - Tooltip: Hover definitions for Minangkabau terms (Kamus Lapau)
  
- **Customizations**: 
  - Reaction button grid (custom component): 8 emoji reactions with counts
  - Level badge component: Custom styled badges showing rank progression
  - Thread card: Rich card with category tag, reaction summary, metadata
  - Moderation queue item: Approve/reject actions with note capability
  - Nested comment tree: Custom recursive component for threaded discussions
  
- **States**: 
  - Buttons: Default (earthy), hover (lift shadow slightly), active (press down), disabled (desaturated)
  - Thread cards: Default, hover (subtle scale 1.01), selected/active category highlight
  - Reactions: Unselected (grayscale), selected (full color + scale), animated on click (bounce)
  - Inputs: Default (cream bg), focus (accent border glow), error (destructive border)
  
- **Icon Selection**: 
  - @phosphor-icons/react for all UI actions:
  - Plus for create thread
  - ChatCircle for comments
  - Warning for reports ("Ingatkan Adat")
  - Crown for admin badge
  - TrendUp for trending
  - FunnelSimple for filters
  - Check/X for approve/reject
  - Emoji reactions use actual emoji (🍛☕🐌🍜🌶️🥥🧂)
  
- **Spacing**: 
  - Card padding: p-6
  - Section gaps: gap-8
  - List items: gap-4
  - Inline elements: gap-2
  - Page margins: px-4 md:px-8
  - Max content width: max-w-5xl
  
- **Mobile**: 
  - Single column layout on mobile
  - Collapsible category filter into dropdown
  - Bottom sheet for thread creation
  - Sticky action buttons for quick posting
  - Condensed reaction display (show count, expand on tap)
  - Simplified admin dashboard with priority queue first
  - Touch-friendly tap targets (min 44px)
