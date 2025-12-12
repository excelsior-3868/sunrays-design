# Chatbot Implementation - Sunrays Pre School

## 🤖 Overview
A custom automated chatbot has been implemented on the Sunrays Pre School website to provide instant answers to common questions about admissions, programs, fees, location, and more.

## ✨ Features

### 1. **Automated Responses**
The chatbot can automatically answer questions about:
- 📚 Programs offered (Play Group, Nursery, LKG, UKG)
- 💰 Fee structure and payment information
- 📝 Admission process and requirements
- 📍 School location and directions
- ⏰ School timings and schedule
- 👨‍🏫 Teachers and staff information
- 🏫 Facilities and infrastructure
- 📞 Contact information

### 2. **Quick Reply Buttons**
8 pre-configured quick reply buttons for instant answers:
1. What programs do you offer?
2. What are the fees?
3. How to apply?
4. Where are you located?
5. What are your timings?
6. Tell me about your teachers
7. What facilities do you have?
8. Contact information

### 3. **Smart Keyword Detection**
The chatbot uses keyword matching to provide relevant responses even when users type their own questions.

### 4. **Professional Design**
- ✅ Modern, clean interface
- ✅ Smooth animations
- ✅ Brand colors (red gradient)
- ✅ Mobile responsive
- ✅ Floating chat button with pulse animation
- ✅ Online status indicator

## 📁 Files Created

1. **`src/components/Chatbot/Chatbot.tsx`**
   - Main chatbot component
   - Message handling logic
   - Quick reply system
   - Keyword detection

2. **`src/components/Chatbot/Chatbot.module.css`**
   - Professional styling
   - Animations and transitions
   - Responsive design
   - Brand-aligned colors

3. **`src/app/(public)/layout.tsx`** (Modified)
   - Added chatbot to all public pages

## 🎨 Design Features

### Chat Button
- Fixed position (bottom-right corner)
- Pulsing animation to attract attention
- Badge indicator showing unread messages
- Smooth hover effects

### Chat Window
- 400px width on desktop
- Full-screen on mobile
- Slide-up animation on open
- Scrollable message history
- Auto-scroll to latest message

### Messages
- Bot messages: Left-aligned with bot avatar
- User messages: Right-aligned with user avatar
- Timestamps for each message
- Smooth fade-in animations

## 🔧 How It Works

### 1. **User Opens Chat**
- Clicks the floating chat button
- Chat window slides up
- Greeting message appears
- Quick reply buttons displayed

### 2. **User Asks Question**
Two ways to interact:
- **Click quick reply button** → Instant answer
- **Type custom question** → Keyword-based response

### 3. **Bot Responds**
- Matches keywords in user's message
- Provides relevant pre-written answer
- Shows quick replies for follow-up questions

### 4. **Fallback Response**
If no keywords match:
- Provides contact information
- Suggests using quick reply buttons
- Maintains helpful tone

## 📱 Responsive Design

### Desktop (> 768px)
- 400px × 600px chat window
- Bottom-right positioning
- Comfortable spacing

### Tablet (768px - 480px)
- Slightly smaller window
- Adjusted spacing
- Touch-friendly buttons

### Mobile (< 480px)
- Full-screen chat window
- Optimized for touch
- Easy to use on small screens

## 🎯 Keyword Detection

The chatbot recognizes these keywords:

| Keyword | Response |
|---------|----------|
| program, class, course | Programs information |
| fee, cost, price, payment | Fee structure |
| admission, enroll, apply | Admission process |
| location, address, where | School location |
| time, hour, schedule | School timings |
| teacher, staff, principal | Teacher information |
| facility, classroom | Facilities overview |
| contact, phone, email | Contact details |
| hello, hi, hey | Greeting response |

## 🚀 Future Enhancements (Optional)

### Phase 2 - Advanced Features
1. **AI Integration**
   - Connect to OpenAI API
   - More natural conversations
   - Context-aware responses

2. **Lead Capture**
   - Collect visitor information
   - Save inquiries to database
   - Email notifications to admin

3. **Live Chat Handoff**
   - Transfer to human agent
   - Real-time staff responses
   - Chat history preservation

4. **Analytics**
   - Track common questions
   - Measure engagement
   - Improve responses

5. **Multi-language**
   - Nepali language support
   - Language switcher
   - Bilingual responses

## 📊 Benefits

### For Parents
- ✅ Instant answers 24/7
- ✅ No waiting for email replies
- ✅ Easy access to information
- ✅ Convenient and fast

### For School
- ✅ Reduces repetitive inquiries
- ✅ Improves user experience
- ✅ Professional image
- ✅ Always available
- ✅ No monthly costs

## 🔒 Privacy & Data

- ✅ No data collection
- ✅ No cookies stored
- ✅ No external services
- ✅ Runs entirely on your website
- ✅ No privacy concerns

## 🎓 Customization

### To Update Responses
Edit `src/components/Chatbot/Chatbot.tsx`:

```tsx
const quickReplies: QuickReply[] = [
    {
        text: "Your question here",
        response: "Your answer here"
    },
    // Add more...
];
```

### To Change Colors
Edit `src/components/Chatbot/Chatbot.module.css`:

```css
.chatButton {
    background: linear-gradient(135deg, #YOUR_COLOR 0%, #YOUR_COLOR 100%);
}
```

### To Modify Position
Change in CSS:
```css
.chatButton {
    bottom: 24px;  /* Distance from bottom */
    right: 24px;   /* Distance from right */
}
```

## ✅ Testing Checklist

- [x] Chat button appears on all pages
- [x] Chat window opens/closes smoothly
- [x] Quick replies work correctly
- [x] Keyword detection responds appropriately
- [x] Messages display with timestamps
- [x] Scrolling works in message history
- [x] Mobile responsive design
- [x] Animations are smooth
- [x] No console errors

## 📝 Usage Instructions

### For Website Visitors
1. Click the red chat button in bottom-right corner
2. Read the greeting message
3. Click a quick reply button OR type your question
4. Get instant automated response
5. Continue conversation as needed

### For School Staff
- No action needed! The chatbot works automatically
- All responses are pre-configured
- No maintenance required
- Can be customized anytime

## 🎉 Success!

Your automated chatbot is now live on the Sunrays Pre School website!

**Features:**
- ✅ 8 pre-configured FAQ responses
- ✅ Smart keyword detection
- ✅ Professional design
- ✅ Mobile responsive
- ✅ Zero monthly costs
- ✅ Always available

---

**Implemented**: December 12, 2025
**Status**: ✅ Live and Active
**Cost**: FREE (No monthly fees)
