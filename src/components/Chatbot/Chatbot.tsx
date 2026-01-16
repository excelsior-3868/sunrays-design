'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import styles from './Chatbot.module.css';

interface Message {
    id: number;
    text: string;
    sender: 'bot' | 'user';
    timestamp: Date;
}

interface QuickReply {
    text: string;
    response: string;
}

const quickReplies: QuickReply[] = [
    {
        text: "📚 What programs do you offer?",
        response: "We offer 4 programs:\n\n🎨 Play Group (2-3 years)\n📖 Nursery (3-4 years)\n✏️ LKG (4-5 years)\n📚 UKG (5-6 years)\n\nEach program is designed to develop age-appropriate skills through play-based learning!"
    },
    {
        text: "💰 What are the fees?",
        response: "For detailed fee structure and payment plans, please contact us:\n\n📞 01-5382926\n📧 info.sunrayspreschool@gmail.com\n\nOr visit our Admissions page for more information!"
    },
    {
        text: "📝 How to apply?",
        response: "Admission Process:\n\n1️⃣ Fill out the application form\n2️⃣ Submit required documents\n3️⃣ Schedule a school visit\n4️⃣ Complete the enrollment\n\nVisit our Admissions page or call us at 01-5382926 for assistance!"
    },
    {
        text: "📍 Where are you located?",
        response: "📍 Location:\nPurnadevi Marg, Dallu\nKathmandu-15, Nepal\n\n🕐 School Hours:\nSunday - Friday: 9:00 AM - 2:45 PM\n\nSaturday: Closed\n\nYou can find us on Google Maps from our Contact page!"
    },
    {
        text: "⏰ What are your timings?",
        response: "🕐 School Timings:\n\n📅 Sunday - Friday\n⏰ 9:00 AM - 2:45 PM\n\n📅 Saturday\n🚫 Closed\n\nWe follow the Nepal government school calendar for holidays."
    },
    {
        text: "👨‍🏫 Tell me about your teachers",
        response: "Our teachers are:\n\n✅ Highly qualified and experienced\n✅ Trained in early childhood education\n✅ Passionate about child development\n✅ Fluent in English and Nepali\n\nOur Principal, Manahera Maharjan, leads a dedicated team committed to your child's growth!"
    },
    {
        text: "🏫 What facilities do you have?",
        response: "Our facilities include:\n\n🏠 Spacious, well-ventilated classrooms\n🍎 Nutritious meals & snacks\n🏥 Health & medical support\n🎨 Creative learning spaces\n🛡️ Safe & secure environment\n📚 Modern learning resources\n\nVisit our 'What Sets Us Apart' page to learn more!"
    },
    {
        text: "📞 Contact information",
        response: "📞 Contact Us:\n\n☎️ Phone: 01-5382926\n📧 Email: info.sunrayspreschool@gmail.com\n📍 Address: Purnadevi Marg, Dallu, Kathmandu-15\n\n🌐 Social Media:\nFacebook | Instagram | Twitter | YouTube\n\nWe're here to help! 😊"
    }
];

const greetingMessage = "👋 Hello! Welcome to Sunrays Pre School!\n\nI'm here to help you with information about our programs, admissions, facilities, and more.\n\nHow can I assist you today?";

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            text: greetingMessage,
            sender: 'bot',
            timestamp: new Date()
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }, 100);
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSuggestionClick = (reply: QuickReply) => {
        setShowSuggestions(false);

        // Add user message
        const userMessage: Message = {
            id: messages.length + 1,
            text: reply.text,
            sender: 'user',
            timestamp: new Date()
        };

        // Add bot response
        const botMessage: Message = {
            id: messages.length + 2,
            text: reply.response,
            sender: 'bot',
            timestamp: new Date()
        };

        setMessages([...messages, userMessage, botMessage]);
    };

    const handleSendMessage = () => {
        if (!inputValue.trim()) return;

        // Add user message
        const userMessage: Message = {
            id: messages.length + 1,
            text: inputValue,
            sender: 'user',
            timestamp: new Date()
        };

        // Simple keyword matching for automated responses
        let botResponse = "Thank you for your message! For specific inquiries, please:\n\n📞 Call us: \n📧 Email: info.sunrayspreschool@gmail.com\n\nOr choose from the quick replies below to get instant answers!";

        const lowerInput = inputValue.toLowerCase();

        if (lowerInput.includes('program') || lowerInput.includes('class') || lowerInput.includes('course')) {
            botResponse = quickReplies[0].response;
        } else if (lowerInput.includes('fee') || lowerInput.includes('cost') || lowerInput.includes('price') || lowerInput.includes('payment')) {
            botResponse = quickReplies[1].response;
        } else if (lowerInput.includes('admission') || lowerInput.includes('enroll') || lowerInput.includes('apply')) {
            botResponse = quickReplies[2].response;
        } else if (lowerInput.includes('location') || lowerInput.includes('address') || lowerInput.includes('where')) {
            botResponse = quickReplies[3].response;
        } else if (lowerInput.includes('time') || lowerInput.includes('hour') || lowerInput.includes('schedule')) {
            botResponse = quickReplies[4].response;
        } else if (lowerInput.includes('teacher') || lowerInput.includes('staff') || lowerInput.includes('principal')) {
            botResponse = quickReplies[5].response;
        } else if (lowerInput.includes('facilit') || lowerInput.includes('classroom') || lowerInput.includes('infrastructure')) {
            botResponse = quickReplies[6].response;
        } else if (lowerInput.includes('contact') || lowerInput.includes('phone') || lowerInput.includes('email')) {
            botResponse = quickReplies[7].response;
        } else if (lowerInput.includes('hello') || lowerInput.includes('hi') || lowerInput.includes('hey')) {
            botResponse = "Hello! 👋 How can I help you today? Feel free to ask about our programs, admissions, fees, or anything else!";
        }

        const botMessage: Message = {
            id: messages.length + 2,
            text: botResponse,
            sender: 'bot',
            timestamp: new Date()
        };

        setMessages([...messages, userMessage, botMessage]);
        setInputValue('');
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <>
            {/* Chat Button */}
            {!isOpen && (
                <button
                    className={styles.chatButton}
                    onClick={() => setIsOpen(true)}
                    aria-label="Open chat"
                >
                    <MessageCircle size={28} />
                    <span className={styles.badge}>1</span>
                </button>
            )}

            {/* Chat Window */}
            {isOpen && (
                <div className={styles.chatWindow}>
                    {/* Header */}
                    <div className={styles.chatHeader}>
                        <div className={styles.headerContent}>
                            <div className={styles.botAvatar}>
                                <Bot size={24} />
                            </div>
                            <div>
                                <h3 className={styles.headerTitle}>Sunrays Assistant</h3>
                                <p className={styles.headerStatus}>
                                    <span className={styles.onlineDot}></span>
                                    Online
                                </p>
                            </div>
                        </div>
                        <button
                            className={styles.closeButton}
                            onClick={() => setIsOpen(false)}
                            aria-label="Close chat"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className={styles.messagesContainer}>
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`${styles.message} ${message.sender === 'user' ? styles.userMessage : styles.botMessage
                                    }`}
                            >
                                <div className={styles.messageAvatar}>
                                    {message.sender === 'bot' ? (
                                        <Bot size={20} />
                                    ) : (
                                        <User size={20} />
                                    )}
                                </div>
                                <div className={styles.messageContent}>
                                    <p className={styles.messageText}>{message.text}</p>
                                    <span className={styles.messageTime}>
                                        {message.timestamp.toLocaleTimeString('en-US', {
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </span>
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className={styles.inputContainer}>
                        <div className={styles.inputWrapper}>
                            <input
                                type="text"
                                className={styles.input}
                                placeholder="Type your message or choose a question..."
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyPress={handleKeyPress}
                            />
                            <button
                                className={styles.suggestionsButton}
                                onClick={() => setShowSuggestions(!showSuggestions)}
                                aria-label="Show quick questions"
                                type="button"
                            >
                                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10 3C6.13 3 3 6.13 3 10C3 13.87 6.13 17 10 17C13.87 17 17 13.87 17 10C17 6.13 13.87 3 10 3ZM10 15C7.24 15 5 12.76 5 10C5 7.24 7.24 5 10 5C12.76 5 15 7.24 15 10C15 12.76 12.76 15 10 15Z" fill="currentColor" />
                                    <path d="M10 11.5C10.8284 11.5 11.5 10.8284 11.5 10C11.5 9.17157 10.8284 8.5 10 8.5C9.17157 8.5 8.5 9.17157 8.5 10C8.5 10.8284 9.17157 11.5 10 11.5Z" fill="currentColor" />
                                </svg>
                                <span className={styles.suggestionsButtonText}>Quick Questions</span>
                            </button>

                            {/* Suggestions Dropdown */}
                            {showSuggestions && (
                                <div className={styles.suggestionsDropdown}>
                                    <div className={styles.suggestionsHeader}>Quick Questions</div>
                                    {quickReplies.map((reply, index) => (
                                        <button
                                            key={index}
                                            className={styles.suggestionItem}
                                            onClick={() => handleSuggestionClick(reply)}
                                        >
                                            {reply.text}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                        <button
                            className={styles.sendButton}
                            onClick={handleSendMessage}
                            disabled={!inputValue.trim()}
                            aria-label="Send message"
                        >
                            <Send size={20} />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
