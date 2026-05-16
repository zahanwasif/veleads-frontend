'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
  Menu,
  X
} from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { BookDemoButton } from './BookDemoButton';
export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  // const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);



  // const productItems = [
  // {
  //   icon: Search,
  //   title: 'Find & Enrich Leads',
  //   desc: 'Discover and enrich prospects matching your ICP'
  // },
  // {
  //   icon: CheckCircle,
  //   title: 'Qualify & Research',
  //   desc: 'Score leads and gather context automatically'
  // },
  // {
  //   icon: GitBranch,
  //   title: 'Workflow Builder',
  //   desc: 'Build multi-channel sequences with conditional logic'
  // },
  // {
  //   icon: Target,
  //   title: 'Opportunity Detection',
  //   desc: 'Track engagement and flag hot leads automatically'
  // },
  // {
  //   icon: Clock,
  //   title: 'Nurture Sequences',
  //   desc: 'Re-engage cold leads when the time is right'
  // }];

  // const solutionItems = [
  // {
  //   icon: User,
  //   title: 'For SDRs',
  //   desc: 'Automate your entire outreach without switching tools'
  // },
  // {
  //   icon: Users,
  //   title: 'For Sales Teams',
  //   desc: 'Run coordinated multi-channel campaigns at scale'
  // },
  // {
  //   icon: Briefcase,
  //   title: 'For Founders',
  //   desc: 'Build pipeline without hiring a full sales team'
  // },
  // {
  //   icon: BarChart2,
  //   title: 'For Sales Managers',
  //   desc: 'Full visibility of every lead across every channel'
  // }];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${scrolled ? 'bg-[#F9F9F7] border-b border-[#E5E5E5]' : 'bg-[#F9F9F7] border-b border-transparent'}`}>
      
      <div className="max-w-[1200px] mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-xl font-bold tracking-tight text-[#0F0F0F]">
            <Image 
              src="/logo.png"
              alt="VeLeads"
              width={100}
              height={100}
            />
          </span>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          {/* Product Dropdown */}
          {/* <div
            className="relative py-8"
            onMouseEnter={() => setActiveDropdown('product')}
            onMouseLeave={() => setActiveDropdown(null)}>
            
            <button className="text-sm text-[#6B6B6B] hover:text-[#0F0F0F] transition-colors font-medium">
              Product
            </button>
            <AnimatePresence>
              {activeDropdown === 'product' &&
              <motion.div
                initial={{
                  opacity: 0,
                  y: 10
                }}
                animate={{
                  opacity: 1,
                  y: 0
                }}
                exit={{
                  opacity: 0,
                  y: 10
                }}
                transition={{
                  duration: 0.2,
                  ease: 'easeOut'
                }}
                className="absolute top-full left-1/2 -translate-x-1/2 w-[400px] bg-white border border-[#E5E5E5] rounded-xl shadow-[0px_8px_32px_rgba(0,0,0,0.08)] p-2">
                
                  {productItems.map((item, i) =>
                <div
                  key={i}
                  className="flex items-start p-3 rounded-lg hover:bg-[#F9F9F7] transition-colors duration-100 cursor-pointer group">
                  
                      <item.icon className="w-5 h-5 text-[#0F0F0F] mt-0.5 mr-4 shrink-0 stroke-[1.5]" />
                      <div>
                        <h4 className="text-sm font-bold text-[#0F0F0F] mb-0.5">
                          {item.title}
                        </h4>
                        <p className="text-xs text-[#6B6B6B] leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                )}
                </motion.div>
              }
            </AnimatePresence>
          </div>


          <div
            className="relative py-8"
            onMouseEnter={() => setActiveDropdown('solutions')}
            onMouseLeave={() => setActiveDropdown(null)}>
            
            <button className="text-sm text-[#6B6B6B] hover:text-[#0F0F0F] transition-colors font-medium">
              Solutions
            </button>
            <AnimatePresence>
              {activeDropdown === 'solutions' &&
              <motion.div
                initial={{
                  opacity: 0,
                  y: 10
                }}
                animate={{
                  opacity: 1,
                  y: 0
                }}
                exit={{
                  opacity: 0,
                  y: 10
                }}
                transition={{
                  duration: 0.2,
                  ease: 'easeOut'
                }}
                className="absolute top-full left-1/2 -translate-x-1/2 w-[400px] bg-white border border-[#E5E5E5] rounded-xl shadow-[0px_8px_32px_rgba(0,0,0,0.08)] p-2">
                
                  {solutionItems.map((item, i) =>
                <div
                  key={i}
                  className="flex items-start p-3 rounded-lg hover:bg-[#F9F9F7] transition-colors duration-100 cursor-pointer group">
                  
                      <item.icon className="w-5 h-5 text-[#0F0F0F] mt-0.5 mr-4 shrink-0 stroke-[1.5]" />
                      <div>
                        <h4 className="text-sm font-bold text-[#0F0F0F] mb-0.5">
                          {item.title}
                        </h4>
                        <p className="text-xs text-[#6B6B6B] leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                )}
                </motion.div>
              }
            </AnimatePresence>
          </div> */}

          <a
            href="#product"
            className="text-sm text-[#6B6B6B] hover:text-[#0F0F0F] transition-colors font-medium">
            Product
          </a>

          <a
            href="#solutions"
            className="text-sm text-[#6B6B6B] hover:text-[#0F0F0F] transition-colors font-medium">
          Solutions
          </a>
          
          <a
            href="#how-it-works"
            className="text-sm text-[#6B6B6B] hover:text-[#0F0F0F] transition-colors font-medium">
            
            How it Works
          </a>
        </nav>

        <div className="hidden md:flex items-center">
          <BookDemoButton variant="dark" className="w-full sm:w-auto px-5 py-2.5 text-sm font-medium" />
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-[#0F0F0F]"
          onClick={() => setMobileMenuOpen(true)}>
          
          <Menu className="w-6 h-6 stroke-[1.5]" />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen &&
        <motion.div
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          exit={{
            opacity: 0
          }}
          className="fixed inset-0 bg-white z-[100] flex flex-col">
          
            <div className="h-20 px-6 flex items-center justify-between border-b border-[#E5E5E5]">
              <span className="text-xl font-bold tracking-tight text-[#0F0F0F]">
                <Image 
                  src="/logo.png"
                  alt="VeLeads"
                  width={100}
                  height={100}
                />
              </span>
              <button
              className="p-2 text-[#0F0F0F]"
              onClick={() => setMobileMenuOpen(false)}>
              
                <X className="w-6 h-6 stroke-[1.5]" />
              </button>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center space-y-8 p-6">
              <a
              href="#product"
              onClick={() => setMobileMenuOpen(false)}
              className="text-2xl font-bold text-[#0F0F0F]">
              
                Product
              </a>
              <a
              href="#solutions"
              onClick={() => setMobileMenuOpen(false)}
              className="text-2xl font-bold text-[#0F0F0F]">
              
                Solutions
              </a>
              <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="text-2xl font-bold text-[#0F0F0F]">
              
                How it Works
              </a>
            </div>
            <div className="p-6 border-t border-[#E5E5E5]">
              <button className="w-full bg-[#0F0F0F] text-white text-lg font-medium px-5 py-4 rounded-lg hover:bg-[#333333] transition-colors">
                Get Early Access
              </button>
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </header>);

}