# NovaEssay - Professional Academic & Technical Writing Services

A modern, responsive portfolio website showcasing professional academic writing and technical development services.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## 🌟 Features

### Design & UX
- **Transparent Glass Morphism**: Beautiful frosted glass effects on cards and sections
- **Dark Mode Support**: Seamless theme switching with persistent preferences
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices
- **Smooth Animations**: AOS (Animate On Scroll) library integration
- **Loading Screen**: Elegant animated loading experience
- **Scroll Progress Bar**: Visual indicator of page scroll position
- **Particle Effects**: Dynamic background particles on hero section

### Accessibility
- ARIA labels and attributes for screen readers
- Semantic HTML5 structure
- Keyboard navigation support
- High contrast text for readability
- Form validation with clear error messages

### Performance & SEO
- Optimized CSS with modern color variables
- SEO-friendly meta tags
- Open Graph and Twitter Card support
- Clean, semantic code structure
- Mobile-first approach

## 📁 Project Structure

```
NovaEssay/
├── home.html          # Homepage with services showcase
├── about.html         # About page with skills and testimonials
├── contact.html       # Contact page with form and FAQ
├── home.css          # Styles for homepage
├── about.css         # Styles for about page
├── contact.css       # Styles for contact page
├── home.js           # JavaScript for homepage
├── about.js          # JavaScript for about page
├── contact.js        # JavaScript for contact page
└── README.md         # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (optional, for testing)

### Installation

1. **Clone or download the repository**
   ```bash
   git clone https://github.com/yourusername/NovaEssay.git
   cd NovaEssay
   ```

2. **Open in browser**
   - Simply open `home.html` in your web browser
   - Or use a local server:
     ```bash
     # Python
     python -m http.server 8000

     # Node.js
     npx serve
     ```

3. **Access the website**
   - Navigate to `http://localhost:8000` (or your server's URL)

## 🎨 Color Scheme

### Light Theme
- **Primary Text**: `#1a2332`
- **Secondary Text**: `#4a5568`
- **Headings**: `#0f1419`
- **Background**: `#f9fafb`
- **Glass Effect**: `rgba(255, 255, 255, 0.85)`
- **Accent**: `#4a90e2`

### Dark Theme
- **Primary Text**: `#e2e8f0`
- **Secondary Text**: `#cbd5e1`
- **Headings**: `#f1f5f9`
- **Background**: `#0f172a`
- **Glass Effect**: `rgba(30, 41, 59, 0.75)`
- **Accent**: `#4a90e2`

## 📱 Pages Overview

### Home Page (`home.html`)
- Hero section with animated background
- Comprehensive services catalog organized by categories:
  - Academic Writing & Support Services
  - Technical Writing & Development Services
- Call-to-action section
- Responsive navigation

### About Page (`about.html`)
- Company story and mission
- Skills showcase with progress bars
- Timeline of milestones
- Client testimonials carousel
- Statistics section
- Professional expertise categories

### Contact Page (`contact.html`)
- Contact form with validation
- Contact information cards
- WhatsApp integration
- Social media links
- FAQ section
- Map placeholder

## 🛠️ Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with custom properties
- **JavaScript (ES6+)**: Interactive features
- **Font Awesome**: Icon library
- **Google Fonts**: Montserrat & Lora typography

## ⚙️ Key Features Implementation

### Glass Morphism Effect
```css
background: var(--glass-bg);
backdrop-filter: blur(20px) saturate(180%);
-webkit-backdrop-filter: blur(20px) saturate(180%);
border: 1px solid var(--glass-border);
```

### Dark Mode Toggle
Theme preference is saved to `localStorage` and persists across sessions.

### Form Validation
Client-side validation with ARIA attributes for accessibility.

### Responsive Design
Mobile-first approach with breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🔧 Customization

### Changing Colors
Edit CSS variables in the `:root` selector in each CSS file:
```css
:root {
    --primary-color: #your-color;
    --accent-color: #your-color;
    /* ... */
}
```

### Modifying Content
1. Open the relevant HTML file
2. Edit the text content within the HTML tags
3. Save and refresh your browser

### Adding New Sections
1. Create HTML structure
2. Add corresponding CSS styles
3. Implement JavaScript functionality if needed

## 📧 Contact Information

Update the contact details in `contact.html`:
- **Email**: ritujain7991@gmail.com
- **WhatsApp**: +44 7593 968598
- **Location**: 123 High Street, London, SW1A 1AA, UK

## 🐛 Known Issues & Solutions

### Issue: Particles not showing on mobile
**Solution**: Particles are disabled on screens < 768px for performance

### Issue: Form not submitting
**Solution**: Backend integration required. Current implementation is client-side only.

## 🔒 Security Considerations

- Form inputs have validation to prevent malicious data
- No sensitive data is stored in localStorage except theme preference
- External CDN resources loaded over HTTPS
- Consider adding CSP headers when deploying

## 📈 Future Enhancements

- [ ] Backend integration for contact form
- [ ] Image lazy loading
- [ ] Service Worker for offline functionality
- [ ] Blog section for content marketing
- [ ] Client dashboard/portal
- [ ] Payment integration
- [ ] Live chat support
- [ ] Multi-language support
- [ ] Analytics integration

## 🚀 Deployment

### GitHub Pages
```bash
git add .
git commit -m "Deploy website"
git push origin main
```
Enable GitHub Pages in repository settings.

### Netlify
1. Connect your repository
2. Build command: (none needed for static site)
3. Publish directory: `/`
4. Deploy

### Vercel
```bash
vercel --prod
```

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Credits

- **Design & Development**: NovaEssay Team
- **Icons**: Font Awesome
- **Fonts**: Google Fonts (Montserrat, Lora)
- **Inspiration**: Modern glass morphism design trends

## 📞 Support

For support, email ritujain7991@gmail.com or message us on WhatsApp at +44 7593 968598.

## 🙏 Acknowledgments

- All our clients who have trusted us with their projects
- The open-source community for amazing tools and libraries
- Everyone who contributed feedback and suggestions

---

**Made with ❤️ by NovaEssay** | © 2025 All Rights Reserved
