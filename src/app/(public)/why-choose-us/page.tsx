import { Metadata } from 'next';
import styles from './why-choose-us.module.css';
import { GraduationCap, Home, Users, Utensils, Shield, Heart, Stethoscope, MessageCircle, Book } from 'lucide-react';

export const metadata: Metadata = {
    title: 'What Sets Us Apart - Complete Facilities & Expert Care',
    description: 'Discover why parents choose Sunrays Pre School: quality teaching, spacious classrooms, experienced teachers, nutritious meals, health support, and integration of Nepali culture.',
    keywords: ['best preschool kathmandu', 'quality preschool', 'experienced teachers', 'preschool facilities', 'child nutrition', 'nepali culture education'],
    openGraph: {
        title: 'What Sets Us Apart - Complete Facilities',
        description: 'Quality teaching, experienced educators, spacious facilities, and comprehensive child care in Kathmandu.',
        type: 'website',
    },
};

const features = [
    {
        icon: GraduationCap,
        title: "Quality Teaching",
        description: "Our skilled educators provide engaging, interactive lessons that build strong learning foundations. We use innovative teaching methods that make learning fun and effective, ensuring every child develops a love for education.",
        iconColor: "red"
    },
    {
        icon: Home,
        title: "Conducive Environment",
        description: "We create a warm, welcoming atmosphere where children feel safe, comfortable, and excited to learn. Our environment is designed to stimulate curiosity, creativity, and positive social interactions among students.",
        iconColor: "blue"
    },
    {
        icon: Home,
        title: "Spacious Classroom & Playground",
        description: "Bright, airy classrooms and expansive play areas provide children with ample space to learn, explore, and play. Our facilities encourage both indoor learning activities and outdoor physical development in a safe, supervised setting.",
        iconColor: "yellow"
    },
    {
        icon: Users,
        title: "Trained & Experienced Teachers",
        description: "Our dedicated team of educators brings years of experience and professional training in early childhood education. They are passionate about nurturing young minds and committed to supporting every child's unique growth journey.",
        iconColor: "green"
    },
    {
        icon: Utensils,
        title: "Well Balanced Nutritious Diet",
        description: "We provide healthy, balanced meals carefully planned to fuel children's energy, growth, and development. Our nutritious menu includes fresh ingredients and caters to dietary requirements, ensuring every child receives proper nutrition.",
        iconColor: "red"
    },
    {
        icon: Shield,
        title: "Well Managed Classrooms with Advanced Equipments",
        description: "Our classrooms are equipped with modern educational tools and technology that enhance learning experiences. From smart boards to age-appropriate learning materials, we provide resources that make education engaging and effective.",
        iconColor: "blue"
    },
    {
        icon: Stethoscope,
        title: "School Based Health Support",
        description: "We maintain a comprehensive health and safety program with regular health check-ups, first aid facilities, and trained staff to handle medical situations. Your child's physical well-being is our priority throughout the school day.",
        iconColor: "green"
    },
    {
        icon: MessageCircle,
        title: "Parents Interaction",
        description: "We believe in strong parent-school partnerships and maintain open communication through regular meetings, progress reports, and events. Parents are actively involved in their child's educational journey, ensuring collaborative growth.",
        iconColor: "yellow"
    },
    {
        icon: Book,
        title: "Nepali Culture and Driven Knowledge",
        description: "While providing world-class education, we deeply value and integrate Nepali culture, traditions, and values into our curriculum. Children learn to appreciate their heritage while developing global perspectives and cultural awareness.",
        iconColor: "red"
    }
];

export default function WhyChooseUsPage() {
    return (
        <div className={styles.page}>
            {/* Hero Section */}
            <section className={styles.hero}>
                <h1 className={styles.heroTitle}>What Sets Us Apart?</h1>
                <div className={styles.waveBottom}>
                    <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className={styles.waveSvg}>
                        <path d="M0,0 C150,100 350,0 600,50 C850,100 1050,0 1200,50 L1200,120 L0,120 Z" fill="#ffffff"></path>
                    </svg>
                </div>
            </section>

            {/* Main Content */}
            <section className={styles.mainContent}>
                <div className="container">
                    <div className={styles.contentWrapper}>
                        <span className={styles.subtitle}>What Sets Us Apart?</span>
                        <h2 className={styles.sectionTitle}>Complete Facilities</h2>
                        <p className={styles.description}>
                            We provide an environment designed to support every child's growth, comfort, and happiness.
                            Our facilities ensure a safe, nurturing, and engaging learning experience that prepares children for future success.
                        </p>

                        {/* Features List */}
                        <div className={styles.featuresList}>
                            {features.map((feature, index) => (
                                <div key={index} className={styles.featureItem}>
                                    <div className={`${styles.iconWrapper} ${styles[feature.iconColor]}`}>
                                        <feature.icon size={36} strokeWidth={2} />
                                    </div>
                                    <div className={styles.featureContent}>
                                        <h3 className={styles.featureTitle}>{feature.title}</h3>
                                        <p className={styles.featureText}>{feature.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
