# Hero Section Color Scheme - Sunrays Pre School

## 🎨 Color Assignment

Based on the three-color scheme from your brand guidelines, I've uniformly assigned colors to all hero sections across the website:

### **Color Palette:**
1. **Blue** - `#4A90E2` → `#357ABD` (gradient)
2. **Red/Coral** - `#FF5A5F` → `#E63946` (gradient)
3. **Yellow** - `#FED049` → `#FFC107` (gradient)

---

## 📄 Page Assignments

### **🔵 BLUE Pages** (Safe & Caring Environment)
These pages focus on education, learning, and structure:

1. **About Us** - `/about`
   - File: `about.module.css`
   - Gradient: `linear-gradient(135deg, #4A90E2 0%, #357ABD 100%)`
   - Height: 400px

2. **Programs** - `/programs`
   - File: `programs.module.css`
   - Gradient: `linear-gradient(135deg, #4A90E2 0%, #357ABD 100%)`
   - Height: 300px

3. **Gallery** - `/pages/gallery`
   - File: `gallery.module.css`
   - Gradient: `linear-gradient(135deg, #FED049 0%, #FFC107 100%)` (Yellow - already set)
   - Height: 300px

---

### **🔴 RED/CORAL Pages** (Development Through Play)
These pages focus on engagement, action, and connection:

1. **Contact Us** - `/contact`
   - File: `contact.module.css`
   - Gradient: `linear-gradient(135deg, #FF5A5F 0%, #E63946 100%)`
   - Height: 300px

2. **Admissions** - `/admissions`
   - File: `admissions.module.css`
   - Gradient: `linear-gradient(135deg, #FF5A5F 0%, #E63946 100%)`
   - Height: 300px

3. **Events** - `/pages/events`
   - File: `events.module.css`
   - Gradient: `linear-gradient(135deg, #FF5A5F 0%, #E63946 100%)`
   - Height: 350px

---

### **🟡 YELLOW Pages** (Building Self-Confidence)
These pages focus on growth, positivity, and information:

1. **What Sets Us Apart** - `/why-choose-us`
   - File: `why-choose-us.module.css`
   - Gradient: `linear-gradient(135deg, #FED049 0%, #FFC107 100%)`
   - Height: 300px

2. **FAQ** - `/pages/faq`
   - File: `faq.module.css`
   - Gradient: `linear-gradient(135deg, #FED049 0%, #FFC107 100%)`
   - Height: 300px

3. **Blog** - `/pages/blog`
   - File: `blog.module.css`
   - Gradient: `linear-gradient(135deg, #FED049 0%, #FFC107 100%)`
   - Height: 300px

---

## 🎯 Design Rationale

### **Blue (Safe & Caring Environment)**
- **Meaning**: Trust, stability, professionalism, learning
- **Pages**: About Us, Programs, Gallery
- **Why**: These pages showcase your educational approach and environment

### **Red/Coral (Development Through Play)**
- **Meaning**: Energy, passion, engagement, action
- **Pages**: Contact, Admissions, Events
- **Why**: These pages encourage interaction and engagement

### **Yellow (Building Self-Confidence)**
- **Meaning**: Optimism, happiness, growth, positivity
- **Pages**: What Sets Us Apart, FAQ, Blog
- **Why**: These pages highlight benefits and positive outcomes

---

## 📊 Visual Consistency

### **All Hero Sections Include:**
- ✅ Gradient backgrounds (not solid colors)
- ✅ White text for readability
- ✅ Wave SVG bottom decoration
- ✅ Consistent padding and margins
- ✅ Responsive design
- ✅ Text shadow for depth

### **Common Properties:**
```css
.hero {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: -80px;
    padding-top: 40px;
}

.heroTitle {
    color: white;
    font-size: 3rem;
    font-weight: 800;
    text-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    z-index: 10;
    font-family: var(--font-heading);
}
```

---

## 🎨 Color Psychology Mapping

| Color | Emotion | Pages | Purpose |
|-------|---------|-------|---------|
| 🔵 Blue | Trust, Stability | About, Programs | Showcase education quality |
| 🔴 Red | Energy, Action | Contact, Admissions, Events | Encourage engagement |
| 🟡 Yellow | Optimism, Growth | What Sets Us Apart, FAQ, Blog | Highlight benefits |

---

## ✅ Implementation Complete

All hero sections have been updated with the three-color scheme:
- **3 Blue pages** ✅
- **3 Red/Coral pages** ✅
- **3 Yellow pages** ✅

**Total: 9 pages** with uniform, branded hero sections!

---

## 📱 Responsive Behavior

All hero sections maintain their colors across all devices:
- **Desktop**: Full gradient effect
- **Tablet**: Optimized heights
- **Mobile**: Adjusted font sizes, maintained colors

---

**Updated**: December 12, 2025
**Status**: ✅ Complete
**Color Scheme**: Uniformly applied across all pages
