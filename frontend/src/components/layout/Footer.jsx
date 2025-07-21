import { Link } from 'react-router-dom';
import { FiGithub, FiTwitter, FiLinkedin } from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white py-6 mt-auto relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      <div className="absolute inset-0 bg-gradient-radial from-blue-500/20 to-transparent"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2  gap-16">
          {/* About Us */}
          <div>
            <h3 className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-4 tracking-wide">About Us</h3>
            <p className="text-gray-300">
              We are dedicated to providing quality education through our online learning platform.
             
            </p>
            <p> Team - Ahmad, Hema, China</p>
          </div>

          {/* Quick Links */}
          {/* <div>
            <h3 className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-4 tracking-wide">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/classes" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Classes
                </Link>
              </li>
              <li>
                <Link to="/discussions" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Discussions
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Profile
                </Link>
              </li>
            </ul>
          </div> */}

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-4 tracking-wide">Contact</h3>
            <p className="text-gray-300">
              Email: 2023pgcsca085@nitjsr.ac.in<br />
              Phone: 9812408611
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="https://github.com/ahmad-kaif" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-400 transition-colors">
                <FiGithub className="h-6 w-6" />
              </a>
              <a href="https://twitter.com/ahmadkaifansari" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-400 transition-colors">
                <FiTwitter className="h-6 w-6" />
              </a>
              <a href="https://www.linkedin.com/in/ahmadkaif/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-400 transition-colors">
                <FiLinkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/10">
          <p className="text-center text-gray-300">
            © {currentYear} SkillWise. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;