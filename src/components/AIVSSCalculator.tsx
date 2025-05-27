
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Calculator, Info } from 'lucide-react';

interface MetricValues {
  agentAutonomy: string;
  dataAccess: string;
  actionImpact: string;
  humanOversight: string;
  modelReliability: string;
  promptInjection: string;
  dataIntegrity: string;
  outputValidation: string;
}

export const AIVSSCalculator = () => {
  const [metrics, setMetrics] = useState<MetricValues>({
    agentAutonomy: '',
    dataAccess: '',
    actionImpact: '',
    humanOversight: '',
    modelReliability: '',
    promptInjection: '',
    dataIntegrity: '',
    outputValidation: ''
  });

  const [score, setScore] = useState(0);
  const [severity, setSeverity] = useState('None');

  const metricDefinitions = {
    agentAutonomy: {
      name: 'Agent Autonomy Level',
      values: {
        'H': { label: 'High (Fully Autonomous)', score: 0.85 },
        'M': { label: 'Medium (Semi-Autonomous)', score: 0.62 },
        'L': { label: 'Low (Human-Guided)', score: 0.27 }
      }
    },
    dataAccess: {
      name: 'Data Access Scope',
      values: {
        'H': { label: 'High (Sensitive/PII)', score: 0.85 },
        'M': { label: 'Medium (Internal Data)', score: 0.62 },
        'L': { label: 'Low (Public Data)', score: 0.27 }
      }
    },
    actionImpact: {
      name: 'Action Impact Potential',
      values: {
        'H': { label: 'High (Critical Systems)', score: 0.85 },
        'M': { label: 'Medium (Business Operations)', score: 0.62 },
        'L': { label: 'Low (Limited Scope)', score: 0.27 }
      }
    },
    humanOversight: {
      name: 'Human Oversight',
      values: {
        'H': { label: 'High (Continuous Monitoring)', score: 0.27 },
        'M': { label: 'Medium (Periodic Review)', score: 0.62 },
        'L': { label: 'Low (Minimal Oversight)', score: 0.85 }
      }
    },
    modelReliability: {
      name: 'Model Reliability',
      values: {
        'H': { label: 'High (Extensively Tested)', score: 0.27 },
        'M': { label: 'Medium (Standard Testing)', score: 0.62 },
        'L': { label: 'Low (Limited Testing)', score: 0.85 }
      }
    },
    promptInjection: {
      name: 'Prompt Injection Resistance',
      values: {
        'H': { label: 'High (Strong Defenses)', score: 0.27 },
        'M': { label: 'Medium (Basic Protections)', score: 0.62 },
        'L': { label: 'Low (Vulnerable)', score: 0.85 }
      }
    },
    dataIntegrity: {
      name: 'Data Integrity Controls',
      values: {
        'H': { label: 'High (Comprehensive)', score: 0.27 },
        'M': { label: 'Medium (Standard)', score: 0.62 },
        'L': { label: 'Low (Basic)', score: 0.85 }
      }
    },
    outputValidation: {
      name: 'Output Validation',
      values: {
        'H': { label: 'High (Strict Validation)', score: 0.27 },
        'M': { label: 'Medium (Standard Checks)', score: 0.62 },
        'L': { label: 'Low (Limited Validation)', score: 0.85 }
      }
    }
  };

  const calculateScore = () => {
    const values = Object.values(metrics).filter(v => v !== '');
    if (values.length === 0) return 0;

    const scores = values.map(value => {
      for (const metric of Object.values(metricDefinitions)) {
        if (metric.values[value as keyof typeof metric.values]) {
          return metric.values[value as keyof typeof metric.values].score;
        }
      }
      return 0;
    });

    const averageScore = scores.reduce((a, b) => a + b, 0) / scores.length;
    return Math.round(averageScore * 10 * 10) / 10; // Round to 1 decimal
  };

  const getSeverity = (score: number) => {
    if (score === 0) return 'None';
    if (score < 4.0) return 'Low';
    if (score < 7.0) return 'Medium';
    if (score < 9.0) return 'High';
    return 'Critical';
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Low': return 'bg-green-500';
      case 'Medium': return 'bg-yellow-500';
      case 'High': return 'bg-orange-500';
      case 'Critical': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  useEffect(() => {
    const newScore = calculateScore();
    setScore(newScore);
    setSeverity(getSeverity(newScore));
  }, [metrics]);

  const updateMetric = (key: keyof MetricValues, value: string) => {
    setMetrics(prev => ({ ...prev, [key]: value }));
  };

  return (
    <section id="calculator" className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-2">
            <Calculator className="h-8 w-8 text-blue-400" />
            AIVSS Calculator
          </h2>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Calculate vulnerability scores for agentic AI systems using our comprehensive scoring methodology
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {Object.entries(metricDefinitions).map(([key, metric]) => (
              <Card key={key} className="bg-slate-800/50 border-slate-700">
                <CardHeader className="pb-3">
                  <CardTitle className="text-white text-lg flex items-center gap-2">
                    {metric.name}
                    <Info className="h-4 w-4 text-slate-400" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Select value={metrics[key as keyof MetricValues]} onValueChange={(value) => updateMetric(key as keyof MetricValues, value)}>
                    <SelectTrigger className="w-full bg-slate-700 border-slate-600 text-white">
                      <SelectValue placeholder="Select level..." />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      {Object.entries(metric.values).map(([value, info]) => (
                        <SelectItem key={value} value={value} className="text-white hover:bg-slate-600">
                          {info.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="lg:col-span-1">
            <Card className="bg-slate-800/50 border-slate-700 sticky top-24">
              <CardHeader>
                <CardTitle className="text-white">AIVSS Score</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-5xl font-bold text-white mb-2">{score}</div>
                  <Badge className={`${getSeverityColor(severity)} text-white px-4 py-2`}>
                    {severity}
                  </Badge>
                </div>
                
                <div className="space-y-3">
                  <h4 className="text-white font-semibold">Score Interpretation:</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-slate-300">
                      <span>0.0</span>
                      <span className="text-gray-400">None</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>0.1 - 3.9</span>
                      <span className="text-green-400">Low</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>4.0 - 6.9</span>
                      <span className="text-yellow-400">Medium</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>7.0 - 8.9</span>
                      <span className="text-orange-400">High</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>9.0 - 10.0</span>
                      <span className="text-red-400">Critical</span>
                    </div>
                  </div>
                </div>

                {score > 0 && (
                  <div className="bg-slate-700/50 p-4 rounded-lg">
                    <h4 className="text-white font-semibold mb-2">Recommendations:</h4>
                    <ul className="text-sm text-slate-300 space-y-1">
                      {severity === 'Critical' && (
                        <>
                          <li>• Immediate action required</li>
                          <li>• Disable system if possible</li>
                          <li>• Implement emergency controls</li>
                        </>
                      )}
                      {severity === 'High' && (
                        <>
                          <li>• Priority remediation needed</li>
                          <li>• Increase monitoring</li>
                          <li>• Review access controls</li>
                        </>
                      )}
                      {severity === 'Medium' && (
                        <>
                          <li>• Plan remediation timeline</li>
                          <li>• Implement additional safeguards</li>
                          <li>• Regular security reviews</li>
                        </>
                      )}
                      {severity === 'Low' && (
                        <>
                          <li>• Continue monitoring</li>
                          <li>• Maintain current controls</li>
                          <li>• Regular assessments</li>
                        </>
                      )}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
