import styles from './faq.module.css';

// FAQ Data with Categories and Themes matching the visual design
// Questions are exact matches from the provided text file.
const faqs = [
    {
        category: "ACADEMICS",
        question: "What teaching method do you use?",
        answer: "We follow the Play-Way Method, where children learn through fun activities, play, music, movement, and creativity.",
        tag: "Play-Way",
        theme: "Red"
    },
    {
        category: "ADMISSIONS",
        question: "What age groups can join?",
        answer: (
            <div className="space-y-2">
                <p>We welcome children from <strong>18 months to 5+ years</strong> across:</p>
                <div className="flex flex-wrap gap-2 mt-1">
                    <span className="px-2 py-1 bg-gray-100 rounded-md text-sm font-semibold text-gray-700">Playgroup</span>
                    <span className="px-2 py-1 bg-gray-100 rounded-md text-sm font-semibold text-gray-700">Foundation (Nursery)</span>
                    <span className="px-2 py-1 bg-gray-100 rounded-md text-sm font-semibold text-gray-700">Pre I (LKG)</span>
                    <span className="px-2 py-1 bg-gray-100 rounded-md text-sm font-semibold text-gray-700">Plus Pre II (UKG)</span>
                </div>
            </div>
        ),
        tag: "1.5 - 5+ Years",
        theme: "Purple"
    },
    {
        category: "LOGISTICS",
        question: "What are the school days and hours?",
        answer: (
            <div>
                <p className="text-lg font-bold text-[var(--color-dark)] mb-1">Sunday to Friday</p>
                <p className="text-xl font-extrabold text-[var(--color-blue)]">9:00 AM – 2:45 PM</p>
            </div>
        ),
        tag: "Schedule",
        theme: "Blue"
    },
    {
        category: "FACILITIES",
        question: "What facilities do you offer?",
        answer: (
            <ul className="grid grid-cols-1 gap-2 text-sm font-medium">
                {[
                    "Safe & caring environment",
                    "Spacious classrooms & playground",
                    "Trained, experienced teachers",
                    "Nutritious meals",
                    "Health support",
                    "Parent–school partnership",
                    "Nepali cultural values"
                ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-600">
                        <span className="h-2 w-2 rounded-full bg-[var(--color-primary)] shrink-0"></span>
                        {item}
                    </li>
                ))}
            </ul>
        ),
        tag: "Amenities",
        theme: "Red"
    },
    {
        category: "VALUES",
        question: "What makes Sunrays different?",
        answer: "We focus on holistic development—social, emotional, physical, and cognitive—using playful, loving, child-friendly methods.",
        tag: "Holistic",
        theme: "Purple"
    },
    {
        category: "LOCATION",
        question: "Where are you located?",
        answer: (
            <div>
                <p className="font-bold text-gray-800 text-lg">Purnadevi Marg, Dallu-15</p>
                <p className="text-[var(--color-blue)] font-medium">Kathmandu, Nepal</p>
                <p className="text-xs text-gray-500 mt-2 italic">(We provide a clear map for easy navigation.)</p>
            </div>
        ),
        tag: "Map",
        theme: "Blue"
    },
    {
        category: "ENROLLMENT",
        question: "How do I apply for admission?",
        answer: "Fill a simple form where we ask about your child’s habits, allergies, and interests.",
        tag: "Step 1",
        theme: "Green"
    },
    {
        category: "REQUIREMENTS",
        question: "What documents do I need?",
        answer: (
            <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                <ul className="space-y-2">
                    <li className="flex items-center gap-3">
                        <span className="text-xl">📸</span>
                        <span className="font-medium text-gray-700">4 passport photos</span>
                    </li>
                    <li className="flex items-center gap-3">
                        <span className="text-xl">📜</span>
                        <span className="font-medium text-gray-700">Birth certificate</span>
                    </li>
                    <li className="flex items-center gap-3">
                        <span className="text-xl">💉</span>
                        <span className="font-medium text-gray-700">Vaccination records</span>
                    </li>
                </ul>
            </div>
        ),
        tag: "Step 2",
        theme: "Red"
    }
];

export default function FAQPage() {
    return (
        <div>
            {/* Hero Section */}
            <section className={styles.hero}>
                <h1 className={styles.heroTitle}>FAQ</h1>
                <div className={styles.waveBottom}>
                    <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className={styles.waveSvg}>
                        <path d="M0,0 C150,100 350,0 600,50 C850,100 1050,0 1200,50 L1200,120 L0,120 Z" fill="#ffffff"></path>
                    </svg>
                </div>
            </section>

            <section className={styles.faqSection}>
                <div className="container">

                    {/* Centered Introductory Text */}
                    <div className={styles.faqHeader}>
                        <span className={styles.sectionSubtitle}>Common Questions</span>
                        <h2 className={styles.sectionHeading}>Everything You Need to Know</h2>
                        <p className={styles.sectionDesc}>
                            Finding the right preschool is a big decision. Here are some answers to help you decide if Sunrays is the best fit for your little one.
                        </p>
                    </div>

                    <div className={styles.faqGrid}>
                        {faqs.map((faq, index) => (
                            <div key={index} className={`${styles.faqCard} ${styles['border' + faq.theme]}`}>

                                {/* Header: Category + Tag */}
                                <div className={styles.cardHeader}>
                                    <span className={`${styles.cardCategory} ${styles['text' + faq.theme]}`}>
                                        {faq.category}
                                    </span>
                                    <span className={`${styles.cardTag} ${styles['bg' + faq.theme]}`}>
                                        {faq.tag}
                                    </span>
                                </div>

                                {/* Body */}
                                <h3 className={styles.question}>{faq.question}</h3>
                                <div className={styles.answer}>
                                    {faq.answer}
                                </div>

                            </div>
                        ))}
                    </div>

                    {/* Pink CTA Design */}
                    <div className={styles.ctaBox}>
                        <h3 className={styles.ctaTitle}>Have Questions?</h3>
                        <p className={styles.ctaText}>
                            We are here to help! Contact our admissions office for more details or to schedule a visit.
                        </p>
                        <a href="/contact" className={styles.ctaButton}>
                            Contact Us Today
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
