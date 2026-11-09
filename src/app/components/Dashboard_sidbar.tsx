'use client';

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useSession, authClient } from "@/lib/auth-client";
import { 
  LayoutDashboard, 
  Users, 
  Building2, 
  Briefcase, 
  CreditCard, 
  Settings, 
  Bookmark, 
  FileText,
  LogOut,
  Sparkles,
  Plus,
  LucideIcon
} from "lucide-react";
import logo from "@/app/images/logo.png";

type Role = 'admin' | 'recruiter' | 'seeker';

interface MenuItem {
  id: string;
  name: string;
  url: string;
  icon: LucideIcon;
}

const menuItems: Record<Role, MenuItem[]> = {
  admin: [
    { id: '1', name: 'Dashboard', url: '/dashboard/admin', icon: LayoutDashboard },
    { id: '2', name: 'Users', url: '/dashboard/admin/users', icon: Users },
    { id: '3', name: 'Companies', url: '/dashboard/admin/companies', icon: Building2 },
    { id: '4', name: 'Jobs', url: '/dashboard/admin/jobs', icon: Briefcase },
    { id: '5', name: 'Payments', url: '/dashboard/admin/payments', icon: CreditCard },
    { id: '6', name: 'Settings', url: '/dashboard/admin/settings', icon: Settings },
  ],
  recruiter: [
    { id: '1', name: 'Dashboard', url: '/dashboard/recruiter', icon: LayoutDashboard },
    { id: '2', name: 'Manage Jobs', url: '/dashboard/recruiter/jobs/manage-jobs', icon: Briefcase },
    { id: '3', name: 'Add Job', url: '/dashboard/recruiter/jobs/added-job', icon: Plus },
    { id: '4', name: 'Applications', url: '/dashboard/recruiter/applications', icon: FileText },
    { id: '5', name: 'Settings', url: '/dashboard/recruiter/settings', icon: Settings },
  ],
  seeker: [
    { id: '1', name: 'Dashboard', url: '/dashboard/seeker', icon: LayoutDashboard },
    { id: '2', name: 'Jobs', url: '/dashboard/seeker/jobs', icon: Briefcase },
    { id: '3', name: 'Saved Jobs', url: '/dashboard/seeker/saved-jobs', icon: Bookmark },
    { id: '4', name: 'Applications', url: '/dashboard/seeker/applications', icon: FileText },
    { id: '5', name: 'Billing', url: '/dashboard/seeker/billing', icon: CreditCard },
    { id: '6', name: 'Settings', url: '/dashboard/seeker/settings', icon: Settings },
  ],
};

export function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  
  const user = session?.user;
  const rawRole = (user as { role?: string } | undefined)?.role || 'seeker';
  const role: Role = (rawRole in menuItems ? rawRole : 'seeker') as Role;

  const currentMenuItems = menuItems[role];

  const handleSignOut = async () => {
    await authClient.signOut();
    router.refresh();
    window.location.href = '/';
  };

  return (
    <Sidebar className="border-r border-white/[0.05] !bg-[#050505] text-white">
      <div className="flex flex-col h-full bg-[#050505] relative overflow-hidden">
        
        {/* Premium Ambient Background Glow */}
        <div className="absolute -top-20 -left-20 w-56 h-56 bg-[#6558ff] opacity-15 blur-[80px] pointer-events-none rounded-full" />

        {/* Header Section */}
        <SidebarHeader className="px-6 pt-8 pb-6 border-b border-white/[0.04] relative z-10">
          <Link href="/" className="inline-block w-fit">
            <Image 
              src={logo} 
              alt="HireLoop" 
              width={124} 
              height={36} 
              className="object-contain drop-shadow-[0_0_15px_rgba(101,88,255,0.2)] hover:scale-105 transition-transform duration-300" 
              priority
            />
          </Link>
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#6558ff] mt-2 block opacity-80">
            {role === 'admin' ? 'Admin Console' : role === 'recruiter' ? 'Recruiter Suite' : 'Seeker Portal'}
          </span>
        </SidebarHeader>

        <SidebarContent className="px-3 py-5 flex-1 relative z-10">
          
          {/* Glowing Profile Card */}
          <div className="mx-2 mb-8 p-3 rounded-2xl bg-gradient-to-br from-white/[0.06] to-transparent border border-white/[0.06] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] flex items-center gap-3.5 group hover:border-[#6558ff]/30 transition-all duration-300 cursor-default relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#6558ff]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="relative shrink-0 z-10">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#6558ff] to-[#a39eff] p-[2px] shadow-[0_0_20px_rgba(101,88,255,0.25)] group-hover:shadow-[0_0_25px_rgba(101,88,255,0.4)] transition-all">
                <div className="w-full h-full rounded-full bg-[#0a0a0a] flex items-center justify-center text-white font-bold text-sm overflow-hidden">
                  {user?.image ? (
                    <img src={user.image} alt={user.name || "User"} className="w-full h-full object-cover" />
                  ) : (
                    user?.name?.charAt(0).toUpperCase() || 'U'
                  )}
                </div>
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-[#050505] rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
            </div>

            <div className="overflow-hidden flex-1 z-10">
              <h4 className="text-[15px] font-semibold text-gray-100 truncate group-hover:text-white transition-colors">
                {user?.name || 'Saiful Alam'}
              </h4>
              <p className="text-[11px] text-gray-400 capitalize truncate mt-0.5">
                {role === 'seeker' ? 'Professional Tier' : role}
              </p>
              
              {role !== 'seeker' && (
                <div className="mt-1.5">
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-[#6558ff]/10 text-[#a39eff] rounded-md border border-[#6558ff]/20">
                    <Sparkles className="w-2.5 h-2.5" />
                    {role === 'recruiter' ? 'Premium' : 'Super Admin'}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Navigation Links */}
          <SidebarGroup className="p-0">
            <SidebarMenu className="space-y-2">
              {currentMenuItems.map((item) => {
                const IconComponent = item.icon;
                
                // Perfect matching: Exact for dashboard home, startsWith for sub-routes
                const isExactRoot = item.url === `/dashboard/${role}`;
                const isActive = isExactRoot 
                  ? pathname === item.url 
                  : pathname === item.url || pathname.startsWith(`${item.url}/`);

                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton 
                      asChild
                      isActive={isActive}
                      className={`relative group flex items-center gap-3.5 px-4 py-3.5 h-[46px] rounded-xl font-medium transition-all duration-300 overflow-hidden ${
                        isActive 
                          ? "bg-gradient-to-r from-[#6558ff]/15 via-white/[0.04] to-transparent text-white border border-white/[0.03] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]" 
                          : "text-gray-400 hover:text-gray-200 hover:bg-white/[0.03]"
                      }`}
                    >
                      <Link href={item.url}>
                        {/* Smooth Animated Left Accent Line */}
                        <div 
                          className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 rounded-r-full transition-all duration-300 ${
                            isActive ? "h-[70%] bg-[#6558ff] shadow-[0_0_12px_#6558ff]" : "h-0 bg-transparent"
                          }`} 
                        />
                        
                        <IconComponent 
                          className={`w-[18px] h-[18px] transition-all duration-300 ${
                            isActive 
                              ? "text-[#867dfa] drop-shadow-[0_0_8px_rgba(134,125,250,0.5)] scale-110" 
                              : "text-gray-500 group-hover:text-gray-300 group-hover:scale-110"
                          }`} 
                        />
                        <span className="text-sm tracking-wide">{item.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>

        {/* Footer Area */}
        <SidebarFooter className="p-4 border-t border-white/[0.04] relative z-10 bg-[#050505]">
          <button
            onClick={handleSignOut}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-[13px] font-medium text-gray-400 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all duration-300 group"
          >
            <span>Sign out workspace</span>
            <LogOut className="w-4 h-4 text-gray-500 group-hover:text-red-400 group-hover:translate-x-1 transition-all duration-300" />
          </button>
        </SidebarFooter>

      </div>
    </Sidebar>
  );
}