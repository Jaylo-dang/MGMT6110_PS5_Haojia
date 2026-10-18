import React from 'react';
import { ArrowLeft, ArrowDown, Clock, Search, Table, Mail, Plane, UserCheck, ShieldCheck } from 'lucide-react';

interface FlightFareWorkspaceProps {
  onBackToMatrix: () => void;
}

// The six round-trip date pairs the agent checks each morning
const DATE_PAIRS = [
  '21 Dec → 9 Jan',
  '21 Dec → 10 Jan',
  '22 Dec → 9 Jan',
  '22 Dec → 10 Jan',
  '23 Dec → 9 Jan',
  '23 Dec → 10 Jan',
];

const STEPS = [
  {
    icon: Clock,
    title: 'About 9 am, Singapore time',
    text: 'A time trigger in Google Apps Script starts the daily check.',
  },
  {
    icon: Search,
    title: 'Search Google Flights through SerpApi',
    text: 'Round-trip economy, Singapore (SIN) to Beijing Capital (PEK), one search per date pair.',
  },
  {
    icon: Table,
    title: 'Write one row to "Daily fares"',
    text: 'The cheapest fare and its dates, flight and link, plus all six prices and a status: ALERT, No alert, First check or CHECK FAILED.',
  },
  {
    icon: Mail,
    title: 'Zapier emails the row to me',
    text: 'Free plan, one trigger and one action: Google Sheets · New Spreadsheet Row → Email by Zapier · Send Outbound Email.',
  },
];

export const FlightFareWorkspace: React.FC<FlightFareWorkspaceProps> = ({ onBackToMatrix }) => {
  const scrollToProblemSet = () => {
    document.getElementById('ps5')?.scrollIntoView({ behavior: 'smooth' });
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
              Task 7 Workspace · Problem Set 5
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">SIN–PEK Fare Alert</h2>
          <p className="text-xs text-slate-600 mt-1">
            <span className="font-semibold text-teal-900">Quadrant: AI Alone, With Checks.</span> The agent finds the
            cheapest round trip on its own; the traveller spot-checks the fare before booking.
          </p>
        </div>

        <button
          onClick={scrollToProblemSet}
          className="cursor-pointer inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap shrink-0 self-start md:self-auto shadow-xs"
        >
          My runs and Q1 <ArrowDown className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: how one run works */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500">How one run works</div>

          <ol className="space-y-3">
            {STEPS.map((step, i) => (
              <li key={step.title} className="flex gap-3">
                <span className="w-8 h-8 rounded-lg bg-teal-50 border border-teal-200 text-teal-700 flex items-center justify-center shrink-0">
                  <step.icon className="w-4 h-4" />
                </span>
                <div>
                  <div className="text-sm font-bold text-slate-900">
                    {i + 1}. {step.title}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>

          <div>
            <div className="text-xs font-semibold text-slate-700 mb-2">Date pairs checked every morning</div>
            <div className="flex flex-wrap gap-2">
              {DATE_PAIRS.map((pair) => (
                <span
                  key={pair}
                  className="text-xs font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-full px-2.5 py-1"
                >
                  {pair}
                </span>
              ))}
            </div>
          </div>

          <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900 leading-relaxed">
            <span className="font-bold">ALERT rule:</span> the cheapest fare is below CNY 1,600, or it is cheaper than
            the last check. Every other run still sends one email, so silence never means "no news".
          </div>
        </div>

        {/* Right: latest run and the person in the loop */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500">First Zap run</div>
              <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">No alert</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-slate-900">CNY 2,640</span>
              <span className="text-xs text-slate-500">round trip, economy</span>
            </div>
            <div className="text-sm text-slate-700 flex items-center gap-2">
              <Plane className="w-4 h-4 text-teal-700" />
              21 Dec → 9 Jan · Air China · nonstop to Beijing Capital
            </div>
            <div className="text-xs text-slate-500">18 Oct 2026, 03:01 Singapore time</div>
          </div>

          <div className="p-4 bg-purple-50/70 border border-purple-200 rounded-xl space-y-1">
            <div className="text-sm font-bold text-purple-950 flex items-center gap-1.5">
              <UserCheck className="w-4 h-4 text-purple-700" /> Where a person checks
            </div>
            <p className="text-xs text-purple-900 leading-relaxed">
              I, the traveller, read each email after the 9 am run, open its Google Flights link to check the fare,
              dates and flight before acting on an ALERT, and compare each run with its record in Zap history.
            </p>
          </div>

          <div className="p-4 bg-teal-50/70 border border-teal-200 rounded-xl space-y-1">
            <div className="text-sm font-bold text-teal-950 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-teal-700" /> It must never
            </div>
            <p className="text-xs text-teal-900 leading-relaxed">
              Book, hold or pay for a ticket. No booking or payment app is connected, and its only action is Send
              Outbound Email to my own address.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
