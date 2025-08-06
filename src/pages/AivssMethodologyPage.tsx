import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Calculator, 
  Shield, 
  Target, 
  Layers, 
  BarChart3,
  CheckCircle,
  AlertTriangle,
  Info
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const frameworkComponents = [
  {
    name: "Base Metrics (CVSS v3.1 aligned)",
    description: "Traditional exploitability and impact assessment using established CVSS methodology",
    icon: Shield,
    items: ["Attack Vector (AV)", "Attack Complexity (AC)", "Privileges Required (PR)", "User Interaction (UI)", "Scope (S)"]
  },
  {
    name: "AIVSS Specific Severity", 
    description: "Quantifying the severity of manifestation for each OWASP Agentic AI Core Security Risk",
    icon: Target,
    items: ["Risk category assessment (0.0-1.0)", "Agent Characteristics Multiplier (ACM)", "Context-specific evaluation"]
  },
  {
    name: "Impact Assessment",
    description: "Comprehensive impact evaluation across multiple dimensions including societal consequences",
    icon: BarChart3,
    items: ["Confidentiality Impact (C)", "Integrity Impact (I)", "Availability Impact (A)", "Societal Impact (S)"]
  },
  {
    name: "Temporal & Environmental",
    description: "Dynamic factors affecting vulnerability relevance and exploitability over time",
    icon: Layers,
    items: ["Exploit Code Maturity", "Remediation Level", "Report Confidence", "Environmental context"]
  }
];

const AivssMethodologyPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-slate-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto px-2 md:px-6 py-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-indigo-500/20 text-indigo-300 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <BookOpen className="w-4 h-4" />
              AIVSS v0.5 Framework Documentation
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">
              AI Vulnerability Scoring System (AIVSS)
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              A specialized vulnerability scoring methodology for assessing security risks 
              in OWASP Agentic AI Core Security vulnerabilities.
            </p>
          </div>

          <Card className="mb-12 bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-slate-100">
                <Calculator className="w-5 h-5" />
                AIVSS Framework Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Alert className="mb-6 bg-slate-700/60 border-blue-500 text-slate-200">
                <Info className="h-4 w-4 text-blue-400" />
                <AlertDescription>
                  AIVSS v0.5 extends CVSS v3.1 principles with additional metrics specifically designed 
                  for OWASP Agentic AI Core Security Risks, incorporating agent characteristics and societal impact.
                </AlertDescription>
              </Alert>
              
              <div className="grid md:grid-cols-2 gap-6">
                {frameworkComponents.map((component, index) => (
                  <Card key={index} className="border-slate-700 bg-slate-800/70">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-indigo-500/20 rounded-lg flex items-center justify-center">
                          <component.icon className="w-5 h-5 text-indigo-400" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-slate-100 mb-2">{component.name}</h4>
                          <p className="text-sm text-slate-300 mb-3">{component.description}</p>
                          <ul className="text-xs text-slate-400 space-y-1">
                            {component.items.map((item, idx) => (
                              <li key={idx} className="flex items-center gap-2">
                                <CheckCircle className="w-3 h-3 text-green-400" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="mb-12 bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-slate-100">AIVSS v0.5 Scoring Formula</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-slate-900/70 p-6 rounded-lg font-mono text-sm mb-6 text-slate-200">
                <div className="text-center mb-4 font-bold text-lg text-slate-100">
                  AIVSS Score = min(10, [(w₁ × CVSS Base) + (w₂ × Agentic Specific) + (w₃ × Impact)] × Temporal × Mitigation)
                </div>
                <div className="grid md:grid-cols-3 gap-4 text-xs text-slate-300">
                  <div>
                    <strong>Core Components:</strong>
                    <ul className="mt-2 space-y-1">
                      <li>CVSS Base = Traditional exploitability</li>
                      <li>Agentic Specific = (Severity × ACM)</li>
                      <li>Impact = Overall impact score (0-10)</li>
                    </ul>
                  </div>
                  <div>
                    <strong>Default Weights:</strong>
                    <ul className="mt-2 space-y-1">
                      <li>w₁ = 0.2 (CVSS Base)</li>
                      <li>w₂ = 0.6 (Agentic Specific)</li>
                      <li>w₃ = 0.2 (Impact)</li>
                    </ul>
                  </div>
                  <div>
                    <strong>Modifiers:</strong>
                    <ul className="mt-2 space-y-1">
                      <li>Temporal = Exploit maturity factor</li>
                      <li>Mitigation = Effectiveness multiplier</li>
                      <li>ACM = Agent Characteristics (1.0-2.0)</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <Alert className="bg-slate-700/60 border-orange-500 text-slate-200">
                <AlertTriangle className="h-4 w-4 text-orange-400" />
                <AlertDescription>
                  The Agentic Specific component receives the highest weight (0.6) to emphasize the unique security 
                  characteristics of autonomous AI systems that traditional CVSS scoring doesn't adequately capture.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          <Card className="mb-12 bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-slate-100">OWASP Agentic AI Core Security Risks</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300 mb-6">
                AIVSS v0.5 is specifically designed to assess the following 10 core security risks 
                identified by the OWASP Agentic AI Security Initiative:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-slate-800/70 rounded-lg">
                    <span className="w-6 h-6 bg-red-600 text-white text-sm font-bold rounded flex items-center justify-center">1</span>
                    <span className="text-slate-200 text-sm">Agent Authorization and Control Hijacking</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-slate-800/70 rounded-lg">
                    <span className="w-6 h-6 bg-red-600 text-white text-sm font-bold rounded flex items-center justify-center">2</span>
                    <span className="text-slate-200 text-sm">Agent Critical Systems Interaction</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-slate-800/70 rounded-lg">
                    <span className="w-6 h-6 bg-red-600 text-white text-sm font-bold rounded flex items-center justify-center">3</span>
                    <span className="text-slate-200 text-sm">Agent Goal and Instruction Manipulation</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-slate-800/70 rounded-lg">
                    <span className="w-6 h-6 bg-red-600 text-white text-sm font-bold rounded flex items-center justify-center">4</span>
                    <span className="text-slate-200 text-sm">Agent Impact Chain and Blast Radius</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-slate-800/70 rounded-lg">
                    <span className="w-6 h-6 bg-red-600 text-white text-sm font-bold rounded flex items-center justify-center">5</span>
                    <span className="text-slate-200 text-sm">Agent Memory and Context Manipulation</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-slate-800/70 rounded-lg">
                    <span className="w-6 h-6 bg-orange-500 text-white text-sm font-bold rounded flex items-center justify-center">6</span>
                    <span className="text-slate-200 text-sm">Agent Orchestration and Multi-Agent Exploitation</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-slate-800/70 rounded-lg">
                    <span className="w-6 h-6 bg-orange-500 text-white text-sm font-bold rounded flex items-center justify-center">7</span>
                    <span className="text-slate-200 text-sm">Agent Supply Chain and Dependency Attacks</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-slate-800/70 rounded-lg">
                    <span className="w-6 h-6 bg-orange-500 text-white text-sm font-bold rounded flex items-center justify-center">8</span>
                    <span className="text-slate-200 text-sm">Agent Untraceability and Accountability</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-slate-800/70 rounded-lg">
                    <span className="w-6 h-6 bg-orange-500 text-white text-sm font-bold rounded flex items-center justify-center">9</span>
                    <span className="text-slate-200 text-sm">Agent Checker Out of the Loop</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-slate-800/70 rounded-lg">
                    <span className="w-6 h-6 bg-orange-500 text-white text-sm font-bold rounded flex items-center justify-center">10</span>
                    <span className="text-slate-200 text-sm">Agent Alignment Faking</span>
                  </div>
                </div>
              </div>
              <Alert className="mt-6 bg-slate-700/60 border-indigo-500 text-slate-200">
                <Info className="h-4 w-4 text-indigo-400" />
                <AlertDescription>
                  Each risk category has specific assessment criteria and can be evaluated using the AIVSS calculator 
                  to determine relative priority and mitigation planning.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          <Card className="mb-12 bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-slate-100">Agent Characteristics Multiplier (ACM)</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300 mb-6">
                The ACM reflects how inherent properties of the Agentic AI system amplify security risks. 
                It ranges from 1.0 to 2.0 based on the system's characteristics.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 text-slate-300">
                <div>
                  <h4 className="font-semibold mb-3 text-slate-100">Key Characteristics Evaluated:</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <strong>Autonomy:</strong> Level of independent decision-making
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <strong>Dynamic Identity:</strong> Ability to assume different roles
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <strong>Delegation:</strong> Task distribution capabilities
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <strong>Tool Use:</strong> External tool integration and usage
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <strong>Memory Use:</strong> Persistent context and learning
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3 text-slate-100">ACM Ranges:</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>1.0:</span>
                      <span className="text-slate-400">Low agentic characteristics</span>
                    </div>
                    <div className="flex justify-between">
                      <span>1.1-1.3:</span>
                      <span className="text-slate-400">Moderate characteristics</span>
                    </div>
                    <div className="flex justify-between">
                      <span>1.4-1.5:</span>
                      <span className="text-slate-400">High characteristics</span>
                    </div>
                    <div className="flex justify-between">
                      <span>1.6-2.0:</span>
                      <span className="text-slate-400">Very high characteristics</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-12 bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-slate-100">AIVSS Assessment Process</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold text-blue-400">1</span>
                  </div>
                  <h4 className="font-semibold mb-2 text-slate-100">Risk Identification</h4>
                  <p className="text-sm text-slate-300">
                    Identify which of the 10 OWASP Agentic AI Core Security Risks apply to your system
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold text-green-400">2</span>
                  </div>
                  <h4 className="font-semibold mb-2 text-slate-100">AIVSS Scoring</h4>
                  <p className="text-sm text-slate-300">
                    Apply AIVSS methodology using CVSS base metrics, agentic severity, and impact assessment
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold text-purple-400">3</span>
                  </div>
                  <h4 className="font-semibold mb-2 text-slate-100">Risk Prioritization</h4>
                  <p className="text-sm text-slate-300">
                    Generate numerical scores to prioritize remediation efforts and resource allocation
                  </p>
                </div>
              </div>
              
              <div className="mt-8 p-6 bg-slate-900/50 rounded-lg">
                <h4 className="font-semibold mb-4 text-slate-100">Key Assessment Considerations:</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-slate-300">
                  <div>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        Agent autonomy level and decision-making scope
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        System integration complexity and blast radius
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        Potential societal and downstream impacts
                      </li>
                    </ul>
                  </div>
                  <div>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        Traditional exploitability factors (CVSS)
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        Environmental and temporal context
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        Existing mitigation effectiveness
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-12 bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-slate-100">Documentation and Resources</CardTitle>
            </CardHeader>
            <CardContent className="text-slate-300">
              <p className="mb-6">
                AIVSS v0.5 provides a standardized approach to vulnerability assessment for Agentic AI systems, 
                enabling consistent risk evaluation and comparison across different implementations and organizations.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3 text-slate-100">Key Features:</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Extends proven CVSS v3.1 methodology</li>
                    <li>• Incorporates agent-specific characteristics</li>
                    <li>• Includes societal impact assessment</li>
                    <li>• Provides numerical scoring for prioritization</li>
                    <li>• Supports risk communication and reporting</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3 text-slate-100">Applications:</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Security assessment and audit</li>
                    <li>• Risk management and planning</li>
                    <li>• Compliance and regulatory reporting</li>
                    <li>• Resource allocation decisions</li>
                    <li>• Stakeholder communication</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-8 p-6 bg-slate-900/50 rounded-lg">
                <h4 className="font-semibold mb-4 text-slate-100">Get Started with AIVSS:</h4>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a 
                    href="/AIVSS Scoring System For OWASP Agentic AI Core Security Risks v0.5.pdf" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg font-medium transition-colors"
                  >
                    <BookOpen className="w-5 h-5" />
                    Download Full Methodology (PDF)
                  </a>
                  <a 
                    href="/"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
                  >
                    <Calculator className="w-5 h-5" />
                    Use AIVSS Calculator
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AivssMethodologyPage; 