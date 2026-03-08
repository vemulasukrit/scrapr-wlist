# SCRAPR - The API for the Entire Internet

<a href="https://www.producthunt.com/products/scrapr-universal-web-scraping-api?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-scrapr-universal-web-scraping-api" target="_blank" rel="noopener noreferrer"><img alt="SCRAPR — Universal Web Scraping API - Turn any website into an API | Product Hunt" width="250" height="54" src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1092571&theme=dark&t=1772960046917"></a>

A modern, responsive landing page for SCRAPR, the browser automation and web scraping API.

## Getting Started

Clone the repository and install dependencies:

```sh
# Clone the repository
git clone https://github.com/vemulasukrit/scrapr-wlist.git

# Navigate to the project directory
cd scrapr-wlist

# Install dependencies (requires Bun)
bun install

# Start the development server
bun run dev
```

The development server will be available at `http://localhost:8080`.

## Project Structure

- **`/src`** - Source code
  - **`/components`** - Reusable React components
  - **`/pages`** - Page components (Index, NotFound)
  - **`/lib`** - Utility functions
  - **`/hooks`** - Custom React hooks
  - **`/integrations`** - Third-party integrations (Supabase)

## Technologies Used

This project is built with:

- **Vite** - Fast build tool and dev server
- **React** - UI library
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Three Fiber** - 3D graphics with Three.js
- **shadcn/ui** - High-quality React components
- **Bun** - JavaScript runtime and package manager

## Building for Production

```sh
bun run build
```

The production bundle will be created in the `dist/` directory.

## Deployment

The site can be deployed to any static hosting platform that supports Vite builds. Popular options include:

- Vercel
- Netlify
- GitHub Pages
- Cloudflare Pages

Simply push the `dist/` directory to your hosting platform of choice.
