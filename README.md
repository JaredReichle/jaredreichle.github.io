# Jared Reichle - Portfolio Website

A modern, responsive portfolio website built with HTML, CSS, and JavaScript. This website showcases professional experience, projects, and provides a way for visitors to get in touch.

## 🚀 Features

- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation
- **Modern UI/UX**: Clean, professional design with smooth animations
- **Interactive Elements**: Project modals, skill tooltips, and smooth scrolling
- **Astronomy Gallery**: Dedicated page showcasing astronomical photography
- **Performance Optimized**: Lazy loading images and efficient CSS/JS

## 📁 Project Structure

```
jaredreichle.github.io/
├── index.html              # Main portfolio page
├── astro.html              # Astronomy gallery page
├── styles.css              # Main stylesheet with CSS variables
├── script.js               # Main JavaScript functionality
├── astro.js                # Astronomy gallery JavaScript
├── favicon.svg             # Website favicon
├── assets/
│   └── 2025_Resume.pdf     # Downloadable resume
├── images/
│   ├── profile.jpg         # Profile image
│   ├── astro/              # Astronomy images
│   └── [project images]    # Project screenshots
└── README.md               # This file
```

## 🛠️ Technologies Used

- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Modern styling with CSS custom properties and Flexbox/Grid
- **JavaScript (ES6+)**: Vanilla JS with modern features and best practices
- **Font Awesome**: Icons for UI elements
- **Google Fonts**: Inter font family for typography

## 🎨 Design Features

### Color Scheme
- **Primary**: Blue (#2563eb) - Professional and trustworthy
- **Secondary**: Orange (#ff6b35) - Energetic and creative
- **Accent**: Teal (#4ecdc4) - Modern and balanced
- **Neutral**: Grays for text and backgrounds

### Typography
- **Font Family**: Inter (Google Fonts)
- **Hierarchy**: Clear heading structure with consistent sizing
- **Readability**: Optimized line heights and spacing

### Animations
- Smooth scroll behavior
- Hover effects on interactive elements
- Fade-in animations for content sections
- Subtle pulse animation for project cards

## 📱 Responsive Breakpoints

- **Desktop**: 1200px+ (Full layout)
- **Tablet**: 768px - 1199px (Adjusted grid layouts)
- **Mobile**: < 768px (Single column, mobile menu)

## ♿ Accessibility Features

- **ARIA Labels**: Proper labeling for screen readers
- **Keyboard Navigation**: Full keyboard accessibility
- **Focus Management**: Clear focus indicators
- **Semantic HTML**: Proper heading structure and landmarks
- **Color Contrast**: WCAG AA compliant color ratios
- **Reduced Motion**: Respects user's motion preferences

## 🔧 Code Quality

### JavaScript Best Practices
- Modular function organization
- Comprehensive error handling
- JSDoc comments for documentation
- Event delegation where appropriate
- Memory leak prevention

### CSS Best Practices
- CSS custom properties for consistency
- Logical organization with comments
- Mobile-first responsive design
- Performance optimizations
- Accessibility considerations

### HTML Best Practices
- Semantic markup structure
- Proper meta tags and SEO
- Accessibility attributes
- Clean, readable code

## 🚀 Getting Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/jaredreichle.github.io.git
   cd jaredreichle.github.io
   ```

2. **Open in browser**:
   - Simply open `index.html` in your web browser
   - Or use a local server for development

3. **Customize**:
   - Update content in HTML files
   - Modify colors in CSS custom properties
   - Add new projects to the JavaScript data

## 📝 Customization Guide

### Adding New Projects
1. Add project data to `projectData` object in `script.js`
2. Add project card HTML to `index.html`
3. Include project image in `images/` directory

### Modifying Colors
Update CSS custom properties in `styles.css`:
```css
:root {
    --primary-color: #your-color;
    --secondary-color: #your-color;
    --accent-color: #your-color;
}
```

### Adding Astronomy Images
1. Add image data to `astroImages` array in `astro.js`
2. Place image file in `images/astro/` directory
3. Update image metadata (title, description, equipment)

## 🌟 Performance Optimizations

- **Image Optimization**: Compressed images with appropriate formats
- **Lazy Loading**: Images load as needed
- **CSS Optimization**: Efficient selectors and minimal repaints
- **JavaScript Optimization**: Debounced scroll events and efficient DOM queries

## 🔍 SEO Features

- Meta descriptions and keywords
- Proper heading structure
- Alt text for images
- Semantic HTML markup
- Open Graph meta tags

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

While this is a personal portfolio, suggestions and improvements are welcome:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

If you need help customizing this portfolio or have questions about the implementation, feel free to reach out through the contact form on the website or via email at reichle.jared@gmail.com.

## 🔄 Recent Updates

- **Code Cleanup**: Removed unused code and improved organization
- **Accessibility**: Enhanced ARIA labels and keyboard navigation
- **Performance**: Optimized animations and reduced bundle size
- **Documentation**: Comprehensive comments and README updates
- **Best Practices**: Modern JavaScript patterns and CSS organization

---

*Built with ❤️ and modern web standards*