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
    name: "Base Metrics (CVSS-aligned)",
    description: "Assessing fundamental exploitability using CVSS v3.1 metrics",
    icon: Shield,
    items: ["Attack Vector", "Attack Complexity", "Privileges Required", "User Interaction", "Scope"]
  },
  {
    name: "Agentic AI Top 10 Metric", 
    description: "Quantifying severity of each OWASP Top 10 risk category",
    icon: Target,
    items: ["Category-specific scoring", "Agent Characteristics Multiplier", "System-specific assessment"]
  },
  {
    name: "Impact Metrics",
    description: "Evaluating potential consequences across multiple dimensions",
    icon: BarChart3,
    items: ["Confidentiality Impact", "Integrity Impact", "Availability Impact", "Societal Impact"]
  },
  {
    name: "Environmental & Temporal",
    description: "Contextualizing risk within deployment environment",
    icon: Layers,
    items: ["Environmental requirements", "Temporal factors", "Mitigation effectiveness"]
  }
];

const scoringGuidelines = [
  {
    range: "9.0-10.0",
    category: "Critical",
    color: "bg-red-500",
    description: "Severe vulnerabilities requiring immediate attention"
  },
  {
    range: "7.0-8.9", 
    category: "High",
    color: "bg-red-500",
    description: "Significant risks that should be prioritized"
  },
  {
    range: "4.0-6.9",
    category: "Medium", 
    color: "bg-orange-500",
    description: "Moderate risks requiring mitigation planning"
  },
  {
    range: "0.1-3.9",
    category: "Low",
    color: "bg-blue-500", 
    description: "Lower priority risks with basic controls needed"
  },
  {
    range: "0.0",
    category: "None",
    color: "bg-slate-400",
    description: "No significant risk identified"
  }
];

const AivssMethodologyPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-slate-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto px-2 md:px-6 py-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <BookOpen className="w-4 h-4" />
              AIVSS Framework Documentation
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Methodology & Framework
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Understanding the AIVSS-Agentic scoring methodology for comprehensive 
              security risk assessment of Agentic AI systems.
            </p>
          </div>

          <Card className="mb-12 bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-slate-100">
                <Calculator className="w-5 h-5" />
                AIVSS-Agentic Framework Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Alert className="mb-6 bg-slate-700/60 border-blue-500 text-slate-200">
                <Info className="h-4 w-4 text-blue-400" />
                <AlertDescription>
                  AIVSS-Agentic extends proven vulnerability scoring principles, tailoring them specifically 
                  to the nuances of the OWASP Agentic AI Top 10 vulnerabilities.
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
              <CardTitle className="text-slate-100">AIVSS Scoring Formula</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-slate-900/70 p-6 rounded-lg font-mono text-sm mb-6 text-slate-200">
                <div className="text-center mb-4 font-bold text-lg text-slate-100">
                  AIVSS Score = min(10.0, [Base × w₁ + Agentic × w₂ + Impact × w₃] × TMM × MEM)
                </div>
                <div className="grid md:grid-cols-3 gap-4 text-xs text-slate-300">
                  <div>
                    <strong>Where:</strong>
                    <ul className="mt-2 space-y-1">
                      <li>Base = CVSS Base Score</li>
                      <li>Agentic = Agentic AI Specific Score</li>
                      <li>Impact = Impact Metrics Score</li>
                    </ul>
                  </div>
                  <div>
                    <strong>Weights:</strong>
                    <ul className="mt-2 space-y-1">
                      <li>w₁ = 0.2 (Base)</li>
                      <li>w₂ = 0.6 (Agentic)</li>
                      <li>w₃ = 0.2 (Impact)</li>
                    </ul>
                  </div>
                  <div>
                    <strong>Multipliers:</strong>
                    <ul className="mt-2 space-y-1">
                      <li>TMM = Temporal Metrics</li>
                      <li>MEM = Mitigation Effectiveness</li>
                      <li>ACM = Agent Characteristics</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <Alert className="bg-slate-700/60 border-orange-500 text-slate-200">
                <AlertTriangle className="h-4 w-4 text-orange-400" />
                <AlertDescription>
                  The Agentic component receives the highest weighting (0.6) as it represents the 
                  unique risks specific to autonomous AI systems that traditional scoring doesn't capture.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          <Card className="mb-12 bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-slate-100">Risk Categories & Scoring Ranges</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {scoringGuidelines.map((guideline, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 border border-slate-700 rounded-lg bg-slate-800/70">
                    <div className={`w-4 h-4 rounded ${guideline.color}`}></div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-semibold text-slate-100">{guideline.category}</span>
                        <Badge variant="outline" className="border-slate-500 text-slate-300">{guideline.range}</Badge>
                      </div>
                      <p className="text-sm text-slate-300">{guideline.description}</p>
                    </div>
                  </div>
                ))}
              </div>
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
              <CardTitle className="text-slate-100">Assessment Process</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold text-blue-400">1</span>
                  </div>
                  <h4 className="font-semibold mb-2 text-slate-100">System Assessment</h4>
                  <p className="text-sm text-slate-300">
                    Define system characteristics, operational context, and determine ACM multiplier
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold text-green-400">2</span>
                  </div>
                  <h4 className="font-semibold mb-2 text-slate-100">Vulnerability Scoring</h4>
                  <p className="text-sm text-slate-300">
                    Evaluate each of the 10 vulnerability categories using CVSS metrics and impact assessment
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold text-purple-400">3</span>
                  </div>
                  <h4 className="font-semibold mb-2 text-slate-100">Risk Prioritization</h4>
                  <p className="text-sm text-slate-300">
                    Generate prioritized risk profile and develop targeted remediation strategies
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-12 bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-slate-100">Integration with Risk Management Frameworks</CardTitle>
            </CardHeader>
            <CardContent className="text-slate-300">
              <p className="mb-6">
                AIVSS-Agentic is designed to integrate seamlessly with existing enterprise risk management 
                and cybersecurity frameworks, enhancing overall risk assessment capabilities.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3 text-slate-100">Compatible Frameworks:</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• NIST Cybersecurity Framework (CSF)</li>
                    <li>• NIST AI Risk Management Framework</li>
                    <li>• ISO/IEC 27001/27002</li>
                    <li>• ISO/IEC 23894 (AI Risk Management)</li>
                    <li>• Industry-specific regulations</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3 text-slate-100">Benefits:</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Consistent risk quantification</li>
                    <li>• Improved resource allocation</li>
                    <li>• Enhanced audit capabilities</li>
                    <li>• Better stakeholder communication</li>
                    <li>• Data-driven decision making</li>
                  </ul>
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