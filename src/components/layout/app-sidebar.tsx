import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  LayoutDashboard,
  Users,
  Clock,
  Wallet,
  Calendar,
  BarChart3,
  Settings,
  ChevronLeft,
  Building2,
  User,
} from 'lucide-react';


interface NavItem {
  key: string;
  icon: any;
  href: string;
}

const navItems: NavItem[] = [
  { key: 'nav.dashboard', icon: LayoutDashboard, href: '/dashboard' },
  { key: 'Hr services', icon: User, href: '/company' },
  { key: 'nav.employees', icon: Users, href: '/employees' },
  { key: 'nav.attendance', icon: Clock, href: '/attendance' },
  { key: 'nav.payroll', icon: Wallet, href: '/payroll' },
  { key: 'nav.leaves', icon: Calendar, href: '/leaves' },
  { key: 'nav.reports', icon: BarChart3, href: '/reports' },
  { key: 'nav.settings', icon: Settings, href: '/settings' },
];

interface AppSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function AppSidebar({ isOpen, onToggle }: AppSidebarProps) {
  const { t } = useTranslation();
  const [activeItem, setActiveItem] = useState('/dashboard');

  return (
    <motion.aside
      initial={false}
      animate={{ width: isOpen ? 280 : 80 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="relative flex flex-col bg-card border-r border-border h-full"
    >
      <div className="flex items-center justify-between p-4 border-b border-border">
        <motion.div
          initial={false}
          animate={{ opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex items-center gap-2 text-white"
        >
          <Building2 className="h-8 w-8 text-primary" />
          {isOpen && (
            <div>
              <h1 className="text-xl font-bold text-foreground">AIHR4U</h1>
              <p className="text-xs text-muted-foreground">Advanced HRMS</p>
            </div>
          )}
        </motion.div>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="h-10 w-50"
        >
          <ChevronLeft 
            className={cn(
              "h-4 w-4 transition-transform duration-200",
              !isOpen && "rotate-180"
            )} 
          />
        </Button>
      </div>

      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.href;
            
            return (
              <motion.div
                key={item.key}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3 h-10 text-black",
                    !isOpen && "justify-center px-0",
                    isActive && "bg-primary/10 text-primary hover:bg-primary/15"
                  )}
                  onClick={() => setActiveItem(item.href)}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  <motion.span
                    initial={false}
                    animate={{ 
                      opacity: isOpen ? 1 : 0,
                      width: isOpen ? 'auto' : 0
                    }}
                    transition={{ duration: 0.2 }}
                    className="truncate"
                  >
                    {isOpen && t(item.key)}
                  </motion.span>
                </Button>
              </motion.div>
            );
          })}
        </nav>
      </ScrollArea>
    </motion.aside>
  );
}