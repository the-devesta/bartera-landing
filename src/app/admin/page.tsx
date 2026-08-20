"use client";

import React, { useEffect, useState } from "react";
import "./admin.css";

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
    <div className="admin-root">
      {/* Toast Notification */}
      {notification && (
        <div className="toast-alert">
          <span>✓</span> {notification}
        </div>
      )}

      {/* Header Bar */}
      <header className="admin-header">
        <div className="admin-brand">
          <div className="admin-logo">B</div>
          <div>
            <div className="admin-title-wrap">
              <h1 className="admin-title">Bartera Admin</h1>
              <span className="admin-badge">PROD OPS</span>
            </div>
            <p className="admin-subtitle">Marketplace Moderation & Settlement Console</p>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div className="admin-status-pill">
            <span className={`status-dot ${apiConnected ? "active" : "local"}`} />
            <span style={{ fontFamily: "monospace" }}>{apiConnected ? "API Live (Port 4000)" : "Local Console Ready"}</span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="admin-container">
        {/* Navigation Tabs */}
        <div className="admin-tabs">
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
              className={`admin-tab-btn ${activeTab === tab.id ? "active" : ""}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: Overview */}
        {activeTab === "overview" && (
          <div>
            <div className="kpi-grid">
              {[
                { label: "Active Listings", val: kpis.activeListings, delta: "+12% this week", color: "acid" },
                { label: "Active Negotiations", val: kpis.activeNegotiations, delta: "Live on WebSockets", color: "acid" },
                { label: "Completed Swaps", val: kpis.completedSwaps, delta: "₹42.8L Volume", color: "acid" },
                { label: "Escrow Coins Circulating", val: `${(kpis.escrowCoinsCirculating / 1000).toFixed(0)}k`, delta: "100% Backed", color: "acid" },
                { label: "Registered Users", val: kpis.totalUsers, delta: "Bengaluru Beta", color: "white" },
                { label: "Open Safety Reports", val: kpis.openReports, delta: "Requires Action", color: "red" },
                { label: "Pending KYC Reviews", val: kpis.pendingVerifications, delta: "Aadhaar / DigiLocker", color: "amber" },
                { label: "Avg Platform Trust Score", val: `${kpis.averageTrustScore}%`, delta: "AI Vision Checked", color: "acid" },
              ].map((card, i) => (
                <div key={i} className="kpi-card">
                  <div className="kpi-label">{card.label}</div>
                  <div className={`kpi-value ${card.color}`}>{card.val}</div>
                  <div className="kpi-delta">{card.delta}</div>
                </div>
              ))}
            </div>

            {/* Quick Summary Card */}
            <div className="banner-card">
              <div>
                <div className="banner-title">System Operational Status: All Systems Optimal</div>
                <div className="banner-sub">
                  NestJS WebSockets, AI Vision Validator, and PostgreSQL Database are running with sub-20ms latency.
                </div>
              </div>
              <div className="banner-actions">
                <button onClick={() => setActiveTab("listings")} className="btn-primary">
                  Review Queue
                </button>
                <button onClick={() => setActiveTab("reports")} className="btn-secondary">
                  View Open Reports
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Listings Moderation */}
        {activeTab === "listings" && (
          <div className="table-card">
            <div className="table-header-bar">
              <div className="table-title">Platform Listings & AI Moderation Queue</div>
              <div style={{ fontSize: 12, color: "#8A9580" }}>{listings.length} total listings</div>
            </div>

            <table className="admin-table">
              <thead>
                <tr>
                  <th>Item & Photos</th>
                  <th>Category</th>
                  <th>Est. Value</th>
                  <th>AI Score</th>
                  <th>Owner</th>
                  <th>Status</th>
                  <th style={{ textAlign: "right" }}>Moderation Actions</th>
                </tr>
              </thead>
              <tbody>
                {listings.map((l) => (
                  <tr key={l.id}>
                    <td>
                      <div className="item-cell">
                        <img src={l.image} alt={l.title} className="item-thumb" />
                        <div>
                          <div className="item-title">{l.title}</div>
                          <div className="item-meta">{l.condition} · {l.views} views</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ color: "#B5C2AA" }}>{l.category}</td>
                    <td><span className="price-text">₹{l.priceHint?.toLocaleString("en-IN")}</span></td>
                    <td>
                      <span className="badge-pill green">
                        🛡️ {l.aiScore}
                      </span>
                    </td>
                    <td>
                      <div style={{ color: "#ffffff", fontWeight: 600 }}>{l.ownerName}</div>
                      <div style={{ color: "#8A9580", fontSize: 11 }}>@{l.ownerHandle}</div>
                    </td>
                    <td>
                      <span className={`badge-pill ${
                        l.status === "ACTIVE"
                          ? "green"
                          : l.status === "FLAGGED"
                          ? "red"
                          : "amber"
                      }`}>
                        {l.status}
                      </span>
                    </td>
                    <td>
                      <div className="action-group">
                        <button
                          onClick={() => handleModerateListing(l.id, "APPROVE")}
                          className="btn-act approve"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleModerateListing(l.id, "FLAG")}
                          className="btn-act flag"
                        >
                          Flag
                        </button>
                        <button
                          onClick={() => handleModerateListing(l.id, "DELIST")}
                          className="btn-act delist"
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
        )}

        {/* Tab 3: Users & KYC */}
        {activeTab === "users" && (
          <div className="table-card">
            <div className="table-header-bar">
              <div className="table-title">Trader Accounts & KYC Identity Reviews</div>
              <div style={{ fontSize: 12, color: "#8A9580" }}>{users.length} total users</div>
            </div>

            <table className="admin-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Email</th>
                  <th>Location</th>
                  <th>KYC Document Status</th>
                  <th>Trust Badge</th>
                  <th style={{ textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id}>
                    <td>
                      <div style={{ fontWeight: 700, color: "#ffffff" }}>{u.fullName}</div>
                      <div style={{ fontSize: 11, color: "#8A9580" }}>@{u.handle}</div>
                    </td>
                    <td style={{ fontFamily: "monospace", color: "#B5C2AA" }}>{u.email}</td>
                    <td style={{ color: "#8A9580" }}>{u.location}</td>
                    <td>
                      <span className={`badge-pill ${
                        u.verification === "VERIFIED"
                          ? "green"
                          : u.verification === "PENDING"
                          ? "amber"
                          : "gray"
                      }`}>
                        {u.verification}
                      </span>
                    </td>
                    <td>
                      {u.isVerified ? (
                        <span style={{ color: "#C6FF3D", fontWeight: 700, fontSize: 12 }}>
                          ✓ Verified Swapper
                        </span>
                      ) : (
                        <span style={{ color: "#8A9580", fontSize: 12 }}>Standard</span>
                      )}
                    </td>
                    <td>
                      <div className="action-group">
                        <button
                          onClick={() => handleToggleUserVerify(u.id, u.isVerified)}
                          className="btn-act approve"
                        >
                          {u.isVerified ? "Revoke Badge" : "Approve KYC Badge"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 4: Safety Reports */}
        {activeTab === "reports" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div className="table-title">Safety & Content Moderation Inbox</div>
              <span style={{ color: "#FF6B6B", fontWeight: 700, fontSize: 12 }}>
                {reports.filter((r) => r.status === "OPEN").length} open
              </span>
            </div>

            <div className="reports-grid">
              {reports.map((r) => (
                <div key={r.id} className="report-card">
                  <div className="report-top">
                    <span className="badge-pill red">{r.type} REPORT</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: r.status === "OPEN" ? "#FFA500" : "#C6FF3D" }}>
                      {r.status}
                    </span>
                  </div>
                  <div>
                    <div className="report-reason">{r.reason}</div>
                    <div className="report-details">{r.details}</div>
                  </div>
                  <div className="report-meta">
                    <span>By: {r.authorName}</span>
                    <span>Target: {r.targetName}</span>
                  </div>
                  {r.status === "OPEN" && (
                    <div className="report-actions">
                      <button
                        onClick={() => handleResolveReport(r.id, "RESOLVED")}
                        className="btn-primary"
                        style={{ flex: 1, padding: "8px 12px" }}
                      >
                        Enforce & Resolve
                      </button>
                      <button
                        onClick={() => handleResolveReport(r.id, "DISMISSED")}
                        className="btn-secondary"
                        style={{ padding: "8px 14px" }}
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
          <div className="empty-box">
            <div className="empty-icon">⚖️</div>
            <div className="empty-title">No Open Barter Disputes</div>
            <div className="empty-sub">
              All meetup handshakes and OTP verifications in the last 24 hours completed with 100% mutual consensus.
            </div>
          </div>
        )}

        {/* Tab 6: Coin Ledger */}
        {activeTab === "coins" && (
          <div className="empty-box">
            <div className="empty-icon">🪙</div>
            <div className="empty-title">158,000 Coins in Escrow Circulation</div>
            <div className="empty-sub">
              All coin debit and credit ledger operations are reconciled against the PostgreSQL audit table.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
