# Dental Clinic Website

A modern, responsive website for a dental clinic built with HTML, Tailwind CSS, and JavaScript.

## Features

- Mobile-first responsive design
- Accessible UI with semantic HTML and ARIA attributes
- SEO optimized with proper meta tags
- Performance optimized with lazy loading images
- Interactive elements with smooth animations
- Contact form with validation

## Tech Stack

- HTML5
- CSS3 with Tailwind CSS
- JavaScript (ES6+)
- PostCSS for processing CSS
- Netlify for deployment

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/dental-clinic.git
cd dental-clinic
```

2. Install dependencies:

```bash
npm install
```

### Development

To start the development server:

```bash
npm run dev
```

This will:
- Watch for changes in the Tailwind CSS source file
- Compile Tailwind CSS to output.css
- Open the website in your browser

### Building for Production

To build the project for production:

```bash
npm run build
```

This will generate optimized CSS with purged unused styles.

## Deployment

### Deploying to Netlify via Git Integration

1. Push your repository to GitHub.

2. Log in to Netlify (https://app.netlify.com/).

3. Click "New site from Git".

4. Connect to your GitHub repository.

5. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `.`

6. Deploy the site.

### Deploying to Netlify via Drag & Drop

1. Build the project:

```bash
npm run build
```

2. Go to Netlify (https://app.netlify.com/).

3. Drag and drop the entire project folder onto the Netlify dashboard.

## Folder Structure

```
.
├── index.html              # Main HTML file
├── src/
│   ├── styles/             # CSS files
│   │   ├── tailwind.css    # Tailwind source
│   │   └── output.css      # Compiled CSS
│   └── scripts/            # JavaScript files
│       └── main.js         # Main JS file
├── public/
│   └── assets/             # Static assets
│       ├── logo.png
│       └── favicon.ico
├── tailwind.config.js      # Tailwind configuration
├── postcss.config.js       # PostCSS configuration
├── package.json            # Dependencies and scripts
├── netlify.toml            # Netlify configuration
└── README.md               # Project documentation
```

## Customization

### Tailwind Configuration

To customize the theme, edit the `tailwind.config.js` file. You can modify colors, fonts, spacing, and more.

### Adding Pages

To add new pages, create additional HTML files in the root directory following the same structure as the index.html file.

## SEO Optimization

The website includes:
- Descriptive title and meta tags
- Open Graph meta tags for social sharing
- Semantic HTML structure
- Proper heading hierarchy
- Image alt attributes

## Accessibility Features

- Semantic HTML5 elements
- ARIA landmarks and roles
- Keyboard navigation support
- Focus styles for interactive elements
- Color contrast compliance

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

© 2025 Dental Clinic. All rights reserved. 