"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Calendar,
  Users,
  Building2,
  FileText,
  Settings,
  ChevronDown,
  ChevronRight,
  Heart,
  UserCircle,
  Stethoscope,
  ClipboardList,
  CreditCard,
  Bell,
  HelpCircle,
} from "lucide-react";

interface NavItem {
  label: string;
  href?: string;
  icon: React.ElementType;
  children?: NavItem[];
}

const adminNav: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  {
    label: "Management",
    icon: Building2,
    children: [
      { label: "Departments", href: "/dashboard/departments", icon: Building2 },
      { label: "Staff", href: "/dashboard/staff", icon: Users },
      { label: "Doctors", href: "/dashboard/doctors", icon: Stethoscope },
    ],
  },
  {
    label: "Clinical",
    icon: ClipboardList,
    children: [
      { label: "Appointments", href: "/dashboard/appointments", icon: Calendar },
      { label: "Patients", href: "/dashboard/patients", icon: Users },
      { label: "Records", href: "/dashboard/records", icon: FileText },
    ],
  },
  { label: "Billing", href: "/dashboard/billing", icon: CreditCard },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

const doctorNav: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "My Appointments", href: "/dashboard/appointments", icon: Calendar },
  { label: "Patients", href: "/dashboard/patients", icon: Users },
  { label: "Schedule", href: "/dashboard/schedule", icon: ClipboardList },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

const patientNav: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "My Appointments", href: "/dashboard/appointments", icon: Calendar },
  { label: "Medical Records", href: "/dashboard/records", icon: FileText },
  { label: "Billing", href: "/dashboard/billing", icon: CreditCard },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function Sidebar({ role = "patient" }: { role?: string }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const navItems = role === "admin" ? adminNav : role === "doctor" ? doctorNav : patientNav;

  const toggleSection = (label: string) => {
    setOpenSections((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const isActive = (href?: string) => href && pathname === href;

  return (
    <aside
      className={`bg-white border-r border-gray-200 h-screen sticky top-0 flex flex-col transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      {/* User info */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-rose-100 rounded-full flex items-center justify-center shrink-0">
            <UserCircle className="w-5 h-5 text-rose-600" />
          </div>
          {!collapsed && (
            <div className="overflow-hidden">
              <p className="text-sm font-semibold text-gray-900 truncate">Dr. Sarah Wilson</p>
              <p className="text-xs text-gray-500 capitalize">{role}</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-3 px-2">
        {navItems.map((item) => (
          <div key={item.label} className="mb-1">
            {item.children ? (
              <>
                <button
                  onClick={() => toggleSection(item.label)}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <item.icon className="w-4 h-4 shrink-0" />
                  {!collapsed && (
                    <>
                      <span className="flex-1 text-left">{item.label}</span>
                      {openSections[item.label] ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </>
                  )}
                </button>
                {openSections[item.label] && !collapsed && (
                  <div className="ml-4 mt-1 space-y-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href!}
                        className={`flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors ${
                          isActive(child.href)
                            ? "bg-rose-50 text-rose-600 font-medium"
                            : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                        }`}
                      >
                        <child.icon className="w-4 h-4" />
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <Link
                href={item.href!}
                className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isActive(item.href)
                    ? "bg-rose-50 text-rose-600"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <item.icon className="w-4 h-4 shrink-0" />
                {!collapsed && item.label}
              </Link>
            )}
          </div>
        ))}
      </nav>

      {/* Bottom section */}
      <div className="p-2 border-t border-gray-100">
        <Link
          href="/dashboard/help"
          className="flex items-center gap-3 px-3 py-2 text-sm text-gray-500 hover:bg-gray-50 rounded-lg"
        >
          <HelpCircle className="w-4 h-4" />
          {!collapsed && "Help & Support"}
        </Link>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center gap-3 px-3 py-2 text-sm text-gray-500 hover:bg-gray-50 rounded-lg mt-1"
        >
          <Heart className={`w-4 h-4 transition-transform ${collapsed ? "" : "rotate-180"}`} />
        </button>
      </div>
    </aside>
  );
}
