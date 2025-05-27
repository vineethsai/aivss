
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Shield, Brain, Eye, Lock, Zap, Database, UserX, Settings, Activity } from 'lucide-react';

export const OwaspTop10 = () => {
  const top10Risks = [
    {
      rank: 1,
      title: "Prompt Injection",
      icon: <Brain className="h-6 w-6" />,
      severity: "Critical",
      description: "Malicious manipulation of AI prompts to bypass safety measures or extract sensitive information.",
      examples: ["Direct prompt injection attacks", "Indirect injection via data sources", "Jailbreaking techniques"],
      impact: "Complete system compromise, data exfiltration, unauthorized actions"
    },
    {
      rank: 2,
      title: "Agent Hijacking",
      icon: <UserX className="h-6 w-6" />,
      severity: "High",
      description: "Unauthorized control or manipulation of AI agents to perform malicious actions.",
      examples: ["Session hijacking", "Identity spoofing", "Command injection"],
      impact: "Unauthorized system access, data manipulation, service disruption"
    },
    {
      rank: 3,
      title: "Training Data Poisoning",
      icon: <Database className="h-6 w-6" />,
      severity: "High",
      description: "Injection of malicious data into training datasets to compromise model behavior.",
      examples: ["Backdoor attacks", "Model bias injection", "Data corruption"],
      impact: "Model compromise, biased decisions, incorrect outputs"
    },
    {
      rank: 4,
      title: "Model DoS (Denial of Service)",
      icon: <Zap className="h-6 w-6" />,
      severity: "Medium",
      description: "Attacks designed to overwhelm or disable AI models and agent systems.",
      examples: ["Resource exhaustion", "Inference loops", "Memory bombs"],
      impact: "Service unavailability, performance degradation, resource exhaustion"
    },
    {
      rank: 5,
      title: "Supply Chain Vulnerabilities",
      icon: <Settings className="h-6 w-6" />,
      severity: "High",
      description: "Compromised components in the AI development and deployment pipeline.",
      examples: ["Malicious model weights", "Compromised libraries", "Insecure APIs"],
      impact: "Widespread compromise, backdoor access, data breaches"
    },
    {
      rank: 6,
      title: "Sensitive Information Disclosure",
      icon: <Eye className="h-6 w-6" />,
      severity: "High",
      description: "Unintended exposure of sensitive data through AI agent outputs or behaviors.",
      examples: ["Training data leakage", "PII exposure", "Model inversion attacks"],
      impact: "Privacy violations, regulatory compliance issues, reputation damage"
    },
    {
      rank: 7,
      title: "Insecure Plugin Design",
      icon: <Lock className="h-6 w-6" />,
      severity: "Medium",
      description: "Vulnerabilities in AI agent plugins and extensions that expand system capabilities.",
      examples: ["Insufficient input validation", "Privilege escalation", "Cross-plugin attacks"],
      impact: "System compromise, data access, functionality abuse"
    },
    {
      rank: 8,
      title: "Excessive Agency",
      icon: <Shield className="h-6 w-6" />,
      severity: "Medium",
      description: "AI agents granted excessive permissions or autonomy beyond intended scope.",
      examples: ["Over-privileged access", "Unconstrained actions", "Scope creep"],
      impact: "Unauthorized actions, data access, system modifications"
    },
    {
      rank: 9,
      title: "Overreliance",
      icon: <Activity className="h-6 w-6" />,
      severity: "Medium",
      description: "Excessive dependence on AI agents without adequate human oversight or validation.",
      examples: ["Blind trust in outputs", "Lack of verification", "Automated decision making"],
      impact: "Poor decisions, missed errors, accountability issues"
    },
    {
      rank: 10,
      title: "Model Theft",
      icon: <AlertTriangle className="h-6 w-6" />,
      severity: "Medium",
      description: "Unauthorized extraction or replication of proprietary AI models and algorithms.",
      examples: ["Model extraction attacks", "API abuse", "Reverse engineering"],
      impact: "Intellectual property theft, competitive advantage loss, misuse"
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'bg-red-500 hover:bg-red-600';
      case 'High': return 'bg-orange-500 hover:bg-orange-600';
      case 'Medium': return 'bg-yellow-500 hover:bg-yellow-600';
      default: return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  return (
    <section id="top10" className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-2">
            <AlertTriangle className="h-8 w-8 text-orange-400" />
            OWASP Top 10 for Agentic AI (2024)
          </h2>
          <p className="text-slate-300 text-lg max-w-3xl mx-auto">
            The most critical security risks in agentic AI systems, identified through industry research and expert consensus
          </p>
        </div>

        <div className="grid gap-6">
          {top10Risks.map((risk, index) => (
            <Card key={risk.rank} className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">
                      {risk.rank}
                    </div>
                    <div className="flex items-center gap-2 text-blue-400">
                      {risk.icon}
                    </div>
                    <CardTitle className="text-white text-xl">{risk.title}</CardTitle>
                  </div>
                  <Badge className={`${getSeverityColor(risk.severity)} text-white`}>
                    {risk.severity}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-slate-300 leading-relaxed">{risk.description}</p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-white font-semibold mb-2">Common Examples:</h4>
                    <ul className="text-slate-300 text-sm space-y-1">
                      {risk.examples.map((example, idx) => (
                        <li key={idx}>• {example}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-2">Potential Impact:</h4>
                    <p className="text-slate-300 text-sm">{risk.impact}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 bg-slate-800/30 border border-slate-700 rounded-lg p-6">
          <h3 className="text-white text-xl font-semibold mb-4">About This Classification</h3>
          <p className="text-slate-300 mb-4">
            This OWASP Top 10 for Agentic AI represents the most critical security risks specifically affecting 
            autonomous AI systems. Unlike traditional AI applications, agentic AI systems can make decisions 
            and take actions independently, creating unique security challenges that require specialized assessment.
          </p>
          <p className="text-slate-300">
            This list is based on industry research, security incidents, and expert consensus within the 
            AI security community. It serves as a foundation for organizations deploying agentic AI systems 
            to prioritize their security efforts and risk management strategies.
          </p>
        </div>
      </div>
    </section>
  );
};
