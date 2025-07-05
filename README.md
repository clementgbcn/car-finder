# Car Finder Game 🚗

A fun and interactive car identification game built with React and TypeScript. Test your knowledge of cars from around the world!

## Features

- 🎮 **4 Game Modes**: Choose your challenge level
  - Brand Recognition - Multiple Choice
  - Brand Recognition - Input
  - Model Recognition - Multiple Choice  
  - Model Recognition - Input
- 🏆 **Scoring System**: Track your performance in real-time
- 📱 **Responsive Design**: Works on all devices
- 🖼️ **Real Car Images**: Scraped from Wikipedia with authentic car photos
- 🎯 **20 Questions**: Each game session contains 20 questions
- 📊 **Game Statistics**: See your results at the end of each game

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: CSS3 with responsive design
- **Testing**: Jest + React Testing Library
- **Data Source**: Wikipedia API
- **Deployment**: Vercel
- **CI/CD**: GitHub Actions

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/car-finder.git
cd car-finder
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
```

## Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run lint` - Run ESLint
- `npm run scrape-cars` - Scrape car data from Wikipedia (adds more cars to the dataset)

## Game Rules

1. **Choose Your Game Mode**: Select from one of the 4 available difficulty levels
2. **Answer 20 Questions**: Each game contains exactly 20 questions
3. **No Time Limit**: Take your time to think about each answer
4. **Multiple Choice**: Select from 4 options when in multiple choice mode
5. **Input Mode**: Type your answer when in input mode
6. **See Your Results**: Get detailed statistics at the end of each game

## Project Structure

```
src/
├── components/          # React components
│   ├── GameModeSelector.tsx
│   ├── QuestionCard.tsx
│   └── GameResults.tsx
├── hooks/              # Custom React hooks
│   └── useGame.ts
├── utils/              # Utility functions
│   └── gameLogic.ts
├── types/              # TypeScript type definitions
│   └── index.ts
├── data/               # Car dataset
│   └── cars.ts
└── assets/             # Static assets
    └── images/
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Testing

Run the test suite:
```bash
npm test
```

Run tests with coverage:
```bash
npm test -- --coverage --watchAll=false
```

## Deployment

The app is configured for deployment on Vercel. Simply connect your GitHub repository to Vercel and it will automatically deploy on every push to the main branch.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Car images and data sourced from Wikipedia
- Built with Create React App
- Styled with modern CSS3 features
- Tested with Jest and React Testing Library