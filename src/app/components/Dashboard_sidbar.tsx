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
    { id: '3', name: 'Applications', url: '/dashboard/recruiter/applications', icon: FileText },
    { id: '4', name: 'Settings', url: '/dashboard/recruiter/settings', icon: Settings },
    { id: '5', name: 'Add Job', url: '/dashboard/recruiter/jobs/added-job', icon: Settings },
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
    <Sidebar className="border-r border-white/[0.07] !bg-[#050505] text-white">
      {/* Inner container to force #050505 background over shadcn default variables */}
      <div className="flex flex-col h-full bg-[#050505] relative overflow-hidden">
        
        {/* Subtle Ambient Top Glow */}
        <div className="absolute -top-12 -left-12 w-44 h-44 bg-[#6558ff] opacity-10 blur-3xl pointer-events-none" />

        {/* Header with Logo & Role Subtitle */}
        <SidebarHeader className="px-6 pt-7 pb-5 border-b border-white/[0.06] relative z-10">
          <Link href="/" className="inline-block w-fit">
            <Image 
              src={logo} 
              alt="HireLoop" 
              width={120} 
              height={34} 
              className="object-contain drop-shadow-[0_2px_10px_rgba(101,88,255,0.2)]" 
            />
          </Link>
          <span className="text-[11px] font-medium tracking-wider uppercase text-gray-500 mt-1.5 block">
            {role === 'admin' ? 'Admin Console' : role === 'recruiter' ? 'Recruiter Workspace' : 'Seeker Portal'}
          </span>
        </SidebarHeader>

        <SidebarContent className="px-3 py-5 flex-1 relative z-10">
          
          {/* Premium User Profile Card (Shown for Seeker & Recruiter, or Admin) */}
          <div className="mx-1 mb-6 p-3.5 rounded-2xl bg-gradient-to-b from-white/[0.05] to-white/[0.02] border border-white/[0.08] shadow-inner flex items-center gap-3.5 group hover:border-white/[0.15] transition-all duration-300">
            <div className="relative shrink-0">
              <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#6558ff] to-[#9b92ff] p-[2px] shadow-[0_0_15px_rgba(101,88,255,0.3)]">
                <div className="w-full h-full rounded-full bg-[#0a0a0a] flex items-center justify-center text-white font-semibold text-sm overflow-hidden">
                  {user?.image ? (
                    <img src={user.image} alt={user.name || "User"} className="w-full h-full object-cover" />
                  ) : (
                    user?.name?.charAt(0).toUpperCase() || 'U'
                  )}
                </div>
              </div>
              {/* Online Status Dot */}
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-[#050505] rounded-full" />
            </div>

            <div className="overflow-hidden flex-1">
              <h4 className="text-sm font-semibold text-gray-100 truncate">
                {user?.name || (role === 'seeker' ? 'Seeker Portal' : 'Alex Sterling')}
              </h4>
              <p className="text-xs text-gray-400 capitalize truncate">
                {role === 'seeker' ? 'Professional Tier' : role}
              </p>
              
              {role !== 'seeker' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 mt-1.5 text-[10px] font-medium bg-[#6558ff]/15 text-[#9b92ff] rounded-full border border-[#6558ff]/30">
                  <Sparkles className="w-2.5 h-2.5" />
                  {role === 'recruiter' ? 'Premium account' : 'Super Admin'}
                </span>
              )}
            </div>
          </div>

          {/* Navigation Menu */}
          <SidebarGroup className="p-0">
            <SidebarMenu className="space-y-1.5">
              {currentMenuItems.map((item) => {
                const IconComponent = item.icon;
                // Check exact match for root dashboard paths, or startsWith for sub-routes
                const isRootRolePath = item.url === `/${role}`;
                const isActive = isRootRolePath 
                  ? pathname === item.url 
                  : pathname.startsWith(item.url);

                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton 
                      asChild
                      isActive={isActive}
                      className={`relative group flex items-center gap-3.5 px-4 py-3 h-11 rounded-xl font-medium transition-all duration-200 overflow-hidden ${
                        isActive 
                          ? "bg-gradient-to-r from-[#6558ff]/20 via-white/[0.06] to-transparent text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]" 
                          : "text-gray-400 hover:text-gray-200 hover:bg-white/[0.04]"
                      }`}
                    >
                      <Link href={item.url}>
                        {/* Figma Left Active Bar Indicator */}
                        {isActive && (
                          <span className="absolute left-0 top-2 bottom-2 w-1 bg-[#6558ff] rounded-r-full shadow-[0_0_12px_#6558ff]" />
                        )}
                        
                        <IconComponent 
                          className={`w-[18px] h-[18px] transition-colors duration-200 ${
                            isActive 
                              ? "text-[#867dfa]" 
                              : "text-gray-500 group-hover:text-gray-300"
                          }`} 
                        />
                        <span className="text-[14px] tracking-tight">{item.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>

        {/* Footer with Quick Logout */}
        <SidebarFooter className="p-4 border-t border-white/[0.06] relative z-10">
          <button
            onClick={handleSignOut}
            className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-medium text-gray-400 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all duration-200 group"
          >
            <span>Sign out of workspace</span>
            <LogOut className="w-4 h-4 text-gray-500 group-hover:text-red-400 group-hover:translate-x-0.5 transition-all" />
          </button>
        </SidebarFooter>

      </div>
    </Sidebar>
  );
}