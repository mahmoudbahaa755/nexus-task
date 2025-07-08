# Movie Search App

A simple and responsive movie search application built with React, TypeScript, and Vite. Search and discover movies using the OMDB API with advanced filtering options and a beautiful user interface.

## 🌟 Features

- **🔍 Movie Search**: Search for movies by title with real-time suggestions
- **📱 Responsive Design**: Beautiful UI that works on all devices
- **🎯 Advanced Filters**: Filter by year, type (movie/series/episode), and more
- **❤️ Favorites**: Save your favorite movies for easy access
- **🌙 Dark/Light Theme**: Toggle between dark and light modes
- **📄 Pagination**: Navigate through search results efficiently
- **📝 Movie Details**: View detailed information about each movie
- **🚀 Fast Loading**: Optimized with React Query for caching and performance

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS
- **UI Components**: Radix UI
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (React Query)
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **API**: OMDB API

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- pnpm (recommended) or npm

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd nexus-task
```

2. Install dependencies:

```bash
pnpm install
# or
npm install
```

3. Start the development server:

```bash
pnpm dev
# or
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Available Scripts

- `pnpm run dev` - Start development server
- `pnpm run build` - Build for production

### API Configuration

The app is configured to use HTTPS for the OMDB API to ensure compatibility with production HTTPS deployments. You can find the API configuration in `src/utils/api.ts`.

## 🎨 Features Overview

### Search & Discovery

- Real-time movie search with debounced input
- Search suggestions and autocomplete
- Advanced filtering by year, type, and genre

### User Experience

- Responsive design for mobile and desktop
- Dark/light theme toggle
- Loading states and error handling
- Smooth animations and transitions

### Data Management

- Efficient caching with React Query
- Optimistic updates for favorites
- Persistent favorites storage

## 🚀 Deployment

The app is ready for deployment on Vercel
https://omdb-task-jet.vercel.app/

### Build for Production

```bash
pnpm build
```

The built files will be in the `dist` directory.

### Deploy to Vercel

1. Connect your repository to Vercel
2. Vercel will automatically detect the framework and build settings
3. Deploy!

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [OMDB API](http://www.omdbapi.com/) for providing movie data
- [Radix UI](https://www.radix-ui.com/) for accessible UI components
- [TailwindCSS](https://tailwindcss.com/) for utility-first styling
