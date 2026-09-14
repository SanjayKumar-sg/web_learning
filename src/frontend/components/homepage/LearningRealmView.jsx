import React from 'react';

export default function LearningRealmView({ realm, onReturnToHall }) {
  if (!realm) return null;

  const firstChapter = realm.curriculum && realm.curriculum.length > 0 ? realm.curriculum[0] : null;
  const secondChapter = realm.curriculum && realm.curriculum.length > 1 ? realm.curriculum[1] : null;
  const hasCurriculum = Boolean(firstChapter);

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#07060E] text-white overflow-y-auto animate-in fade-in zoom-in-95 duration-500">
      {/* Top Banner */}
      <header className="w-full bg-[#151326] border-b border-[#2A264F] py-3 px-6 flex items-center justify-between shadow-lg sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded border border-purple-500/60 bg-purple-900/30 flex items-center justify-center font-bold text-cyan-300">
            {realm.sigil || '⚔️'}
          </div>
          <div>
            <div className="font-orbitron font-bold text-sm sm:text-base text-yellow-400">
              {realm.title}
            </div>
            <div className="font-vt323 text-xs text-gray-400">
              REALM: <span className="text-cyan-400">{realm.language}</span> // {firstChapter?.tier || 'CHAPTER 1: INITIATION'}
            </div>
          </div>
        </div>

        <button
          onClick={onReturnToHall}
          className="font-vt323 text-sm sm:text-base bg-gray-900 hover:bg-purple-950/60 text-gray-300 hover:text-white border border-gray-700 hover:border-purple-500/60 px-3 py-1 rounded pixel-corners-sm transition-all cursor-pointer shadow"
        >
          [ ← RETURN TO GREAT HALL ]
        </button>
      </header>

      {/* Realm Content */}
      <main className="max-w-4xl mx-auto w-full px-4 py-8 space-y-8 flex-grow">
        {/* Entrance Hero Card */}
        <section className="p-6 bg-[#121024] border-2 border-purple-500/60 rounded-xl pixel-corners shadow-[0_0_35px_rgba(139,92,246,0.25)] flex flex-col sm:flex-row items-center gap-6">
          <div className="w-28 h-40 flex-shrink-0 flex items-center justify-center p-2 bg-[#090814] rounded border border-purple-800">
            <img
              src={realm.doorImage}
              alt={realm.language}
              className={`w-full h-full object-contain filter ${realm.doorGlowFilter || 'drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]'} animate-pixel-bob`}
              style={{ imageRendering: 'pixelated' }}
            />
          </div>

          <div className="space-y-2 text-center sm:text-left flex-grow">
            <span className="font-vt323 text-xs bg-green-950/60 border border-green-700/60 text-green-300 px-2.5 py-0.5 rounded inline-block">
              THRESHOLD CROSSED // ACTIVE REALM
            </span>
            <h1 className="font-orbitron font-extrabold text-2xl sm:text-3xl text-white">
              WELCOME TO {realm.language.toUpperCase()}
            </h1>
            <p className="font-vt323 text-base text-gray-300 max-w-xl">
              {realm.essence || `You have taken your first step through the monumental arch of ${realm.language}. Sage Byterion stands by your side.`}
            </p>
            <div className="pt-1 font-vt323 text-sm text-yellow-300">
              EQUIPPED BOON: <span className="text-white">{realm.boon || '+450 Data Mastery XP // Realm Initiate Badge'}</span>
            </div>
          </div>
        </section>

        {/* Chapter 1 Active Quests */}
        <section className="space-y-4">
          <div className="border-b border-[#2A264F] pb-2 flex items-center justify-between">
            <h2 className="font-orbitron font-bold text-base sm:text-lg text-white flex items-center gap-2">
              <span className="text-cyan-400">📜</span> {firstChapter ? `${firstChapter.tier}: ${firstChapter.title}` : 'CHAPTER 1: THE FIRST INCANTATIONS'}
            </h2>
            <span className="font-vt323 text-sm text-gray-400">
              {hasCurriculum ? `QUEST 1 OF ${firstChapter.topics.length} READY` : 'AWAITING SCRIBES'}
            </span>
          </div>

          {hasCurriculum ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {firstChapter.topics.map((topic, idx) => {
                const isFirst = idx === 0;
                return (
                  <div
                    key={idx}
                    className={`p-4 rounded pixel-corners space-y-2 transition-all ${
                      isFirst
                        ? 'bg-[#151326] border border-cyan-500/60 hover:shadow-[0_0_15px_rgba(34,211,238,0.3)]'
                        : 'bg-[#151326]/60 border border-[#2A264F] opacity-60'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className={`font-orbitron text-[10px] font-bold tracking-wider ${isFirst ? 'text-cyan-400' : 'text-gray-500'}`}>
                        QUEST 1.{idx + 1}
                      </span>
                      <span className={`font-vt323 text-xs px-2 py-0.5 border rounded ${
                        isFirst
                          ? 'bg-cyan-950 text-cyan-300 border-cyan-800'
                          : 'bg-gray-900 text-gray-500 border-gray-800'
                      }`}>
                        {isFirst ? 'AVAILABLE' : 'LOCKED'}
                      </span>
                    </div>

                    <h3 className={`font-orbitron text-sm font-bold ${isFirst ? 'text-white' : 'text-gray-400'}`}>
                      {topic}
                    </h3>
                    <p className={`font-vt323 text-sm ${isFirst ? 'text-gray-300' : 'text-gray-500'}`}>
                      {isFirst ? firstChapter.desc : `Requires completion of Quest 1.${idx} to unseal.`}
                    </p>

                    <div className="pt-2 flex justify-between items-center">
                      <span className={`font-vt323 text-xs ${isFirst ? 'text-yellow-400' : 'text-gray-600'}`}>
                        +{50 * (idx + 1)} XP
                      </span>
                      {isFirst ? (
                        <button className="font-orbitron font-bold text-xs bg-cyan-400 hover:bg-cyan-300 text-black px-3 py-1 rounded pixel-corners-sm cursor-pointer shadow-[0_0_10px_rgba(34,211,238,0.5)]">
                          [ BEGIN QUEST ]
                        </button>
                      ) : (
                        <span className="font-vt323 text-xs text-gray-500">[ Complete Quest 1.{idx} ]</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-8 bg-[#151326]/80 border-2 border-dashed border-purple-500/40 rounded-xl pixel-corners text-center space-y-3">
              <span className="text-4xl block">📜</span>
              <h3 className="font-orbitron font-bold text-lg text-yellow-300">Sanctum Codex in Inscription</h3>
              <p className="font-vt323 text-base text-gray-300 max-w-md mx-auto">
                The trial curriculum for {realm.language} is currently being inscribed by the Realm Artificers. For full active gameplay, journey through the JavaScript Citadel!
              </p>
              <button
                onClick={onReturnToHall}
                className="mt-2 font-orbitron font-bold text-xs bg-yellow-400 hover:bg-yellow-300 text-black px-4 py-2 rounded pixel-corners-sm shadow-[0_0_15px_rgba(250,204,21,0.5)] cursor-pointer"
              >
                [ RETURN TO THE GREAT HALL ]
              </button>
            </div>
          )}
        </section>

        {/* Chapter 2 Locked Roadmap Preview (Eliminates bottom void) */}
        <section className="p-5 bg-[#0F0D1C] border border-[#2A264F] rounded-lg pixel-corners space-y-3 opacity-75">
          <div className="flex items-center justify-between">
            <h3 className="font-orbitron text-xs sm:text-sm font-bold text-gray-400 flex items-center gap-2">
              <span>🔒</span> {secondChapter ? `${secondChapter.tier}: ${secondChapter.title}` : 'CHAPTER 2: DEEPER EXPEDITIONS'}
            </h3>
            <span className="font-vt323 text-xs text-gray-500 bg-gray-900 px-2 py-0.5 border border-gray-800 rounded">
              UNSEALS AT LEVEL 2
            </span>
          </div>
          <p className="font-vt323 text-sm text-gray-500">
            {secondChapter?.desc || 'Advanced architecture, concurrency conduits, and cloud mastery await those who complete the initial initiation.'}
          </p>
          <div className="flex flex-wrap gap-2 pt-1 font-vt323 text-xs text-gray-600">
            <span>✦ 4 Forthcoming Trials</span>
            <span>•</span>
            <span>✦ Artifact Rewards</span>
            <span>•</span>
            <span>✦ +450 Bonus XP Upon Completion</span>
          </div>
        </section>

        {/* Sage Advice Footer in Realm */}
        <section className="p-4 bg-[#121024] border border-purple-500/40 rounded-lg pixel-corners-sm flex items-center gap-4">
          <div className="w-12 h-12 flex-shrink-0">
            <img
              src="/assets/wizard/wizard_working.png"
              alt="Byterion"
              className="w-full h-full object-contain"
              style={{ imageRendering: 'pixelated' }}
            />
          </div>
          <div className="flex-grow">
            <span className="font-orbitron text-[10px] text-yellow-400 font-bold block">
              SAGE BYTERION // MENTOR LOG
            </span>
            <p className="font-vt323 text-sm text-purple-200">
              {`"Your journey in ${realm.language} has begun. Take each quest one line at a time. The compiler is your forge."`}
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
