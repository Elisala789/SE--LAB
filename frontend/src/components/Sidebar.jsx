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
  
};

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleCollapsed = () => setCollapsed(!collapsed);
  const toggleMobile = () => setMobileOpen(!mobileOpen);
  const closeMobile = () => setMobileOpen(false);

  return (
   <div></div>
  )
};

export default Sidebar;
