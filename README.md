# 🚀 IPO Tracker Website

A modern, AI-powered stock market analysis platform built with Next.js 14, Tailwind CSS, and Framer Motion.

## ✨ Features

- 🤖 AI-powered IPO predictions with 95% accuracy
- 📊 Real-time stock market data and analysis
- 🔔 Smart alerts for IPO launches and price movements
- 📱 Mobile-first, responsive design
- 🎨 Beautiful animations with Framer Motion
- ⚡ Lightning-fast performance with Next.js 14
- 🎯 SEO optimized

## 🛠️ Tech Stack

- **Framework:** Next.js 14
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Language:** JavaScript/JSX

## 📦 Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd ipo-tracker-website
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
ipo-tracker-website/
├── public/                 # Static assets
├── src/
│   ├── app/               # Next.js app directory
│   │   ├── layout.js      # Root layout
│   │   ├── page.js        # Home page
│   │   ├── globals.css    # Global styles
│   │   ├── about/         # About page
│   │   ├── contact/       # Contact page
│   │   └── ...
│   ├── components/        # React components
│   │   ├── layout/        # Layout components (Header, Footer)
│   │   ├── home/          # Home page sections
│   │   └── ...
│   └── lib/               # Utility functions
├── tailwind.config.js     # Tailwind configuration
├── next.config.js         # Next.js configuration
└── package.json           # Dependencies
```

## 🎨 Customization

### Colors

Edit the color scheme in `tailwind.config.js` and `src/app/globals.css`:

```css
:root {
  --primary: #3b82f6;
  --secondary: #8b5cf6;
  --accent: #10b981;
}
```

### Content

- Update text content in component files under `src/components/`
- Modify page content in `src/app/*/page.js`

## 🚀 Build for Production

```bash
npm run build
npm start
```

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## 📧 Contact

For questions or support, reach out to:
- Email: support@ipotracker.com
- Website: [ipotracker.com](https://ipotracker.com)

---

Made with ❤️ by IPO Tracker Team
