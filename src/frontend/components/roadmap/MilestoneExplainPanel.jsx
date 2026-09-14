import React, { useState } from 'react';
import { MILESTONE_EXPLAIN } from '../../../data/milestoneExplain';

/**
 * MilestoneExplainPanel
 * Slides in from the right when an island is clicked.
 * 3 tabs: Concepts grid | Code snippet | ASCII diagram
 */
export default function MilestoneExplainPanel({ milestone, onClose }) {
  const [activeTab, setActiveTab] = useState('concepts');

  if (!milestone) return null;
  const explain = MILESTONE_EXPLAIN[milestone.id];
  if (!explain) return null;

  const ac = explain.color;
  const glow = explain.glow;

  return (
    <div
      className="fixed right-0 top-0 h-full z-50 flex flex-col pointer-events-none"
      style={{ width: 'min(420px, 92vw)' }}
    >
      {/* Slide-in card */}
      <div
        className="flex-1 flex flex-col pointer-events-auto animate-in slide-in-from-right-4 duration-300"
        style={{
          background: 'linear-gradient(160deg, #0d0b1e 0%, #10142a 100%)',
          borderLeft: `2px solid ${ac}`,
          boxShadow: `-8px 0 40px ${glow}, inset 0 0 60px rgba(0,0,0,0.5)`,
        }}
      >
        {/* ── HEADER ── */}
        <div
          className="flex items-start justify-between px-4 py-3 shrink-0"
          style={{ borderBottom: `1px solid ${ac}44` }}
        >
          <div className="flex items-center gap-3 min-w-0">
            <span className="text-3xl select-none shrink-0">{milestone.icon}</span>
            <div className="min-w-0">
              <div
                className="font-orbitron font-black text-sm sm:text-base leading-tight truncate"
                style={{ color: ac }}
              >
                {milestone.title.toUpperCase()}
              </div>
              <div className="font-vt323 text-xs text-gray-400 truncate">
                {explain.tagline}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1.5 shrink-0 ml-2">
            <span
              className="font-vt323 text-xs px-2 py-0.5 rounded border"
              style={{ color: ac, borderColor: `${ac}55`, background: `${ac}15` }}
            >
              CH{milestone.chapter} +{milestone.xp}XP
            </span>
            <button
              onClick={onClose}
              aria-label="Close explanation panel"
              className="text-gray-500 hover:text-white font-bold w-7 h-7 flex items-center justify-center hover:bg-white/10 rounded transition-colors cursor-pointer text-lg leading-none"
            >
              &#x2715;
            </button>
          </div>
        </div>

        {/* ── TABS ── */}
        <div
          className="flex shrink-0"
          style={{ borderBottom: `1px solid ${ac}33` }}
        >
          {[
            { id: 'concepts', label: '🧩 Concepts' },
            { id: 'code',     label: '💻 Code' },
            { id: 'diagram',  label: '📊 Diagram' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex-1 font-vt323 text-sm py-2 transition-all cursor-pointer"
              style={{
                color: activeTab === tab.id ? ac : '#6b7280',
                borderBottom: activeTab === tab.id ? `2px solid ${ac}` : '2px solid transparent',
                background: activeTab === tab.id ? `${ac}10` : 'transparent',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── SCROLLABLE CONTENT ── */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">

          {/* WHY IT MATTERS — always visible at top */}
          <div
            className="rounded-lg px-3 py-2.5 text-xs font-vt323 leading-snug"
            style={{
              background: `${ac}12`,
              border: `1px solid ${ac}40`,
              color: '#e2e8f0',
            }}
          >
            <span style={{ color: ac }} className="font-bold">&#9733; WHY IT MATTERS: </span>
            {explain.whyItMatters}
          </div>

          {/* ── CONCEPTS TAB ── */}
          {activeTab === 'concepts' && (
            <div className="grid grid-cols-2 gap-2">
              {(explain.concepts || []).map((c, i) => (
                <div
                  key={i}
                  className="rounded-lg p-2.5 flex flex-col gap-1 transition-all hover:scale-[1.02]"
                  style={{
                    background: '#151326',
                    border: `1px solid ${ac}30`,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
                  }}
                >
                  <div className="flex items-center gap-1.5">
                    <span className="text-xl">{c.icon}</span>
                    <span
                      className="font-orbitron text-[10px] font-bold truncate"
                      style={{ color: ac }}
                    >
                      {c.label}
                    </span>
                  </div>
                  <p className="font-vt323 text-xs text-gray-400 leading-tight">{c.desc}</p>
                </div>
              ))}
            </div>
          )}

          {/* ── CODE TAB ── */}
          {activeTab === 'code' && (
            <div
              className="rounded-xl overflow-hidden"
              style={{ border: `1px solid ${ac}40` }}
            >
              {/* macOS-style window bar */}
              <div
                className="flex items-center gap-1.5 px-3 py-1.5"
                style={{ background: `${ac}20`, borderBottom: `1px solid ${ac}30` }}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/70"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/70"></span>
                <span className="font-vt323 text-xs text-gray-500 ml-1">
                  {milestone.id}.js
                </span>
              </div>
              <pre
                className="p-3 text-xs leading-relaxed overflow-x-auto"
                style={{
                  background: '#070514',
                  color: '#e2e8f0',
                  fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                  whiteSpace: 'pre',
                  tabSize: 2,
                }}
              >
                <code>{explain.snippet || '// No snippet available'}</code>
              </pre>
            </div>
          )}

          {/* ── DIAGRAM TAB ── */}
          {activeTab === 'diagram' && (
            <div
              className="rounded-xl overflow-hidden"
              style={{ border: `1px solid ${ac}40` }}
            >
              <div
                className="px-3 py-1.5 font-orbitron text-[10px]"
                style={{
                  background: `${ac}20`,
                  color: ac,
                  borderBottom: `1px solid ${ac}30`,
                }}
              >
                &#128202; VISUAL DIAGRAM
              </div>
              <pre
                className="p-4 text-xs leading-relaxed overflow-x-auto"
                style={{
                  background: '#070514',
                  color: '#94a3b8',
                  fontFamily: "'JetBrains Mono', 'Courier New', monospace",
                  whiteSpace: 'pre',
                }}
              >
                {(explain.diagram || []).join('\n')}
              </pre>
            </div>
          )}

          {/* Chapter context pill */}
          <div
            className="rounded-lg px-3 py-2 flex items-center justify-between text-xs font-vt323"
            style={{ background: '#151326', border: '1px solid #2A264F' }}
          >
            <span className="text-gray-500">CHAPTER</span>
            <span className="text-purple-300 truncate mx-2">{milestone.chapterTitle}</span>
            <span className="text-gray-600 shrink-0">#{milestone.order}/16</span>
          </div>
        </div>

        {/* ── FOOTER ── */}
        <div
          className="px-4 py-2.5 shrink-0"
          style={{ borderTop: `1px solid ${ac}33` }}
        >
          <p className="font-vt323 text-[10px] text-center text-gray-600 tracking-wider">
            SAGE BYTERION &#183; TOUCH ANY ISLAND TO EXPLORE
          </p>
        </div>
      </div>
    </div>
  );
}
