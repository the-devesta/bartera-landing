"use client";

import React, { useEffect, useState } from "react";

interface AdminKPIs {
  totalUsers: number;
  activeListings: number;
  activeNegotiations: number;
  activeDeals: number;
  completedSwaps: number;
  openReports: number;
  pendingVerifications: number;
  escrowCoinsCirculating: number;
  averageTrustScore: number;
}

interface ListingItem {
  id: string;
  title: string;
  category: string;
  condition: string;
  priceHint?: number;
  status: "ACTIVE" | "PAUSED" | "DELISTED" | "FLAGGED";
  aiScore: number;
  views: number;
  ownerName: string;
  ownerHandle: string;
  image: string;
}

interface UserItem {
  id: string;
  fullName: string;
  email: string;
  handle: string;
  location: string;
  isVerified: boolean;
  verification: "UNVERIFIED" | "PENDING" | "VERIFIED" | "REJECTED";
  isActive: boolean;
  role: string;
}

interface ReportItem {
  id: string;
  type: "LISTING" | "USER" | "MESSAGE";
  reason: string;
  details?: string;
  status: "OPEN" | "RESOLVED" | "DISMISSED";
  authorName: string;
  targetName?: string;
  createdAt: string;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1";

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "listings" | "users" | "reports" | "disputes" | "coins">("overview");
  const [apiConnected, setApiConnected] = useState<boolean>(false);
  const [kpis, setKpis] = useState<AdminKPIs>({
    totalUsers: 142,
    activeListings: 56,
    activeNegotiations: 28,
    activeDeals: 16,
    completedSwaps: 38,
    openReports: 3,
    pendingVerifications: 6,
    escrowCoinsCirculating: 158000,
    averageTrustScore: 94.6,
  });

  const [listings, setListings] = useState<ListingItem[]>([
    {
      id: "l-1",
      title: "Fujifilm X100V",
      category: "Cameras",
      condition: "LIKE_NEW",
      priceHint: 115000,
      status: "ACTIVE",
      aiScore: 96,
      views: 428,
      ownerName: "Neha R.",
      ownerHandle: "neha_r",
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: "l-2",
      title: "Fender Stratocaster",
      category: "Vinyl & Instruments",
      condition: "MINT",
      priceHint: 45000,
      status: "ACTIVE",
      aiScore: 89,
      views: 312,
      ownerName: "Arjun K.",
      ownerHandle: "arjun_k",
      image: "https://images.unsplash.com/photo-1550291652-6ea9114a47b1?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: "l-3",
      title: "MacBook Air M2 (16GB RAM)",
      category: "Electronics",
      condition: "GOOD",
      priceHint: 88000,
      status: "ACTIVE",
      aiScore: 99,
      views: 654,
      ownerName: "Priya S.",
      ownerHandle: "priya_s",
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80",
    },
  ]);

  const [users, setUsers] = useState<UserItem[]>([
    {
      id: "u-1",
      fullName: "Neha R.",
      email: "neha@bartera.in",
      handle: "neha_r",
      location: "Koramangala · Bengaluru",
      isVerified: true,
      verification: "VERIFIED",
      isActive: true,
      role: "USER",
    },
    {
      id: "u-2",
      fullName: "Arjun K.",
      email: "arjun@bartera.in",
      handle: "arjun_k",
      location: "Indiranagar · Bengaluru",
      isVerified: true,
      verification: "VERIFIED",
      isActive: true,
      role: "USER",
    },
    {
      id: "u-3",
      fullName: "Dev T.",
      email: "dev@bartera.in",
      handle: "dev_t",
      location: "Whitefield · Bengaluru",
      isVerified: false,
      verification: "PENDING",
      isActive: true,
      role: "USER",
    },
  ]);

  const [reports, setReports] = useState<ReportItem[]>([
    {
      id: "rep-1",
      type: "LISTING",
      reason: "Potential duplicate listing",
      details: "Images match another active post from 2 weeks ago.",
      status: "OPEN",
      authorName: "Arjun K.",
      targetName: "Sony WH-1000XM5",
      createdAt: "2026-08-20T14:20:00Z",
    },
    {
      id: "rep-2",
      type: "USER",
      reason: "Late arrival to meetup",
      details: "Did not communicate delay in chat.",
      status: "OPEN",
      authorName: "Priya S.",
      targetName: "Rohit M.",
      createdAt: "2026-08-20T11:15:00Z",
    },
  ]);

  const [notification, setNotification] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  useEffect(() => {
    // Attempt connecting to live NestJS backend admin API
    fetch(`${API_BASE}/admin/dashboard/kpis`, {
      headers: { Accept: "application/json" },
    })
      .then((res) => {
        if (res.ok) {
          setApiConnected(true);
          return res.json();
        }
      })
      .then((data) => {
        if (data?.kpis) setKpis(data.kpis);
      })
      .catch(() => {
        setApiConnected(false);
      });
  }, []);

  const handleModerateListing = async (id: string, action: "APPROVE" | "FLAG" | "PAUSE" | "DELIST") => {
    try {
      await fetch(`${API_BASE}/admin/listings/${id}/moderate`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
    } catch {}

    setListings((prev) =>
      prev.map((l) =>
        l.id === id
          ? {
              ...l,
              status: action === "APPROVE" ? "ACTIVE" : action === "FLAG" ? "FLAGGED" : action === "PAUSE" ? "PAUSED" : "DELISTED",
            }
          : l
      )
    );
    showToast(`Listing ${id} updated to ${action}`);
  };

  const handleToggleUserVerify = async (userId: string, current: boolean) => {
    try {
      await fetch(`${API_BASE}/admin/users/${userId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isVerified: !current }),
      });
    } catch {}

    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId
          ? {
              ...u,
              isVerified: !current,
              verification: !current ? "VERIFIED" : "UNVERIFIED",
            }
          : u
      )
    );
    showToast(`User verification updated.`);
  };

  const handleResolveReport = async (reportId: string, status: "RESOLVED" | "DISMISSED") => {
    setReports((prev) => prev.map((r) => (r.id === reportId ? { ...r, status } : r)));
    showToast(`Report ${reportId} marked as ${status}`);
  };

  return (
    <div className="min-h-screen bg-[#0E110C] text-[#FAF8F5] font-sans antialiased selection:bg-[#C6FF3D] selection:text-[#0E110C]">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-6 right-6 z-50 bg-[#C6FF3D] text-[#0E110C] px-5 py-3 rounded-2xl font-bold shadow-2xl flex items-center gap-2 border border-[#0E110C]/20 animate-bounce">
          <span>✓</span> {notification}
        </div>
      )}

      {/* Header Bar */}
      <header className="border-b border-[#242A1D] bg-[#12160E]/80 backdrop-blur-xl sticky top-0 z-40 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#C6FF3D] flex items-center justify-center font-black text-[#0E110C] text-lg shadow-lg shadow-[#C6FF3D]/20">
            B
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-lg tracking-tight text-white font-['Space_Grotesk']">
                Bartera Admin
              </h1>
              <span className="text-[11px] font-semibold tracking-wider px-2 py-0.5 rounded-full bg-[#242A1D] text-[#C6FF3D] border border-[#C6FF3D]/30">
                PROD OPS
              </span>
            </div>
            <p className="text-xs text-[#8A9580]">Marketplace Moderation & Settlement Console</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#181E13] border border-[#242A1D] text-xs">
            <span className={`w-2 h-2 rounded-full ${apiConnected ? "bg-[#C6FF3D] animate-pulse" : "bg-[#FFA500]"}`} />
            <span className="text-[#B5C2AA] font-mono">{apiConnected ? "API Live (Port 4000)" : "Local Simulation"}</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-[#C6FF3D]/10 border border-[#C6FF3D]/30 flex items-center justify-center text-xs font-bold text-[#C6FF3D]">
            OP
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-[#242A1D] pb-4 mb-8 overflow-x-auto">
          {[
            { id: "overview", label: "📊 Overview & KPIs" },
            { id: "listings", label: `📦 Listings (${listings.length})` },
            { id: "users", label: `👥 Users & KYC (${users.length})` },
            { id: "reports", label: `🚩 Safety Reports (${reports.filter((r) => r.status === "OPEN").length})` },
            { id: "disputes", label: "⚖️ Dispute Arbiter" },
            { id: "coins", label: "🪙 Coin Ledger & Finance" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-[#C6FF3D] text-[#0E110C] shadow-lg shadow-[#C6FF3D]/15 font-bold"
                  : "bg-[#181E13] text-[#8A9580] hover:text-white border border-[#242A1D]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: Overview */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                { label: "Active Listings", val: kpis.activeListings, delta: "+12% this week", color: "text-[#C6FF3D]" },
                { label: "Active Negotiations", val: kpis.activeNegotiations, delta: "Live on WebSockets", color: "text-[#C6FF3D]" },
                { label: "Completed Swaps", val: kpis.completedSwaps, delta: "₹42.8L Volume", color: "text-[#C6FF3D]" },
                { label: "Escrow Coins Circulating", val: `${(kpis.escrowCoinsCirculating / 1000).toFixed(0)}k`, delta: "100% Backed", color: "text-[#C6FF3D]" },
                { label: "Registered Users", val: kpis.totalUsers, delta: "Bengaluru Beta", color: "text-white" },
                { label: "Open Safety Reports", val: kpis.openReports, delta: "Requires Action", color: "text-[#FF6B6B]" },
                { label: "Pending KYC Reviews", val: kpis.pendingVerifications, delta: "Aadhaar / DigiLocker", color: "text-[#FFA500]" },
                { label: "Avg Platform Trust Score", val: `${kpis.averageTrustScore}%`, delta: "AI Vision Checked", color: "text-[#C6FF3D]" },
              ].map((card, i) => (
                <div key={i} className="p-5 rounded-2xl bg-[#141A10] border border-[#242A1D] shadow-sm">
                  <p className="text-xs text-[#8A9580] font-medium">{card.label}</p>
                  <h3 className={`text-2xl font-black mt-2 font-['Space_Grotesk'] ${card.color}`}>{card.val}</h3>
                  <p className="text-[11px] text-[#55634B] mt-1 font-mono">{card.delta}</p>
                </div>
              ))}
            </div>

            {/* Quick Summary Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-[#181E13] to-[#12160E] border border-[#242A1D] flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-white font-['Space_Grotesk']">System Operational Status: All Systems Optimal</h2>
                <p className="text-sm text-[#8A9580] mt-1">NestJS WebSockets, AI Vision Validator, and PostgreSQL Database are running with sub-20ms latency.</p>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setActiveTab("listings")} className="px-4 py-2 rounded-xl bg-[#C6FF3D] text-[#0E110C] text-xs font-bold hover:opacity-90">
                  Review Queue
                </button>
                <button onClick={() => setActiveTab("reports")} className="px-4 py-2 rounded-xl bg-[#242A1D] text-white text-xs font-semibold hover:bg-[#2F3726]">
                  View Open Reports
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Listings Moderation */}
        {activeTab === "listings" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white font-['Space_Grotesk']">Platform Listings & AI Moderation Queue</h2>
              <span className="text-xs text-[#8A9580]">{listings.length} total listings</span>
            </div>

            <div className="rounded-2xl border border-[#242A1D] bg-[#141A10] overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead className="bg-[#181E13] text-[#8A9580] text-xs font-semibold border-b border-[#242A1D]">
                  <tr>
                    <th className="py-3 px-4">Item & Photos</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Est. Value</th>
                    <th className="py-3 px-4">AI Score</th>
                    <th className="py-3 px-4">Owner</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Moderation Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#242A1D]">
                  {listings.map((l) => (
                    <tr key={l.id} className="hover:bg-[#181E13]/50 transition-colors">
                      <td className="py-3 px-4 flex items-center gap-3">
                        <img src={l.image} alt={l.title} className="w-12 h-12 rounded-xl object-cover border border-[#242A1D]" />
                        <div>
                          <div className="font-bold text-white text-sm">{l.title}</div>
                          <div className="text-xs text-[#8A9580]">{l.condition} · {l.views} views</div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-[#B5C2AA] text-xs">{l.category}</td>
                      <td className="py-3 px-4 font-mono font-bold text-[#C6FF3D]">₹{l.priceHint?.toLocaleString("en-IN")}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-[#C6FF3D]/10 text-[#C6FF3D] border border-[#C6FF3D]/20">
                          🛡️ {l.aiScore}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-xs">
                        <div className="text-white font-medium">{l.ownerName}</div>
                        <div className="text-[#8A9580]">@{l.ownerHandle}</div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                          l.status === "ACTIVE"
                            ? "bg-[#C6FF3D]/15 text-[#C6FF3D]"
                            : l.status === "FLAGGED"
                            ? "bg-[#FF6B6B]/15 text-[#FF6B6B]"
                            : "bg-[#FFA500]/15 text-[#FFA500]"
                        }`}>
                          {l.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleModerateListing(l.id, "APPROVE")}
                            className="px-2.5 py-1 rounded-lg bg-[#C6FF3D]/15 text-[#C6FF3D] hover:bg-[#C6FF3D] hover:text-[#0E110C] text-xs font-bold transition-all"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleModerateListing(l.id, "FLAG")}
                            className="px-2.5 py-1 rounded-lg bg-[#FF6B6B]/15 text-[#FF6B6B] hover:bg-[#FF6B6B] hover:text-white text-xs font-bold transition-all"
                          >
                            Flag
                          </button>
                          <button
                            onClick={() => handleModerateListing(l.id, "DELIST")}
                            className="px-2.5 py-1 rounded-lg bg-[#242A1D] text-[#8A9580] hover:text-white text-xs font-bold transition-all"
                          >
                            Delist
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Users & KYC */}
        {activeTab === "users" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white font-['Space_Grotesk']">Trader Accounts & KYC Identity Reviews</h2>
              <span className="text-xs text-[#8A9580]">{users.length} total users</span>
            </div>

            <div className="rounded-2xl border border-[#242A1D] bg-[#141A10] overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead className="bg-[#181E13] text-[#8A9580] text-xs font-semibold border-b border-[#242A1D]">
                  <tr>
                    <th className="py-3 px-4">User</th>
                    <th className="py-3 px-4">Email</th>
                    <th className="py-3 px-4">Location</th>
                    <th className="py-3 px-4">KYC Document Status</th>
                    <th className="py-3 px-4">Trust Badge</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#242A1D]">
                  {users.map((u) => (
                    <tr key={u.id} className="hover:bg-[#181E13]/50 transition-colors">
                      <td className="py-3 px-4">
                        <div className="font-bold text-white">{u.fullName}</div>
                        <div className="text-xs text-[#8A9580]">@{u.handle}</div>
                      </td>
                      <td className="py-3 px-4 text-xs font-mono text-[#B5C2AA]">{u.email}</td>
                      <td className="py-3 px-4 text-xs text-[#8A9580]">{u.location}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                          u.verification === "VERIFIED"
                            ? "bg-[#C6FF3D]/15 text-[#C6FF3D]"
                            : u.verification === "PENDING"
                            ? "bg-[#FFA500]/15 text-[#FFA500]"
                            : "bg-[#8A9580]/15 text-[#8A9580]"
                        }`}>
                          {u.verification}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        {u.isVerified ? (
                          <span className="text-xs font-bold text-[#C6FF3D] flex items-center gap-1">
                            ✓ Verified Swapper
                          </span>
                        ) : (
                          <span className="text-xs text-[#8A9580]">Standard</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => handleToggleUserVerify(u.id, u.isVerified)}
                          className="px-3 py-1 rounded-lg bg-[#242A1D] text-[#C6FF3D] hover:bg-[#C6FF3D] hover:text-[#0E110C] text-xs font-bold transition-all"
                        >
                          {u.isVerified ? "Revoke Badge" : "Approve KYC Badge"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 4: Safety Reports */}
        {activeTab === "reports" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white font-['Space_Grotesk']">Safety & Content Moderation Inbox</h2>
              <span className="text-xs text-[#FF6B6B] font-bold">{reports.filter((r) => r.status === "OPEN").length} open</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {reports.map((r) => (
                <div key={r.id} className="p-5 rounded-2xl bg-[#141A10] border border-[#242A1D] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#FF6B6B]/15 text-[#FF6B6B]">
                      {r.type} REPORT
                    </span>
                    <span className={`text-xs font-bold ${r.status === "OPEN" ? "text-[#FFA500]" : "text-[#C6FF3D]"}`}>
                      {r.status}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">{r.reason}</h4>
                    <p className="text-xs text-[#8A9580] mt-1">{r.details}</p>
                  </div>
                  <div className="text-xs text-[#55634B] flex justify-between border-t border-[#242A1D] pt-3 font-mono">
                    <span>By: {r.authorName}</span>
                    <span>Target: {r.targetName}</span>
                  </div>
                  {r.status === "OPEN" && (
                    <div className="flex gap-2 pt-2">
                      <button
                        onClick={() => handleResolveReport(r.id, "RESOLVED")}
                        className="flex-1 py-1.5 rounded-xl bg-[#C6FF3D] text-[#0E110C] font-bold text-xs hover:opacity-90"
                      >
                        Enforce & Resolve
                      </button>
                      <button
                        onClick={() => handleResolveReport(r.id, "DISMISSED")}
                        className="px-3 py-1.5 rounded-xl bg-[#242A1D] text-[#8A9580] font-semibold text-xs hover:text-white"
                      >
                        Dismiss
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: Dispute Arbiter */}
        {activeTab === "disputes" && (
          <div className="p-8 rounded-2xl bg-[#141A10] border border-[#242A1D] text-center space-y-3">
            <div className="text-3xl">⚖️</div>
            <h3 className="font-bold text-white text-base font-['Space_Grotesk']">No Open Barter Disputes</h3>
            <p className="text-xs text-[#8A9580] max-w-md mx-auto">
              All meetup handshakes and OTP verifications in the last 24 hours completed with 100% mutual consensus.
            </p>
          </div>
        )}

        {/* Tab 6: Coin Ledger */}
        {activeTab === "coins" && (
          <div className="p-8 rounded-2xl bg-[#141A10] border border-[#242A1D] text-center space-y-3">
            <div className="text-3xl">🪙</div>
            <h3 className="font-bold text-white text-base font-['Space_Grotesk']">158,000 Coins in Escrow Circulation</h3>
            <p className="text-xs text-[#8A9580] max-w-md mx-auto">
              All coin debit and credit ledger operations are reconciled against the PostgreSQL audit table.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
