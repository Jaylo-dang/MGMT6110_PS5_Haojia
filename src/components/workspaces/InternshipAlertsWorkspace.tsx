import React, { useState } from 'react';
import { InternshipAlert } from '../../types';
import {
  Briefcase,
  Mail,
  Send,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Play,
  Eye,
  Plus,
  Building,
  GraduationCap,
  Calendar,
  DollarSign,
  MapPin,
  ExternalLink
} from 'lucide-react';

interface InternshipAlertsWorkspaceProps {
  internships: InternshipAlert[];
  onBackToMatrix: () => void;
}

export const InternshipAlertsWorkspace: React.FC<InternshipAlertsWorkspaceProps> = ({
  internships: initialInternships,
  onBackToMatrix,
}) => {
  const [internships, setInternships] = useState<InternshipAlert[]>(initialInternships);
  const [selectedInternId, setSelectedInternId] = useState<string>(internships[0]?.id || '');
  const [isProcessing, setIsProcessing] = useState(false);
  const [pipelineStep, setPipelineStep] = useState<number>(0);
  const [showEmailPreview, setShowEmailPreview] = useState(false);
  const [recipientEmail, setRecipientEmail] = useState('shantanu281098@gmail.com');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form for testing new internship
  const [newCompany, setNewCompany] = useState('');
  const [newRole, setNewRole] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newStipend, setNewStipend] = useState('');
  const [newDeadline, setNewDeadline] = useState('');
  const [newPortal, setNewPortal] = useState('');
  const [newReqs, setNewReqs] = useState('');
  const [newSummary, setNewSummary] = useState('');

  const selectedIntern = internships.find((i) => i.id === selectedInternId) || internships[0];

  const runAutonomousPipeline = () => {
    if (!selectedIntern || isProcessing) return;
    setIsProcessing(true);
    setPipelineStep(1);

    setTimeout(() => {
      setPipelineStep(2);
      setTimeout(() => {
        setPipelineStep(3);
        setTimeout(() => {
          setPipelineStep(4);
          // Mark emailed
          setInternships((prev) =>
            prev.map((i) =>
              i.id === selectedIntern.id
                ? {
                    ...i,
                    status: 'emailed',
                    dispatchedTo: recipientEmail,
                    dispatchedAt: `Today at ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} via Autonomous Alert Node`,
                  }
                : i
            )
          );
          setIsProcessing(false);
        }, 700);
      }, 800);
    }, 600);
  };

  const handleAddNewInternship = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompany || !newRole) return;

    const reqArray = newReqs.split('\n').filter((r) => r.trim().length > 0);

    const newItem: InternshipAlert = {
      id: `intern-${Date.now()}`,
      company: newCompany.trim(),
      roleTitle: newRole.trim(),
      location: newLocation.trim() || 'San Francisco, CA / Remote',
      stipend: newStipend.trim() || '$50 - $60 / hr',
      deadline: newDeadline.trim() || 'Rolling (Immediate)',
      sourcePortal: newPortal.trim() || `${newCompany.trim()} Careers Portal`,
      eligibilityMatch: {
        gpaMatch: true,
        majorMatch: true,
        gradYearMatch: true,
        overallScore: 93,
      },
      requirements: reqArray.length > 0 ? reqArray : [
        'Enrolled in University degree program in Computer Science or related',
        'Strong problem-solving and software development skills',
        'Available for full-time summer internship duration'
      ],
      roleSummary: newSummary.trim() || `Exciting internship opportunity at ${newCompany} working with frontier technology stacks.`,
      status: 'verified',
      dispatchedTo: recipientEmail,
    };

    setInternships([newItem, ...internships]);
    setSelectedInternId(newItem.id);
    setShowAddModal(false);
    setNewCompany('');
    setNewRole('');
    setNewLocation('');
    setNewStipend('');
    setNewDeadline('');
    setNewPortal('');
    setNewReqs('');
    setNewSummary('');
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <button
              onClick={onBackToMatrix}
              className="cursor-pointer text-xs font-semibold text-slate-500 hover:text-slate-900 inline-flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Matrix
            </button>
            <span className="text-slate-300">/</span>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700">
              Task 4 Workspace
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            Internship Alerts on Mail
          </h2>
          <p className="text-xs text-slate-600 mt-1">
            <span className="font-semibold text-teal-900">Quadrant: AI Alone (Autonomous Execution).</span> Deterministic criteria (graduation year, major, GPA threshold, deadlines) allow AI to monitor portals, verify eligibility matches, and dispatch formatted alert emails directly to your inbox without human bottlenecks.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="cursor-pointer inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap shrink-0 self-start md:self-auto shadow-xs"
        >
          <Plus className="w-3.5 h-3.5" /> Ingest Opening Spec
        </button>
      </div>

      {/* Autonomous Pipeline Runner Card */}
      <div className="bg-gradient-to-r from-teal-950 via-slate-900 to-slate-950 text-white rounded-xl p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider bg-teal-500/20 text-teal-300 px-2 py-0.5 rounded border border-teal-400/30">
                Autonomous Pipeline · Zero Human Bottleneck
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white mt-1">
              End-to-End Portal Scraper, Eligibility Verifier & SMTP Email Dispatcher
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={runAutonomousPipeline}
              disabled={isProcessing}
              className="cursor-pointer inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-900 bg-teal-400 hover:bg-teal-300 disabled:opacity-50 disabled:pointer-events-none rounded-lg transition-all shadow-xs"
            >
              <Play className="w-3.5 h-3.5" />
              {isProcessing ? 'Executing Autonomous Alert Pipeline...' : 'Run Pipeline for Selected Internship'}
            </button>
          </div>
        </div>

        {/* Pipeline Step Progress */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 pt-2 text-xs">
          <div
            className={`p-2.5 rounded-lg border transition-all ${
              pipelineStep >= 1
                ? 'bg-teal-950/80 border-teal-500 text-teal-200'
                : 'bg-white/5 border-white/10 text-slate-400'
            }`}
          >
            <div className="font-mono text-[10px] text-teal-400">Step 1</div>
            <div className="font-semibold text-white">Scrape Career Portals</div>
            <div className="text-[11px] text-slate-300">Continuous webhook ingest</div>
          </div>

          <div
            className={`p-2.5 rounded-lg border transition-all ${
              pipelineStep >= 2
                ? 'bg-teal-950/80 border-teal-500 text-teal-200'
                : 'bg-white/5 border-white/10 text-slate-400'
            }`}
          >
            <div className="font-mono text-[10px] text-teal-400">Step 2</div>
            <div className="font-semibold text-white">Verify Right-Answer Match</div>
            <div className="text-[11px] text-slate-300">GPA, major, grad year check</div>
          </div>

          <div
            className={`p-2.5 rounded-lg border transition-all ${
              pipelineStep >= 3
                ? 'bg-teal-950/80 border-teal-500 text-teal-200'
                : 'bg-white/5 border-white/10 text-slate-400'
            }`}
          >
            <div className="font-mono text-[10px] text-teal-400">Step 3</div>
            <div className="font-semibold text-white">Compile HTML Alert Digest</div>
            <div className="text-[11px] text-slate-300">Apply link & deadline tag</div>
          </div>

          <div
            className={`p-2.5 rounded-lg border transition-all ${
              pipelineStep >= 4
                ? 'bg-teal-950/80 border-teal-500 text-teal-200'
                : 'bg-white/5 border-white/10 text-slate-400'
            }`}
          >
            <div className="font-mono text-[10px] text-teal-400">Step 4</div>
            <div className="font-semibold text-white">SMTP Mail Dispatch</div>
            <div className="text-[11px] text-slate-300">Delivered directly to user</div>
          </div>
        </div>
      </div>

      {/* Main 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Internship Openings List */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 px-1">
            Detected Opportunities ({internships.length})
          </div>

          {internships.map((intern) => {
            const isSelected = intern.id === selectedIntern?.id;
            return (
              <div
                key={intern.id}
                onClick={() => setSelectedInternId(intern.id)}
                className={`cursor-pointer p-4 rounded-xl border transition-all text-left ${
                  isSelected
                    ? 'bg-white border-teal-500 shadow-xs ring-1 ring-teal-500'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                }`}
              >
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-slate-900">
                    <Building className="w-3.5 h-3.5 text-slate-500" />
                    <span>{intern.company}</span>
                  </div>
                  <span className="font-mono text-xs font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                    {intern.eligibilityMatch.overallScore}% Match
                  </span>
                </div>

                <h4 className="text-sm font-bold text-slate-800 mt-1 line-clamp-1">
                  {intern.roleTitle}
                </h4>

                <div className="flex items-center gap-3 text-xs text-slate-500 mt-1.5">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-400" /> {intern.location}
                  </span>
                  <span>·</span>
                  <span className="font-mono text-[11px] font-medium text-slate-700">
                    {intern.stipend}
                  </span>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-500 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-400" /> Due: {intern.deadline}
                  </span>

                  {intern.status === 'emailed' ? (
                    <span className="inline-flex items-center gap-1 font-semibold text-emerald-600 text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Alert Emailed
                    </span>
                  ) : intern.status === 'verified' ? (
                    <span className="text-teal-700 font-medium text-[11px]">
                      Verified Match
                    </span>
                  ) : (
                    <span className="text-amber-700 font-medium text-[11px]">
                      New Detection
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Detailed Inspector & Email Dispatch Panel */}
        {selectedIntern && (
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-6">
            {/* Opportunity Header */}
            <div className="border-b border-slate-200 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-teal-700 mb-1">
                  <span>{selectedIntern.company}</span>
                  <span className="text-slate-300">·</span>
                  <span className="text-slate-500">{selectedIntern.sourcePortal}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  {selectedIntern.roleTitle}
                </h3>
                <div className="flex flex-wrap items-center gap-3 mt-1.5 text-xs text-slate-600">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" /> {selectedIntern.location}
                  </span>
                  <span>·</span>
                  <span className="font-semibold text-slate-800">
                    {selectedIntern.stipend}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1 text-rose-700 font-medium">
                    <Calendar className="w-3.5 h-3.5" /> Deadline: {selectedIntern.deadline}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowEmailPreview(true)}
                  className="cursor-pointer inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" /> Preview Mail Alert
                </button>
              </div>
            </div>

            {/* Objective Eligibility Criteria Check (Right Answer) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                  Deterministic Eligibility Verification (Work with a Right Answer)
                </label>
                <span className="font-mono text-xs font-bold text-teal-700">
                  {selectedIntern.eligibilityMatch.overallScore}% Match
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
                  <span className="text-slate-600">Major / Degree</span>
                  <span className="inline-flex items-center gap-1 font-semibold text-emerald-700">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Passed
                  </span>
                </div>
                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
                  <span className="text-slate-600">Graduation Year</span>
                  <span className="inline-flex items-center gap-1 font-semibold text-emerald-700">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Passed
                  </span>
                </div>
                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
                  <span className="text-slate-600">Minimum GPA</span>
                  <span className="inline-flex items-center gap-1 font-semibold text-emerald-700">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Passed
                  </span>
                </div>
              </div>
            </div>

            {/* Requirements & Role Summary */}
            <div className="space-y-3">
              <div>
                <span className="text-xs font-bold text-slate-800 block mb-1">
                  Extracted Requirements & Qualifications:
                </span>
                <ul className="bg-slate-50 border border-slate-200 rounded-lg p-3 space-y-1.5 text-xs text-slate-700">
                  {selectedIntern.requirements.map((req, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-teal-600 font-bold">›</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <span className="text-xs font-bold text-slate-800 block mb-1">
                  Role Overview:
                </span>
                <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-200 leading-relaxed">
                  {selectedIntern.roleSummary}
                </p>
              </div>
            </div>

            {/* Automated Email Dispatcher Settings (AI Alone) */}
            <div className="p-4 bg-teal-50/60 border border-teal-200 rounded-lg space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-teal-700" />
                  <span className="text-xs font-bold text-teal-950">
                    Target Mail Destination for Autonomous Internship Alerts
                  </span>
                </div>

                {selectedIntern.status === 'emailed' && (
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Alert Delivered
                  </span>
                )}
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-1">
                <input
                  type="email"
                  value={recipientEmail}
                  onChange={(e) => setRecipientEmail(e.target.value)}
                  className="flex-1 text-xs p-2 bg-white border border-teal-200 rounded-lg focus:outline-teal-600 font-mono text-slate-800"
                  placeholder="your-email@domain.com"
                />
                <button
                  onClick={runAutonomousPipeline}
                  disabled={isProcessing}
                  className="cursor-pointer px-4 py-2 text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-lg transition-colors whitespace-nowrap shadow-xs"
                >
                  Send Alert Mail Now
                </button>
              </div>

              {selectedIntern.dispatchedAt && (
                <p className="text-[11px] text-teal-900/80 pt-1">
                  Last automated dispatch: <strong>{selectedIntern.dispatchedAt}</strong> to{' '}
                  <strong className="font-mono">{selectedIntern.dispatchedTo}</strong>
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Email Alert Preview Modal */}
      {showEmailPreview && selectedIntern && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-slate-200 max-w-2xl w-full p-6 shadow-xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-teal-700" />
                <h3 className="text-base font-bold text-slate-900">
                  Preview: Automated Internship Alert Email
                </h3>
              </div>
              <button
                onClick={() => setShowEmailPreview(false)}
                className="cursor-pointer text-slate-400 hover:text-slate-700 text-sm font-semibold"
              >
                ✕ Close
              </button>
            </div>

            {/* Email Header Metadata */}
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs space-y-1">
              <div>
                <strong className="text-slate-500">To: </strong>
                <span className="font-mono text-slate-800">{recipientEmail}</span>
              </div>
              <div>
                <strong className="text-slate-500">From: </strong>
                <span className="font-mono text-slate-800">alerts@internship-agent-network.edu</span>
              </div>
              <div>
                <strong className="text-slate-500">Subject: </strong>
                <span className="font-bold text-slate-900">
                  [INTERNSHIP ALERT] High Match ({selectedIntern.eligibilityMatch.overallScore}%): {selectedIntern.roleTitle} at {selectedIntern.company}
                </span>
              </div>
            </div>

            {/* Rendered HTML Email Body */}
            <div className="border border-slate-200 rounded-lg p-5 space-y-4 text-xs font-sans bg-white">
              <div className="border-b border-slate-100 pb-3 flex items-start justify-between">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700">
                    High Priority Opening
                  </span>
                  <h4 className="text-base font-bold text-slate-900 mt-0.5">
                    {selectedIntern.company} — {selectedIntern.roleTitle}
                  </h4>
                  <p className="text-slate-500 mt-0.5">
                    {selectedIntern.location} · Compensation: <strong>{selectedIntern.stipend}</strong>
                  </p>
                </div>
                <span className="font-mono text-xs font-bold text-teal-800 bg-teal-50 px-2.5 py-1 rounded border border-teal-200">
                  {selectedIntern.eligibilityMatch.overallScore}% Match
                </span>
              </div>

              {/* Deadline alert box */}
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-950 flex items-center justify-between">
                <span className="font-semibold flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-rose-600" />
                  Application Deadline: {selectedIntern.deadline}
                </span>
                <span className="text-[11px] font-mono text-rose-700">Immediate Action Recommended</span>
              </div>

              {/* Eligibility check */}
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 space-y-1">
                <span className="font-bold text-slate-900 block">Eligibility Verification:</span>
                <p className="text-slate-600">
                  ✓ Meets Degree / Major requirement &nbsp;|&nbsp; ✓ Meets Graduation Year window &nbsp;|&nbsp; ✓ Verified GPA threshold
                </p>
              </div>

              {/* Requirements summary */}
              <div>
                <span className="font-bold text-slate-900 block mb-1">Key Requirements:</span>
                <ul className="list-disc pl-4 space-y-1 text-slate-700">
                  {selectedIntern.requirements.map((req, idx) => (
                    <li key={idx}>{req}</li>
                  ))}
                </ul>
              </div>

              <div className="pt-2">
                <span className="font-bold text-slate-900 block mb-1">Role Description:</span>
                <p className="text-slate-700 leading-relaxed">{selectedIntern.roleSummary}</p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <span>Dispatched autonomously via AI Alone Execution Node</span>
                <span className="text-teal-700 font-semibold cursor-pointer">View Portal Listing ›</span>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setShowEmailPreview(false)}
                className="cursor-pointer px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal to Ingest New Internship */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-slate-200 max-w-lg w-full p-6 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-slate-900">
              Ingest New Internship Opening
            </h3>
            <p className="text-xs text-slate-500">
              Add a new company opening to test the deterministic eligibility verification and email alert dispatch pipeline.
            </p>

            <form onSubmit={handleAddNewInternship} className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Stripe / Apple"
                    value={newCompany}
                    onChange={(e) => setNewCompany(e.target.value)}
                    className="w-full text-xs p-2.5 border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Role Title
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Software Engineering Intern"
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    className="w-full text-xs p-2.5 border border-slate-200 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Seattle, WA / Hybrid"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    className="w-full text-xs p-2.5 border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Stipend / Compensation
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. $55 / hr + Housing"
                    value={newStipend}
                    onChange={(e) => setNewStipend(e.target.value)}
                    className="w-full text-xs p-2.5 border border-slate-200 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Application Deadline
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Nov 20, 2026"
                    value={newDeadline}
                    onChange={(e) => setNewDeadline(e.target.value)}
                    className="w-full text-xs p-2.5 border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Source Portal
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Greenhouse / Campus Board"
                    value={newPortal}
                    onChange={(e) => setNewPortal(e.target.value)}
                    className="w-full text-xs p-2.5 border border-slate-200 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Requirements (one per line)
                </label>
                <textarea
                  rows={2}
                  placeholder="Enrolled in Computer Science degree&#10;Proficiency in Python or Java"
                  value={newReqs}
                  onChange={(e) => setNewReqs(e.target.value)}
                  className="w-full text-xs p-2.5 border border-slate-200 rounded-lg"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Role Summary
                </label>
                <textarea
                  rows={2}
                  placeholder="Brief description of the internship project..."
                  value={newSummary}
                  onChange={(e) => setNewSummary(e.target.value)}
                  className="w-full text-xs p-2.5 border border-slate-200 rounded-lg"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="cursor-pointer px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="cursor-pointer px-4 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg"
                >
                  Add Internship
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
