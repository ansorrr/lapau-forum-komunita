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

The design should evoke a familiar, organized forum experience similar to Kaskus - structured, efficient, and community-focused with clear hierarchy and navigation. The interface features a sidebar-based category navigation, table-like thread listings, and a purple-based color scheme that feels modern and distinctive while maintaining excellent readability. Every element is designed for quick scanning and efficient content discovery.

## Color Selection

Modern purple-based palette inspired by contemporary forums with excellent contrast:

- **Primary Color**: Deep Purple `oklch(0.45 0.15 280)` - Main brand color for actions and interactive elements, provides strong visual identity
- **Secondary Colors**: 
  - Light Gray `oklch(0.96 0.01 280)` - Subtle backgrounds for secondary content areas
  - Success Green `oklch(0.55 0.15 145)` - Approval actions, success states
  - Near Black `oklch(0.20 0.015 280)` - Text with a slight purple tint for cohesion
- **Accent Color**: Vibrant Orange `oklch(0.65 0.20 35)` - Call-to-action highlights, important notifications
- **Foreground/Background Pairings**: 
  - Primary Purple `oklch(0.45 0.15 280)`: White text `oklch(1 0 0)` - Ratio 8.2:1 ✓
  - Light Background `oklch(0.98 0.005 280)`: Dark text `oklch(0.20 0.015 280)` - Ratio 15.1:1 ✓
  - Accent Orange `oklch(0.65 0.20 35)`: White text `oklch(1 0 0)` - Ratio 4.6:1 ✓
  - Success Green `oklch(0.55 0.15 145)`: White text `oklch(1 0 0)` - Ratio 5.8:1 ✓

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

Animations should be quick and efficient - prioritizing content over motion. Use subtle transitions for state changes (150-200ms) with smooth easing. Hover states provide instant feedback without delay. Reaction animations offer a brief playful moment (bounce effect) but don't impede workflow. Page transitions are minimal to maintain focus on content discovery and reading.

## Component Selection

- **Components**: 
  - Card: Thread list container, individual sections with headers
  - Button: Actions with clear hierarchy (primary for approve, outline for secondary, ghost for tertiary)
  - Textarea: Thread content and comment input
  - Select/Dropdown: Mobile category selector
  - Badge: Category tags, user levels, notification counts
  - Tabs: Admin panel sections, content organization
  - Dialog: Thread creation, rejection notes, confirmations
  - Separator: Visual breaks within content
  - Scroll Area: Long comment threads
  - Tooltip: Hover definitions for Minangkabau terms
  - Checkbox: Anonymous posting option
  
- **Customizations**: 
  - Sidebar navigation: Persistent category list with thread counts
  - Table-like thread rows: Compact listing with metadata columns
  - Gradient header: Purple gradient for main header bar
  - Reaction button bar: Horizontal list of emoji reactions with counts
  - Nested comments: Indented replies with left border indicator
  - Section headers: Card headers with background color and uppercase labels
  
- **States**: 
  - Buttons: Solid fills for actions, clear hover darkening, active press state
  - Thread rows: Subtle background change on hover (no scale/shadow)
  - Category items: Selected state with primary color background and white text
  - Reactions: Show top 3 with counts, click to toggle
  - Inputs: Simple border focus, no elaborate effects
  
- **Icon Selection**: 
  - @phosphor-icons/react for all UI:
  - Plus for create thread
  - ChatCircle for comments/replies
  - Warning for reports
  - ShieldCheck for admin access
  - User for profiles/avatars
  - House for home navigation
  - Check/X for approve/reject
  - ArrowLeft for back navigation
  - Crown for "Petuah" designation
  - Eye for view/preview
  - Trash for delete
  - Emoji reactions use actual emoji (🍛☕🐌🍜🌶️🥥🧂)
  
- **Spacing**: 
  - Compact padding: p-3 to p-6 for cards
  - Tight gaps: gap-2 to gap-4 for most layouts
  - Consistent borders: 1px borders throughout
  - Content max-width: max-w-7xl for wide layout
  - Sidebar width: w-64 on desktop
  
- **Mobile**: 
  - Sidebar collapses to dropdown selector
  - Single column thread list
  - Smaller avatar/icons
  - Stacked metadata in thread rows
  - Bottom-aligned action buttons
  - Touch-friendly tap targets (min 44px)
  - Simplified admin interface with tabs
