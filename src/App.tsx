/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Network, 
  Terminal, 
  Shield, 
  Cpu, 
  ChevronRight, 
  CheckCircle2, 
  AlertCircle, 
  Server, 
  Search, 
  BookOpen, 
  MessageSquare,
  ArrowRight,
  Globe,
  Database
} from 'lucide-react';

// --- Types ---

interface RoadmapStep {
  title: string;
  desc: string;
  icon: any;
  skills: string[];
}

interface Scenario {
  id: number;
  title: string;
  problem: string;
  clues: string[];
  options: string[];
  correctIndex: number;
  explanation: string;
}

// --- Data ---

const ROADMAP: RoadmapStep[] = [
  {
    title: "Level 1: Foundations",
    desc: "Master the basics of hardware and operating systems.",
    icon: Cpu,
    skills: ["Binary numbers", "OSI Model", "Cable types", "CompTIA A+"]
  },
  {
    title: "Level 2: The Core (CCNA)",
    desc: "Understand Routing and Switching at an enterprise level.",
    icon: Network,
    skills: ["VLANs", "STP", "OSPF", "IP Subnetting", "Cisco IOS"]
  },
  {
    title: "Level 3: Infrastructure Security",
    desc: "Learn to protect the network you've built.",
    icon: Shield,
    skills: ["Firewalls", "VPNs", "ACLs", "RADIUS/TACACS+", "Encryption"]
  },
  {
    title: "Level 4: Network Automation",
    desc: "Scale your skills using modern coding practices.",
    icon: Terminal,
    skills: ["Python", "Ansible", "JSON/YAML APIs", "Netmiko"]
  },
  {
    title: "Level 5: Cloud & SD-WAN",
    desc: "Transition into modern hybrid infrastructures.",
    icon: Globe,
    skills: ["AWS Networking", "Azure ExpressRoute", "SD-WAN", "Direct Connect"]
  }
];

const SCENARIOS: Scenario[] = [
  {
    id: 1,
    title: "The Silent VLAN",
    problem: "A PC in VLAN 10 cannot ping a printer in VLAN 10 on the same switch.",
    clues: ["Both show Link UP", "Switchport modes are Access", "IPs are in the same subnet"],
    options: [
      "Missing Default Gateway",
      "VLAN 10 not created in Switch Database",
      "VLAN mismatch in trunk port",
      "Power failure on printer"
    ],
    correctIndex: 1,
    explanation: "Even if a port is assigned to a VLAN, that VLAN must exist in the switch's VLAN database (vlan.dat) to forward traffic."
  },
  {
    id: 2,
    title: "Unstable OSPF",
    problem: "Two routers are connected via GigabitEthernet but OSPF stuck in EXSTART state.",
    clues: ["Physical layer is stable", "Hello packets are received", "MTU mismatch?"],
    options: [
      "Passive interface enabled",
      "MTU Mismatch between interfaces",
      "Wrong Router ID",
      "Different Area IDs"
    ],
    correctIndex: 1,
    explanation: "If OSPF neighbor state is stuck in EXSTART/EXCHANGE, it often indicates an MTU mismatch, preventing large DBD packets from being synchronized."
  }
];

// --- Components ---

export default function App() {
  const [activeStep, setActiveStep] = useState(0);
  const [activeScenario, setActiveScenario] = useState<number | null>(null);
  const [scenarioAnswer, setScenarioAnswer] = useState<number | null>(null);

  const resetScenario = () => {
    setActiveScenario(null);
    setScenarioAnswer(null);
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col overflow-x-hidden">
      {/* Header Navigation */}
      <header className="bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">N</div>
          <h1 className="text-2xl font-black tracking-tight text-slate-800">
            NetMas<span className="text-indigo-600">!</span>
          </h1>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Lead Instructor</p>
            <p className="text-sm font-bold text-slate-700">Eng. Sadiq</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-slate-100 border-2 border-indigo-50 overflow-hidden flex items-center justify-center">
            <span className="text-indigo-600 font-bold">S</span>
          </div>
        </div>
      </header>

      <main className="flex-1 p-6 grid grid-cols-1 md:grid-cols-12 gap-6 max-w-7xl mx-auto w-full">
        {/* Sidebar Bio */}
        <section className="md:col-span-3 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h2 className="text-sm font-bold text-indigo-600 uppercase mb-3 tracking-wide">The Mentor</h2>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              Eng. Sadiq is a Senior Network Architect with 12+ years of experience in enterprise infrastructure. This platform is your curated roadmap to mastering the wires that connect the world.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-medium bg-slate-50 p-2 rounded shadow-inner">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Expert in Cisco/Juniper
              </div>
              <div className="flex items-center gap-2 text-xs font-medium bg-slate-50 p-2 rounded shadow-inner">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span> Cloud Infrastructure Lead
              </div>
            </div>
          </div>

          <div className="bg-indigo-900 p-6 rounded-2xl text-white shadow-xl shadow-indigo-200">
            <h2 className="text-sm font-bold uppercase mb-3 opacity-80 flex items-center gap-2">
              <Terminal size={14} /> Career Pro Tip
            </h2>
            <p className="text-sm italic mb-6 leading-relaxed">
              "Hands-on labs outweigh certifications every single time. Build your own GNS3 environment today and break things intentionally."
            </p>
            <button className="w-full bg-white text-indigo-900 py-3 rounded-xl font-bold text-xs uppercase tracking-tighter hover:bg-slate-50 transition-colors">
              Explore Career Guides
            </button>
          </div>
        </section>

        {/* Central Roadmap */}
        <section className="md:col-span-6 space-y-4">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 min-h-full flex flex-col">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold tracking-tight">Engineering Roadmap</h2>
              <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase rounded-full tracking-wide">
                {ROADMAP.length} Phases
              </span>
            </div>
            
            <div className="space-y-2 flex-1">
              {ROADMAP.map((step, idx) => (
                <div 
                  key={idx} 
                  onClick={() => setActiveStep(idx)}
                  className={`timeline-line cursor-pointer group transition-all ${activeStep === idx ? 'opacity-100' : 'opacity-60 hover:opacity-80'}`}
                >
                  <div className={activeStep === idx ? 'timeline-dot' : 'timeline-dot-inactive'}></div>
                  <div className={`p-4 rounded-xl -mt-4 transition-colors ${activeStep === idx ? 'bg-indigo-50/50' : 'hover:bg-slate-50'}`}>
                    <h3 className={`text-sm font-bold transition-colors ${activeStep === idx ? 'text-indigo-600' : 'text-slate-800'}`}>
                      PHASE {idx < 9 ? `0${idx + 1}` : idx + 1}: {step.title.split(': ')[1] || step.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">{step.desc}</p>
                    
                    {activeStep === idx && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-4 pt-4 border-t border-indigo-100/50 space-y-3"
                      >
                        <div className="flex flex-wrap gap-2">
                          {step.skills.map((skill, sIdx) => (
                            <span key={sIdx} className="text-[10px] font-bold bg-white px-2 py-1 rounded border border-indigo-100 text-indigo-600 uppercase">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 bg-slate-50 rounded-xl border border-dashed border-slate-300">
              <p className="text-[11px] text-slate-500 font-bold italic text-center underline cursor-pointer hover:text-indigo-600 transition-colors">
                Download Eng. Sadiq's Full 2026 Certification Guide PDF
              </p>
            </div>
          </div>
        </section>

        {/* Troubleshooting Scenarios (Incident Center) */}
        <section className="md:col-span-3 space-y-4">
          <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest px-2">Incident Center</h2>
          
          <div className="space-y-4">
            {SCENARIOS.map((s, idx) => (
              <div 
                key={idx}
                onClick={() => {
                  setActiveScenario(idx);
                  setScenarioAnswer(null);
                }}
                className={`bg-white p-5 rounded-xl shadow-sm border border-slate-100 cursor-pointer transition-all hover:shadow-md ${
                  activeScenario === idx ? 'ring-2 ring-indigo-600' : ''
                } ${idx === 0 ? 'border-l-4 border-l-red-500' : 'border-l-4 border-l-amber-500'}`}
              >
                <div className="flex justify-between items-start">
                  <span className={`text-[10px] font-black uppercase ${idx === 0 ? 'text-red-500' : 'text-amber-500'}`}>
                    {idx === 0 ? 'Critical' : 'Warning'}
                  </span>
                  {activeScenario === idx && <CheckCircle2 size={14} className="text-indigo-600" />}
                </div>
                <h3 className="text-sm font-bold mt-1 text-slate-800">{s.title}</h3>
                <p className="text-[11px] text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                  {s.problem}
                </p>
              </div>
            ))}
          </div>

          <AnimatePresence>
            {activeScenario !== null && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm"
              >
                <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                  <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-indigo-50/30">
                    <div>
                        <h4 className="text-xs font-black text-indigo-600 uppercase tracking-widest mb-1">Scenario Simulation</h4>
                        <h3 className="text-lg font-bold text-slate-800">{SCENARIOS[activeScenario].title}</h3>
                    </div>
                    <button onClick={resetScenario} className="text-slate-400 hover:text-slate-600">
                        <AlertCircle size={20} />
                    </button>
                  </div>
                  
                  <div className="p-8 overflow-y-auto space-y-6">
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <p className="text-xs font-bold text-slate-400 uppercase mb-2">Subject</p>
                        <p className="text-sm italic text-slate-700 leading-relaxed">"{SCENARIOS[activeScenario].problem}"</p>
                    </div>

                    <div className="space-y-3">
                        {SCENARIOS[activeScenario].options.map((option, oIdx) => (
                            <button
                                key={oIdx}
                                onClick={() => setScenarioAnswer(oIdx)}
                                disabled={scenarioAnswer !== null}
                                className={`w-full p-4 rounded-xl border text-left text-sm font-medium transition-all ${
                                    scenarioAnswer === oIdx 
                                        ? (oIdx === SCENARIOS[activeScenario].correctIndex ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-red-50 border-red-200 text-red-700')
                                        : 'bg-white border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/20'
                                }`}
                            >
                                {option}
                            </button>
                        ))}
                    </div>

                    {scenarioAnswer !== null && (
                        <div className={`p-4 rounded-xl text-sm leading-relaxed ${
                            scenarioAnswer === SCENARIOS[activeScenario].correctIndex ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-50 text-slate-600'
                        }`}>
                            <p className="font-bold mb-1">
                                {scenarioAnswer === SCENARIOS[activeScenario].correctIndex ? 'Correct Analysis' : 'Diagnostic Feedback'}
                            </p>
                            <p className="text-xs opacity-90">{SCENARIOS[activeScenario].explanation}</p>
                        </div>
                    )}
                  </div>

                  <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
                    <button 
                        onClick={resetScenario}
                        className="px-6 py-2 bg-indigo-600 text-white rounded-lg text-xs font-bold uppercase hover:bg-indigo-700 transition-colors"
                    >
                        Done
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="bg-slate-100 h-24 flex items-center justify-center rounded-xl border-2 border-dashed border-slate-200 group cursor-pointer hover:bg-slate-200 transition-colors">
            <button className="text-[10px] font-black text-slate-400 group-hover:text-slate-600 tracking-widest uppercase">
              + View All Scenarios
            </button>
          </div>
        </section>
      </main>

      <footer className="px-8 py-4 bg-white border-t border-slate-200 flex flex-col md:flex-row justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-wider gap-4">
        <div className="flex gap-6">
          <span className="flex items-center gap-2 flex-nowrap"><BookOpen size={12}/> Guides: 124</span>
          <span className="flex items-center gap-2 flex-nowrap"><Terminal size={12}/> Labs: 42</span>
          <span className="flex items-center gap-2 flex-nowrap"><Shield size={12}/> Students: 1,840</span>
        </div>
        <div className="text-center md:text-right">
          © 2026 NetMas! Platform — Curated by Eng. Sadiq
        </div>
      </footer>
    </div>
  );
}
