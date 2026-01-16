import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import Chatbot from "@/components/Chatbot/Chatbot";
import EventPopup from "@/components/EventPopup/EventPopup";

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <ScrollToTop />
            <Header />
            <main>{children}</main>
            <Footer />
            <Chatbot />
            <EventPopup />
        </>
    );
}
