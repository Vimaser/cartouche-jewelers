import React, { useEffect, useState } from "react";
import loadingGif from "./img/CARMOUCHE.gif";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import { app } from "./firebase";
import "./App.css";
import {
  Home,
  Header,
  About,
  Contact,
  Admin,
  Login,
  Banner,
  AdminPage,
  ProductPage,
  Explore
} from "./components";
import { EventsProvider } from "./components/contexts/EventsContext";
import { MusicProvider } from "./components/contexts/MusicContext";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const AppContent = () => {
  // const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [messages, setMessages] = useState([]);
  const auth = getAuth();
  const db = getFirestore(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });

    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    const messagesCollection = collection(db, "Messages");
    const unsubscribe = onSnapshot(messagesCollection, (snapshot) => {
      const newMessages = snapshot.docs
        .map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
        .filter((message) => message.isNew);
      setMessages(newMessages);
    });

    return () => unsubscribe();
  }, [db]);

  return (
    <>
      
      <Header hasNewMessages={messages.some((message) => message.isNew)} />
      <Banner />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Explore" element={<Explore />} />
        <Route path="/about" element={<About />} />
        <Route path="/product/:productId" element={<ProductPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            isAuthenticated ? (
              <Admin messages={messages} setMessages={setMessages} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/adminpage"
          element={
            isAuthenticated ? (
              <AdminPage messages={messages} setMessages={setMessages} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </>
  );
};

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="loading-container">
        <img src={loadingGif} alt="Loading..." />
      </div>
    );
  }

  return (
    <Router>
      <EventsProvider>
        <MusicProvider>
          <AppContent />
        </MusicProvider>
      </EventsProvider>
    </Router>
  );
};

export default App;
