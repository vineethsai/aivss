import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { HelpCircle, Zap, RefreshCw, Download, FileText } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, PieChart, Pie, Cell, RadialBarChart, RadialBar, PolarAngleAxis } from 'recharts';

// Configuration objects (can be moved to a shared util if used elsewhere)
const cvssOptionsConfig = {
  attackVector: [
    { value: "N", label: "Network (N)", score: 0.85, description: "Exploitable remotely, across the internet." },
    { value: "A", label: "Adjacent Network (A)", score: 0.62, description: "Exploitable from the same local network." },
    { value: "L", label: "Local (L)", score: 0.55, description: "Requires local access to the system." },
    { value: "P", label: "Physical (P)", score: 0.20, description: "Requires physical access to the system." }
  ],
  attackComplexity: [
    { value: "L", label: "Low (L)", score: 0.77, description: "No special conditions or significant effort." },
    { value: "H", label: "High (H)", score: 0.44, description: "Requires attacker to overcome significant hurdles." }
  ],
  privilegesRequired: [
    { value: "N", label: "None (N)", score: 0.85, description: "No privileges needed." },
    { value: "L", label: "Low (L)", score: 0.62, description: "Basic user privileges required." },
    { value: "H", label: "High (H)", score: 0.27, description: "Administrative or significant privileges." }
  ],
  userInteraction: [
    { value: "N", label: "None (N)", score: 0.85, description: "No user interaction needed." },
    { value: "R", label: "Required (R)", score: 0.62, description: "Requires a user to take some action." }
  ],
  scope: [
    { value: "U", label: "Unchanged (U)", score: 1.0, description: "Exploit impacts only the vulnerable component." },
    { value: "C", label: "Changed (C)", score: 1.0, description: "Exploit can impact resources beyond the vulnerable component." }
  ]
};

const impactOptionsConfig = [
  { value: 0.0, label: "None (N)" },
  { value: 0.22, label: "Low (L)" },
  { value: 0.56, label: "High (H)" }
];

const societalImpactOptionsConfig = [
    { value: 0.0, label: "None (N)" },
    { value: 0.22, label: "Low (L)" },
    { value: 0.55, label: "Medium (M)" },
    { value: 0.85, label: "High (H)" }
];

const categorySeverityOptions = [
    { value: 0.1, label: "0.0-0.2 (Minimal / Well Mitigated)"},
    { value: 0.3, label: "0.3-0.4 (Low Manifestation)"},
    { value: 0.5, label: "0.5-0.6 (Moderate Manifestation)"},
    { value: 0.7, label: "0.7-0.8 (High Manifestation)"},
    { value: 0.9, label: "0.9-1.0 (Severe Manifestation)"}
];

const acmOptions = [1.0, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.0].map(val => ({value: val, label: val.toFixed(1)}));

const initialFormState = {
  threatName: "Unnamed Threat",
  aivssSpecificSeverity: 0.5,
  acm: 1.2,
  cvssMetrics: { attackVector: "N", attackComplexity: "L", privilegesRequired: "N", userInteraction: "N", scope: "U" },
  impactMetrics: { confidentiality: 0.56, integrity: 0.56, availability: 0.56, societal: 0.55 },
};

export const AIVSSCalculator = () => {
  const [formData, setFormData] = useState(initialFormState);
  const [calculatedScores, setCalculatedScores] = useState(null);

  const handleInputChange = (section, field, value) => {
    if (section) {
      setFormData(prev => ({
        ...prev,
        [section]: { ...prev[section], [field]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
        }
  };

  const resetForm = () => {
    setFormData(initialFormState);
    setCalculatedScores(null);
  };

  useEffect(() => {
    // CVSS Base Score Calculation (version 3.1)
    const { attackVector, attackComplexity, privilegesRequired, userInteraction, scope } = formData.cvssMetrics;
    const { confidentiality, integrity, availability, societal } = formData.impactMetrics;

    const avScore = cvssOptionsConfig.attackVector.find(o => o.value === attackVector)?.score || 0;
    const acScore = cvssOptionsConfig.attackComplexity.find(o => o.value === attackComplexity)?.score || 0;
    let prScore = cvssOptionsConfig.privilegesRequired.find(o => o.value === privilegesRequired)?.score || 0;
    if (scope === "C") {
        if (privilegesRequired === "L") prScore = 0.68;
        else if (privilegesRequired === "H") prScore = 0.50;
    }
    const uiScore = cvssOptionsConfig.userInteraction.find(o => o.value === userInteraction)?.score || 0;

    const exploitabilitySubScore = 8.22 * avScore * acScore * prScore * uiScore;
    const iscBase = 1 - ((1 - confidentiality) * (1 - integrity) * (1 - availability));
    let impactSubScore;
    if (scope === "U") {
      impactSubScore = 6.42 * iscBase;
    } else {
      impactSubScore = 7.52 * (iscBase - 0.029) - 3.25 * Math.pow(Math.max(0, iscBase - 0.02), 15); // Ensure non-negative base for pow
    }
    impactSubScore = Math.max(0, impactSubScore);

    let cvssBaseScore;
    if (impactSubScore <= 0) {
      cvssBaseScore = 0;
    } else {
      if (scope === "U") {
        cvssBaseScore = Math.min(10, (exploitabilitySubScore + impactSubScore));
      } else {
        cvssBaseScore = Math.min(10, (1.08 * (exploitabilitySubScore + impactSubScore)));
      }
    }
    cvssBaseScore = Math.round(cvssBaseScore * 10) / 10;
    
    // AIVSS Specific Scores
    const agenticSpecificMetricComponent = Math.min(10, (formData.aivssSpecificSeverity * 10) * formData.acm);
    const overallImpactScore = Math.min(10, ((confidentiality + integrity + availability + societal) / 4) * 10);

    const temporalMultiplier = 0.97; 
    const mitigationEffectivenessMultiplier = 1.0;
    const weights = { base: 0.2, agentic: 0.6, impact: 0.2 };

    const finalAivssScoreRaw = 
      ((weights.base * cvssBaseScore) + 
       (weights.agentic * agenticSpecificMetricComponent) + 
       (weights.impact * overallImpactScore)) * temporalMultiplier * mitigationEffectivenessMultiplier;
    
    const finalAivssScore = Math.min(10, Math.round(finalAivssScoreRaw * 10) / 10);
    
    const getRiskCategory = (score) => {
      if (score >= 9.0) return "Critical";
      if (score >= 7.0) return "High";
      if (score >= 4.0) return "Medium";
      if (score >= 0.1) return "Low";
      return "None";
    };

    setCalculatedScores({
      cvssBaseScore,
      agenticSpecificMetricComponent: parseFloat(agenticSpecificMetricComponent.toFixed(1)),
      overallImpactScore: parseFloat(overallImpactScore.toFixed(1)),
      finalAivssScore,
      riskCategory: getRiskCategory(finalAivssScore),
      weightedCvss: parseFloat((weights.base * cvssBaseScore).toFixed(2)),
      weightedAgentic: parseFloat((weights.agentic * agenticSpecificMetricComponent).toFixed(2)),
      weightedImpact: parseFloat((weights.impact * overallImpactScore).toFixed(2))
    });
  }, [formData]);
  
  const renderTooltip = (description) => (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          <HelpCircle className="w-3.5 h-3.5 text-slate-400 hover:text-slate-600 cursor-help ml-1.5" />
        </TooltipTrigger>
        <TooltipContent className="max-w-xs bg-slate-800 text-white p-2 rounded-md shadow-lg text-xs">
          <p>{description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

  const scoreComponentData = calculatedScores ? [
    { name: 'CVSS Base (Weighted)', value: calculatedScores.weightedCvss, fill: '#8884d8' },
    { name: 'Agentic Specific (Weighted)', value: calculatedScores.weightedAgentic, fill: '#82ca9d' },
    { name: 'Impact (Weighted)', value: calculatedScores.weightedImpact, fill: '#ffc658' },
  ] : [];
  
  const gaugeData = calculatedScores ? [{ name: 'AIVSS Score', value: calculatedScores.finalAivssScore }] : [{ name: 'AIVSS Score', value: 0 }];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8" id="calculator">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 pb-4 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <Zap className="w-8 h-8 text-indigo-400" />
          <h1 className="text-3xl font-bold text-slate-100">AIVSS Calculator</h1>
        </div>
        <Button variant="outline" onClick={resetForm} size="sm" className="bg-slate-700 hover:bg-slate-600 border-slate-600 text-slate-100">
          <RefreshCw className="w-4 h-4 mr-2"/>
          Reset Calculator
        </Button>
      </div>

      {/* Reference Section */}
      <Card className="bg-slate-800 border-slate-700 shadow-xl mb-6">
        <CardHeader>
          <CardTitle className="text-lg text-slate-100 flex items-center gap-2">
            <FileText className="w-5 h-5" />
            AIVSS Documentation & Resources
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="text-slate-300">
              <p className="text-sm mb-1">
                This calculator implements the <strong>AIVSS v0.5</strong> scoring methodology for OWASP Agentic AI Core Security Risks.
              </p>
              <p className="text-xs text-slate-400">
                Download the complete specification document for detailed methodology and examples.
              </p>
            </div>
            <a 
              href="/AIVSS Scoring System For OWASP Agentic AI Core Security Risks v0.5.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-sm font-medium transition-colors"
            >
              <Download className="w-4 h-4" />
              Download AIVSS v0.5 PDF
            </a>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Inputs Column */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="bg-slate-800 border-slate-700 shadow-xl">
            <CardHeader><CardTitle className="text-lg text-slate-100">Threat Details</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="threatName" className="text-slate-300">Threat/Vulnerability Name</Label>
                <Input id="threatName" value={formData.threatName} onChange={(e) => handleInputChange(null, 'threatName', e.target.value)} className="bg-slate-700 border-slate-600 text-slate-100 focus:ring-indigo-500" />
              </div>
              <div>
                <Label htmlFor="aivssSpecificSeverity" className="flex items-center text-slate-300">
                  AIVSS Specific Severity (0.0-1.0) {renderTooltip("How severely this threat manifests in the specific AI context (0=None, 1=Severe).")}
                </Label>
                 <Select value={formData.aivssSpecificSeverity.toString()} onValueChange={(val) => handleInputChange(null, 'aivssSpecificSeverity', parseFloat(val))}>
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-slate-100 focus:ring-indigo-500"><SelectValue /></SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700 text-slate-100">
                        {categorySeverityOptions.map(opt => <SelectItem key={opt.value} value={opt.value.toString()} className="hover:bg-slate-700 focus:bg-slate-700">{opt.label} ({opt.value})</SelectItem>)}
                    </SelectContent>
                </Select>
                <Input type="number" min="0.0" max="1.0" step="0.01" value={formData.aivssSpecificSeverity}
                    onChange={(e) => { const val = parseFloat(e.target.value); if (!isNaN(val) && val >= 0.0 && val <= 1.0) { handleInputChange(null, 'aivssSpecificSeverity', val); } else if (e.target.value === "") {handleInputChange(null, 'aivssSpecificSeverity', 0)}}}
                    className="mt-1 text-sm bg-slate-700 border-slate-600 text-slate-100 focus:ring-indigo-500" placeholder="Custom 0.0-1.0"/>
              </div>
              <div>
                <Label htmlFor="acm" className="flex items-center text-slate-300">
                  Agent Char. Multiplier (ACM) {renderTooltip("Amplifying factor based on AI's agentic properties (1.0=Low, 2.0=Very High).")}
                </Label>
                <Select value={formData.acm.toString()} onValueChange={(val) => handleInputChange(null, 'acm', parseFloat(val))}>
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-slate-100 focus:ring-indigo-500"><SelectValue /></SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700 text-slate-100">
                      {acmOptions.map(opt => <SelectItem key={opt.value} value={opt.value.toString()} className="hover:bg-slate-700 focus:bg-slate-700">{opt.label}</SelectItem>)}
                    </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700 shadow-xl">
            <CardHeader><CardTitle className="text-lg text-slate-100">CVSS Base Metrics</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {Object.entries(cvssOptionsConfig).map(([key, options]) => (
                <div key={key}>
                  <Label htmlFor={`cvss-${key}`} className="text-sm capitalize flex items-center text-slate-300">
                    {key.replace(/([A-Z])/g, ' $1').trim()} {renderTooltip(options.find(o => o.value === formData.cvssMetrics[key])?.description || "")}
                  </Label>
                  <Select value={formData.cvssMetrics[key]} onValueChange={(value) => handleInputChange('cvssMetrics', key, value)}>
                    <SelectTrigger id={`cvss-${key}`} className="text-xs h-9 bg-slate-700 border-slate-600 text-slate-100 focus:ring-indigo-500"><SelectValue /></SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700 text-slate-100">
                      {options.map(option => <SelectItem key={option.value} value={option.value} className="text-xs hover:bg-slate-700 focus:bg-slate-700">{option.label}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700 shadow-xl">
            <CardHeader><CardTitle className="text-lg text-slate-100">Impact Metrics</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {[
                {key: "confidentiality", label: "Confidentiality", options: impactOptionsConfig},
                {key: "integrity", label: "Integrity", options: impactOptionsConfig},
                {key: "availability", label: "Availability", options: impactOptionsConfig},
                {key: "societal", label: "Societal", options: societalImpactOptionsConfig}
              ].map(metric => (
                <div key={metric.key}>
                  <Label htmlFor={`impact-${metric.key}`} className="text-sm text-slate-300">{metric.label}</Label>
                  <Select value={formData.impactMetrics[metric.key].toString()} onValueChange={(value) => handleInputChange('impactMetrics', metric.key, parseFloat(value))}>
                    <SelectTrigger id={`impact-${metric.key}`} className="text-xs h-9 bg-slate-700 border-slate-600 text-slate-100 focus:ring-indigo-500"><SelectValue /></SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700 text-slate-100">
                      {metric.options.map(option => <SelectItem key={option.value} value={option.value.toString()} className="text-xs hover:bg-slate-700 focus:bg-slate-700">{option.label}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              ))}
                </CardContent>
              </Card>
          </div>

        {/* Results and Graphs Column */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-indigo-600 text-white shadow-xl">
              <CardHeader>
              <CardTitle className="text-xl text-center">Final AIVSS Score</CardTitle>
              </CardHeader>
            <CardContent className="text-center pb-8">
              <p className="text-6xl font-bold my-2">
                {calculatedScores ? calculatedScores.finalAivssScore.toFixed(1) : "0.0"}
              </p>
              <Badge 
                className={`text-lg px-4 py-1 font-semibold ${
                  calculatedScores?.riskCategory === "Critical" || calculatedScores?.riskCategory === "High" ? "bg-red-100 text-red-700" :
                  calculatedScores?.riskCategory === "Medium" ? "bg-orange-100 text-orange-700" :
                  calculatedScores?.riskCategory === "Low" ? "bg-yellow-100 text-yellow-700" : "bg-slate-100 text-slate-700"
                }`}
              >
                {calculatedScores ? calculatedScores.riskCategory : "None"} Risk
                  </Badge>
            </CardContent>
          </Card>
                
          <Card className="bg-slate-800 border-slate-700 shadow-xl">
            <CardHeader><CardTitle className="text-lg text-slate-100">Score Breakdown</CardTitle></CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-300">
                <div className="flex justify-between items-center p-2 bg-slate-700/50 rounded"><span>CVSS Base Score:</span> <span className="font-semibold text-base text-slate-100">{calculatedScores ? calculatedScores.cvssBaseScore.toFixed(1) : "0.0"}</span></div>
                <div className="flex justify-between items-center p-2 bg-slate-700/50 rounded"><span>Agentic Specific Metric Component:</span> <span className="font-semibold text-base text-slate-100">{calculatedScores ? calculatedScores.agenticSpecificMetricComponent.toFixed(1) : "0.0"}</span></div>
                <div className="flex justify-between items-center p-2 bg-slate-700/50 rounded"><span>Overall Impact Score (0-10):</span> <span className="font-semibold text-base text-slate-100">{calculatedScores ? calculatedScores.overallImpactScore.toFixed(1) : "0.0"}</span></div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700 shadow-xl">
            <CardHeader><CardTitle className="text-lg text-slate-100">AIVSS Score Gauge</CardTitle></CardHeader>
            <CardContent className="h-60 md:h-72">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart 
                  innerRadius="50%" 
                  outerRadius="90%" 
                  data={gaugeData} 
                  startAngle={180} 
                  endAngle={0}
                >
                  <PolarAngleAxis type="number" domain={[0, 10]} angleAxisId={0} tick={false} />
                  <RadialBar 
                    background 
                    dataKey="value" 
                    cornerRadius={10}
                    angleAxisId={0}
                  >
                    {gaugeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={
                        entry.value >= 9 ? '#dc2626' : // Critical
                        entry.value >= 7 ? '#f87171' : // High
                        entry.value >= 4 ? '#fb923c' : // Medium
                        entry.value >= 0.1 ? '#facc15' : // Low
                        '#64748b' // None (slate-500)
                      } />
                    ))}
                  </RadialBar>
                  <RechartsTooltip contentStyle={{fontSize: '12px', backgroundColor: '#1e293b', borderColor: '#334155'}} itemStyle={{color: '#cbd5e1'}} labelStyle={{color: '#94a3b8'}}/>
                  <text x="50%" y="65%" textAnchor="middle" dominantBaseline="middle" className="text-3xl font-bold fill-slate-100">
                    {calculatedScores ? calculatedScores.finalAivssScore.toFixed(1) : "0.0"}
                  </text>
                   <text x="50%" y="80%" textAnchor="middle" dominantBaseline="middle" className="text-sm fill-slate-400">
                    AIVSS Score
                  </text>
                </RadialBarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-800 border-slate-700 shadow-xl">
            <CardHeader><CardTitle className="text-lg text-slate-100">Weighted Score Components</CardTitle></CardHeader>
            <CardContent className="h-60 md:h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={scoreComponentData} layout="vertical" margin={{ top: 5, right: 20, left: 100, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis type="number" domain={[0, 6]} tickFormatter={(tick) => tick.toFixed(1)} style={{fontSize: '10px'}} stroke="#64748b"/>
                  <YAxis dataKey="name" type="category" width={120} style={{fontSize: '10px'}} stroke="#64748b" tick={{dx: -5}}/>
                  <RechartsTooltip contentStyle={{fontSize: '12px', backgroundColor: '#1e293b', borderColor: '#334155'}} itemStyle={{color: '#cbd5e1'}} labelStyle={{color: '#94a3b8'}} formatter={(value: any) => typeof value === 'number' ? value.toFixed(2) : value} />
                  <Legend wrapperStyle={{fontSize: '12px', color: '#cbd5e1'}}/>
                  <Bar dataKey="value" barSize={25}>
                     {scoreComponentData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.fill} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
  );
}
