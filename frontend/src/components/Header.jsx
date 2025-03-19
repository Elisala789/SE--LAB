import React from 'react';
import { Bell, Search, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const Header = ({ title, subtitle, className }) => {
  return (
    <header className={cn("py-6 flex flex-col md:flex-row md:items-center justify-between gap-4 animate-fade-in", className)}>
      <div>
        <div className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium bg-primary/10 text-primary mb-2">
          Admin Dashboard
        </div>
        <h1 className="text-2xl font-display font-semibold">{title}</h1>
        {subtitle && <p className="text-muted-foreground mt-1">{subtitle}</p>}
      </div>
      
      <div className="flex items-center gap-2 sm:gap-4">
        <div className="relative group max-w-xs">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-muted-foreground/70" />
          </div>
          <input 
            type="search" 
            placeholder="Search..." 
            className="py-2 pl-10 pr-4 w-full text-sm bg-secondary/50 border-0 rounded-full focus-ring" 
          />
        </div>
        
        <button className="relative p-2 rounded-full bg-secondary/50 hover:bg-secondary transition-colors focus-ring">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1.5 flex h-2 w-2 rounded-full bg-destructive"></span>
        </button>
        
        <button className="flex items-center gap-2 p-1 pl-1 pr-3 rounded-full bg-secondary/50 hover:bg-secondary transition-colors focus-ring">
          <div className="relative flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted">
            <User className="h-5 w-5 text-primary/70" />
          </div>
          <span className="text-sm font-medium hidden sm:inline-block">Admin</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
