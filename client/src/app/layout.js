import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import './globals.css';  // Ensure Tailwind is imported globally
import useAuthStore from './stores/useAuthStore';



const Layout = ({ children }) => {

  
  return (
    <html lang="en">
      <head>
        {/* You can add meta tags or other head-related elements here */}
      </head>
      <body>
        <Toaster />
        <Navbar />
        
        <main>{children}</main>
      </body>
    </html>
  );
};

export default Layout;
