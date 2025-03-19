import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  ChevronLeft, 
  ChevronRight, 
  LayoutDashboard, 
  Users, 
  BarChart3, 
  Settings,
  Menu,
  X
} from 'lucide-react';

const NavItem = ({ to, label, icon, collapsed, onClick }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        sidebar-item group ${isActive ? 'sidebar-item-active' : ''} ${collapsed ? 'justify-center px-3' : ''}
      }
      onClick={onClick}
    >
      <span className="flex-shrink-0 w-5 h-5">{icon}</span>
      {!collapsed && <span className="text-sm font-medium transition-opacity">{label}</span>}
      {collapsed && (
        <div className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground rounded-md shadow-md text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          {label}
        </div>
      )}
    </NavLink>
  );
};

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleCollapsed = () => setCollapsed(!collapsed);
  const toggleMobile = () => setMobileOpen(!mobileOpen);
  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <button 
        onClick={toggleMobile} 
        className="fixed top-4 left-4 z-50 p-2 rounded-md bg-background/80 backdrop-blur-sm shadow-subtle"
        aria-label="Toggle mobile menu"
      >
        <Menu size={20} />
      </button>
      
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 animate-fade-in"
          onClick={closeMobile} 
        />
      )}
      
      <aside 
        className={fixed inset-y-0 left-0 z-50 w-64 bg-sidebar subtle-border-r flex flex-col transition-transform duration-300 ${mobileOpen ? 'translate-x-0 animate-slide-in-left' : '-translate-x-full'}}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-sidebar-border">
          <span className="text-lg font-semibold">Admin Dashboard</span>
          <button onClick={toggleMobile} className="p-1 rounded-md hover:bg-sidebar-accent">
            <X size={18} />
          </button>
        </div>
        
        <div className="flex-1 py-4 space-y-1 overflow-y-auto px-2">
          <NavItem to="/" label="Dashboard" icon={<LayoutDashboard className="w-5 h-5" />} collapsed={false} onClick={closeMobile} />
          <NavItem to="/users" label="Users" icon={<Users className="w-5 h-5" />} collapsed={false} onClick={closeMobile} />
          <NavItem to="/analytics" label="Analytics" icon={<BarChart3 className="w-5 h-5" />} collapsed={false} onClick={closeMobile} />
          <NavItem to="/settings" label="Settings" icon={<Settings className="w-5 h-5" />} collapsed={false} onClick={closeMobile} />
        </div>
      </aside>
      
      <aside className={sticky top-0 h-screen transition-all duration-300 bg-sidebar subtle-border-r max-h-screen flex flex-col py-4 ${collapsed ? 'w-16' : 'w-64'}}>
        <div className={mb-6 px-4 flex items-center transition-opacity ${collapsed ? 'justify-center' : ''}}>
          {!collapsed ? <span className="text-lg font-semibold animate-fade-in">Admin Dashboard</span> : <span className="text-xl font-bold">A</span>}
        </div>
        
        <div className="flex-1 px-2 space-y-1 overflow-y-auto">
          <NavItem to="/" label="Dashboard" icon={<LayoutDashboard className="w-5 h-5" />} collapsed={collapsed} />
          <NavItem to="/users" label="Users" icon={<Users className="w-5 h-5" />} collapsed={collapsed} />
          <NavItem to="/analytics" label="Analytics" icon={<BarChart3 className="w-5 h-5" />} collapsed={collapsed} />
          <NavItem to="/settings" label="Settings" icon={<Settings className="w-5 h-5" />} collapsed={collapsed} />
        </div>
        
        <button 
          onClick={toggleCollapsed} 
          className="mt-6 mx-auto p-2 rounded-full bg-sidebar-accent/50 hover:bg-sidebar-accent transition-colors"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </aside>
    </>
  );
};

export default Sidebar;
