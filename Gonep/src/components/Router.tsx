import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import {
  useState,
  useEffect,
  createContext,
  useContext,
} from "react";
import { HelmetProvider } from "react-helmet-async";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { PageTransition } from "./PageTransition";
import { NewsletterPopup } from "./NewsletterPopup";
import { SchemaMarkup } from "./SchemaMarkup";
import { Breadcrumbs } from "./Breadcrumbs";
import { NotificationBanner } from "./NotificationBanner";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { WhoWeArePage } from "./pages/WhoWeArePage";
import { HistoryPage } from "./pages/HistoryPage";
import { MeetTheTeamPage } from "./pages/MeetTheTeamPage";
import { ProductPage } from "./pages/ProductPage";
import { SolutionsPage } from "./pages/SolutionsPage";
import { MediaPage } from "./pages/MediaPage";
import { BlogsPage } from "./pages/BlogsPage";
import { BlogDetailPage } from "./pages/BlogDetailPage";
import { BMICalculatorPage } from "./pages/BMICalculatorPage";
import { DietRecommendationPage } from "./pages/DietRecommendationPage";
import { ContactPage } from "./pages/ContactPage";
import { SupportPage } from "./pages/SupportPage";
import { CareersPage } from "./pages/CareersPage";
import { JobDetailPage } from "./pages/JobDetailPage";
import { PrivacyPolicyPage } from "./pages/PrivacyPolicyPage";
import { TermsOfServicePage } from "./pages/TermsOfServicePage";
import { CookiePolicyPage } from "./pages/CookiePolicyPage";
import { SitemapPage } from "./pages/SitemapPage";

// Theme Context
type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<
  ThemeContextType | undefined
>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error(
      "useTheme must be used within a ThemeProvider",
    );
  }
  return context;
};

function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check if user has a saved preference
    const saved = localStorage.getItem("gonep-theme");
    if (saved && (saved === "light" || saved === "dark")) {
      return saved;
    }
    // Check system preference
    return window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";
  });

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("gonep-theme", newTheme);
  };

  useEffect(() => {
    // Apply theme to document
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Component to handle scroll to top on route change
function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return null;
}

export function Router() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <BrowserRouter>
          <ScrollToTop />
          {/* Global Organization Schema */}
          <SchemaMarkup type="organization" />
          <div className="min-h-screen bg-background">
            <Header />
            <NotificationBanner />
            <Breadcrumbs />
            <main className="min-h-[calc(100vh-140px)]">
              <PageTransition>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/about/who-we-are" element={<WhoWeArePage />} />
                  <Route path="/about/history" element={<HistoryPage />} />
                  <Route path="/about/meet-the-team" element={<MeetTheTeamPage />} />
                  <Route path="/careers" element={<CareersPage />} />
                  <Route path="/careers/:jobId" element={<JobDetailPage />} />
                  <Route
                    path="/clinic-at-hand"
                    element={<ProductPage />}
                  />
                  <Route
                    path="/solutions"
                    element={<SolutionsPage />}
                  />
                  <Route path="/blogs" element={<BlogsPage />} />
                  <Route path="/blogs/:blogId" element={<BlogDetailPage />} />
                  <Route
                    path="/media"
                    element={<MediaPage />}
                  />
                  <Route
                    path="/health-tools/bmi-calculator"
                    element={<BMICalculatorPage />}
                  />
                  <Route
                    path="/health-tools/diet-recommendation"
                    element={<DietRecommendationPage />}
                  />
                  <Route
                    path="/contact"
                    element={<ContactPage />}
                  />
                  <Route
                    path="/support"
                    element={<SupportPage />}
                  />
                  <Route
                    path="/privacy-policy"
                    element={<PrivacyPolicyPage />}
                  />
                  <Route
                    path="/terms-of-service"
                    element={<TermsOfServicePage />}
                  />
                  <Route
                    path="/cookie-policy"
                    element={<CookiePolicyPage />}
                  />
                  <Route
                    path="/sitemap"
                    element={<SitemapPage />}
                  />
                  {/* Redirect old routes */}
                  <Route
                    path="/product"
                    element={
                      <Navigate to="/clinic-at-hand" replace />
                    }
                  />
                  <Route
                    path="/health-tools"
                    element={
                      <Navigate
                        to="/health-tools/bmi-calculator"
                        replace
                      />
                    }
                  />
                  {/* Handle preview_page.html and other unknown routes */}
                  <Route
                    path="/preview_page.html"
                    element={<Navigate to="/" replace />}
                  />
                  <Route
                    path="*"
                    element={<Navigate to="/" replace />}
                  />
                </Routes>
              </PageTransition>
            </main>
            <Footer />
            <NewsletterPopup />
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </HelmetProvider>
  );
}