# EduSpin - Spin to Learn, Earn to Win

A gamified educational Base Mini App that transforms daily learning into an engaging habit through interactive challenges and real rewards.

## Features

- **Daily Spin-to-Win Challenges**: Interactive wheel that presents educational challenges across multiple subjects
- **Reward System**: Earn points for correct answers and maintain learning streaks
- **Progress Tracking**: Visual dashboards showing streaks, subjects mastered, and achievements
- **Multi-Theme Support**: Cyberpunk gaming theme with support for CELO, Solana, Base, and Coinbase themes
- **Achievement Badges**: Unlock badges for streaks, points, and learning milestones
- **Base Integration**: Built with OnchainKit for seamless Base blockchain integration

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Blockchain**: Base (via OnchainKit)
- **Styling**: Tailwind CSS with custom cyberpunk theme
- **TypeScript**: Full type safety throughout
- **State Management**: React hooks with localStorage persistence

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Set up Environment Variables**
   ```bash
   cp .env.local.example .env.local
   # Add your OnchainKit API key
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```

4. **Open in Browser**
   Navigate to `http://localhost:3000`

## Project Structure

```
app/
├── components/          # Reusable UI components
│   ├── AppHeader.tsx   # App header with user stats
│   ├── SpinWheel.tsx   # Interactive spinning wheel
│   ├── ChallengeCard.tsx # Challenge display and interaction
│   ├── ProgressBar.tsx # Progress visualization
│   ├── RewardBadge.tsx # Achievement badges
│   └── ThemeProvider.tsx # Theme management
├── theme-preview/      # Theme preview page
├── layout.tsx          # Root layout
├── page.tsx           # Main app page
├── providers.tsx      # OnchainKit provider setup
└── globals.css        # Global styles and themes

lib/
├── types.ts           # TypeScript type definitions
├── constants.ts       # App constants and sample data
└── utils.ts          # Utility functions
```

## Themes

EduSpin supports multiple blockchain-inspired themes:

- **Default (Cyberpunk Gaming)**: Dark purple background with neon green accents
- **CELO**: Black background with yellow accents
- **Solana**: Dark purple with purple/magenta accents  
- **Base**: Dark blue with Base blue accents
- **Coinbase**: Dark navy with Coinbase blue accents

Visit `/theme-preview` to see all themes in action.

## Key Components

### SpinWheel
Interactive wheel that randomly selects educational topics and triggers daily challenges.

### ChallengeCard
Displays quiz questions with multiple choice answers, immediate feedback, and explanations.

### ProgressBar
Visual progress indicators for learning streaks and subject exploration.

### RewardBadge
Achievement system with different rarity levels (common, rare, epic, legendary).

## Data Model

- **User**: Tracks learning streaks, points earned, and rewards
- **Challenge**: Educational questions with topics, difficulty, and point values
- **Progress**: User's learning journey and achievements
- **Rewards**: Points and badges earned through learning

## Base Integration

Built as a Base Mini App using:
- OnchainKit for wallet integration
- Base chain for potential reward redemption
- Farcaster Frame compatibility
- Micro-transaction support for premium features

## Development

### Adding New Challenges
Add challenges to `lib/constants.ts` in the `SAMPLE_CHALLENGES` array.

### Creating New Themes
Add theme variables to `app/globals.css` and update the theme selector.

### Extending Features
The modular component architecture makes it easy to add new features like:
- Social sharing
- Leaderboards  
- NFT rewards
- Multi-player challenges

## Deployment

The app is optimized for deployment on Vercel or similar platforms that support Next.js 15.

## License

MIT License - see LICENSE file for details.
