import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Link } from "react-router-dom";
import { createPageUrl } from "@/lib/utils"; // Assuming utils.ts is in src/lib
import { 
  Shield, 
  Wrench, 
  UserX, 
  GitBranch, 
  Users, 
  UserCog,
  Brain, 
  Server, 
  Package, 
  EyeOff, 
  Target,
  Calculator,
  ArrowRight,
  AlertTriangle
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const top10Vulnerabilities = [
  {
    rank: 1,
    name: "Agentic AI Tool Misuse",
    icon: Wrench,
    severity: "High",
    description: "Exploitation of agent's access to external or internal tools, including tool squatting attacks.",
    keyRisks: ["Unrestricted tool permissions", "Insecure tool invocation", "Tool squatting/impersonation"],
    color: "bg-red-600" // Darker red for better contrast on dark bg
  },
  {
    rank: 2,
    name: "Agent Access Control Violation",
    icon: UserX,
    severity: "High", 
    description: "Manipulation of agent permission systems causing operation beyond intended authorization boundaries.",
    keyRisks: ["Direct control hijacking", "Permission escalation", "Role inheritance exploitation"],
    color: "bg-red-600"
  },
  {
    rank: 3,
    name: "Agent Impact Chain and Blast Radius",
    icon: GitBranch,
    severity: "High",
    description: "Security compromise in one agent creating cascading effects across multiple systems.",
    keyRisks: ["Cascading failures", "Cross-system exploitation", "Impact amplification"],
    color: "bg-red-600"
  },
  {
    rank: 4,
    name: "Agent Orchestration and Multi-Agent Exploitation",
    icon: Users,
    severity: "High",
    description: "Attacks targeting vulnerabilities in how multiple AI agents interact and coordinate.",
    keyRisks: ["Inter-agent communication exploitation", "Trust relationship abuse", "Coordination protocol manipulation"],
    color: "bg-red-600"
  },
  {
    rank: 5,
    name: "Deepfake Agentic Identity",
    icon: UserCog,
    severity: "High",
    description: "Malicious creation or manipulation of agent identity using deepfake technologies.",
    keyRisks: ["Agent impersonation", "Human impersonation by agent", "Compromised identity verification"],
    color: "bg-red-600"
  },
  {
    rank: 6,
    name: "Agent Memory and Context Manipulation",
    icon: Brain,
    severity: "Medium",
    description: "Exploitation of vulnerabilities in how agents store and utilize contextual information.",
    keyRisks: ["Context amnesia exploitation", "Cross-session data leakage", "Memory poisoning"],
    color: "bg-orange-500" // Adjusted orange
  },
  {
    rank: 7,
    name: "Agent Critical Systems Interaction", 
    icon: Server,
    severity: "Medium",
    description: "Vulnerabilities when agents interact with critical infrastructure or sensitive systems.",
    keyRisks: ["Physical system manipulation", "IoT device compromise", "Critical infrastructure access"],
    color: "bg-orange-500"
  },
  {
    rank: 8,
    name: "Agent Supply Chain and Dependency Attacks",
    icon: Package,
    severity: "Medium", 
    description: "Attacks targeting the ecosystem of components and services that agents rely on.",
    keyRisks: ["Development chain attacks", "Dependency injection", "Service chain compromise"],
    color: "bg-orange-500"
  },
  {
    rank: 9,
    name: "Agent Untraceability",
    icon: EyeOff,
    severity: "Medium",
    description: "Agent autonomy and dynamic roles complicating traceability and forensic analysis.",
    keyRisks: ["Trace obscurity", "Exploiting autonomy complexity", "Forensic investigation hindrance"],
    color: "bg-orange-500"
  },
  {
    rank: 10,
    name: "Agent Goal and Instruction Manipulation",
    icon: Target,
    severity: "Medium",
    description: "Exploitation of how agents interpret and execute their assigned goals and instructions.",
    keyRisks: ["Goal interpretation attacks", "Instruction set poisoning", "Semantic manipulation"],
    color: "bg-orange-500"
  }
];

const OwaspTop10Page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-slate-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto px-2 md:px-6 py-8"> {/* User's root div, adjusted px */}
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-indigo-500/20 text-indigo-300 px-4 py-2 rounded-full text-sm font-medium mb-4"> {/* Adjusted style */}
              <Shield className="w-4 h-4" />
              OWASP Agentic AI Security Framework
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4"> {/* Adjusted style */}
              Top 10 Security Risks
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed"> {/* Adjusted style */}
              The most critical vulnerabilities specific to Agentic AI systems, providing a focused lens for 
              security professionals, developers, and organizations.
            </p>
          </div>

          {/* Statistics Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="text-center bg-slate-800/50 border-slate-700"> {/* Adjusted style */}
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center mx-auto mb-4"> {/* Adjusted style */}
                  <AlertTriangle className="w-6 h-6 text-red-400" /> {/* Adjusted style */}
                </div>
                <div className="text-2xl font-bold text-white mb-1">5</div> {/* Adjusted style */}
                <div className="text-sm text-slate-300">High Severity Risks</div> {/* Adjusted style */}
              </CardContent>
            </Card>
            
            <Card className="text-center bg-slate-800/50 border-slate-700"> {/* Adjusted style */}
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mx-auto mb-4"> {/* Adjusted style */}
                  <Target className="w-6 h-6 text-orange-400" /> {/* Adjusted style */}
                </div>
                <div className="text-2xl font-bold text-white mb-1">5</div> {/* Adjusted style */}
                <div className="text-sm text-slate-300">Medium Severity Risks</div> {/* Adjusted style */}
              </CardContent>
            </Card>
            
            <Card className="text-center bg-slate-800/50 border-slate-700"> {/* Adjusted style */}
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-indigo-500/20 rounded-lg flex items-center justify-center mx-auto mb-4"> {/* Adjusted style */}
                  <Calculator className="w-6 h-6 text-indigo-400" /> {/* Adjusted style */}
                </div>
                <div className="text-2xl font-bold text-white mb-1">AIVSS</div> {/* Adjusted style */}
                <div className="text-sm text-slate-300">Scoring Framework</div> {/* Adjusted style */}
              </CardContent>
            </Card>
          </div>

          {/* Top 10 List */}
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2"> {/* Adjusted style */}
                OWASP Agentic AI Top 10 Vulnerabilities
              </h2>
              <p className="text-slate-300"> {/* Adjusted style */}
                Ranked by severity and prevalence in Agentic AI systems
              </p>
            </div>

            {top10Vulnerabilities.map((vulnerability) => (
              <Card key={vulnerability.rank} className="overflow-hidden hover:shadow-xl transition-all duration-300 bg-slate-800/70 border-slate-700"> {/* Adjusted style */}
                <CardContent className="p-0">
                  <div className="flex">
                    {/* Rank indicator */}
                    <div className={`w-16 ${vulnerability.color} flex items-center justify-center`}>
                      <span className="text-2xl font-bold text-white">
                        {vulnerability.rank}
                      </span>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center"> {/* Adjusted style */}
                            <vulnerability.icon className="w-5 h-5 text-slate-300" /> {/* Adjusted style */}
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-white"> {/* Adjusted style */}
                              {vulnerability.name}
                            </h3>
                            <Badge 
                              variant={vulnerability.severity === 'High' ? 'destructive' : 'default'} /* Use default for medium, destructive for high */
                              className={`mt-1 ${vulnerability.severity === 'High' ? 'bg-red-500/80 text-white' : 'bg-orange-500/80 text-white'}`} /* Custom colors for badge */
                            >
                              {vulnerability.severity} Risk
                            </Badge>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-slate-300 mb-4"> {/* Adjusted style */}
                        {vulnerability.description}
                      </p>
                      
                      <div>
                        <h4 className="font-medium text-white mb-2">Key Risk Areas:</h4> {/* Adjusted style */}
                        <div className="flex flex-wrap gap-2">
                          {vulnerability.keyRisks.map((risk, idx) => (
                            <span 
                              key={idx}
                              className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-sm" /* Adjusted style */
                            >
                              {risk}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OwaspTop10Page; 