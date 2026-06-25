import { Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Logo } from '../Logo/Logo';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Support",
      links: [
        { label: "Help Center", href: "#" },
        { label: "AirCover", href: "#" },
        { label: "Anti-discrimination", href: "#" },
        { label: "Disability support", href: "#" },
        { label: "Cancellation options", href: "#" },
        { label: "Report neighborhood concern", href: "#" },
      ]
    },
    {
      title: "Hosting",
      links: [
        { label: "Airbnb your home", href: "#" },
        { label: "AirCover for Hosts", href: "#" },
        { label: "Hosting resources", href: "#" },
        { label: "Community forum", href: "#" },
        { label: "Hosting responsibly", href: "#" },
        { label: "Airbnb-friendly apartments", href: "#" },
      ]
    },
    {
      title: "Community",
      links: [
        { label: "AI Travel Assistant", href: "/planner" },
        { label: "Experiences", href: "/experiences" },
        { label: "Gift cards", href: "#" },
        { label: "Airbnb.org disaster relief", href: "#" },
      ]
    },
    {
      title: "Company",
      links: [
        { label: "Newsroom", href: "#" },
        { label: "New features", href: "#" },
        { label: "Careers", href: "#" },
        { label: "Investors", href: "#" },
        { label: "Gift cards", href: "#" },
        { label: "Airbnb travels", href: "#" },
      ]
    }
  ];

  return (
    <footer className="w-full border-t border-zinc-200 bg-zinc-50 transition-colors duration-300 dark:border-zinc-800 dark:bg-zinc-955">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        
        {/* Links Grid */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 pb-12">
          {footerSections.map((section, idx) => (
            <div key={idx} className="flex flex-col gap-3">
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-105 uppercase tracking-wider">
                {section.title}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {section.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    {link.href.startsWith('/') ? (
                      <Link 
                        to={link.href} 
                        className="text-sm text-zinc-600 hover:text-primary dark:text-zinc-400 dark:hover:text-primary transition-colors"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className="text-sm text-zinc-600 hover:text-primary dark:text-zinc-400 dark:hover:text-primary transition-colors"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Separator */}
        <div className="border-t border-zinc-200 dark:border-zinc-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Logo & Copyright */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link to="/" className="flex items-center gap-1.5 font-bold text-zinc-855 dark:text-white">
              <Logo className="h-5 w-5" classNameText="font-extrabold text-sm text-primary" />
            </Link>
            <span className="hidden sm:inline text-zinc-300 dark:text-zinc-700">|</span>
            <p className="text-xs text-zinc-550 dark:text-zinc-450 text-center sm:text-left">
              &copy; {currentYear} Airbnb, Inc. • Stays • Experiences • Site Map
            </p>
          </div>

          {/* Settings & Socials */}
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2 text-xs text-zinc-650 dark:text-zinc-355 hover:underline cursor-pointer">
              <Globe className="h-4 w-4" />
              <span>English (IN)</span>
              <span className="font-semibold">₹ INR</span>
            </div>

            <div className="flex items-center gap-4 text-zinc-500 dark:text-zinc-400">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noreferrer" 
                className="hover:text-primary transition-colors"
                aria-label="GitHub Page"
              >
                <svg className="h-4.5 w-4.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noreferrer" 
                className="hover:text-primary transition-colors"
                aria-label="Twitter Page"
              >
                <svg className="h-4.5 w-4.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer" 
                className="hover:text-primary transition-colors"
                aria-label="Instagram Page"
              >
                <svg className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer" 
                className="hover:text-primary transition-colors"
                aria-label="LinkedIn Page"
              >
                <svg className="h-4.5 w-4.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};
