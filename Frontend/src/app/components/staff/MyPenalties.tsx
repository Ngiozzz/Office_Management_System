import { AlertTriangle, FileText, Shield, AlertCircle, TrendingDown } from 'lucide-react';
import { StatsCard } from '@/app/components/shared/StatsCard';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const penalties = [
  { 
    id: 'P-001', 
    date: '2026-02-03', 
    reason: 'Late submission of weekly report', 
    issuedBy: 'Line Manager', 
    issuer: 'David Wilson',
    severity: 'Low' as const,
    status: 'Active' as const,
    description: 'Weekly report submitted 2 days past deadline without prior notification.',
    pointsDeducted: 10,
    balanceAfter: 970
  },
  { 
    id: 'P-002', 
    date: '2026-01-28', 
    reason: 'Missed team meeting', 
    issuedBy: 'Line Manager', 
    issuer: 'David Wilson',
    severity: 'Low' as const,
    status: 'Resolved' as const,
    description: 'Absent from Monday standup meeting.',
    resolvedDate: '2026-02-01',
    pointsDeducted: 10,
    balanceAfter: 980,
    pointsRestored: 10
  },
  { 
    id: 'P-003', 
    date: '2026-01-15', 
    reason: 'Incomplete task documentation', 
    issuedBy: 'General Manager', 
    issuer: 'Jennifer Martinez',
    severity: 'Medium' as const,
    status: 'Under Review' as const,
    description: 'Task marked complete but documentation requirements not met.',
    reviewNotes: 'Employee has submitted additional documentation for review.',
    pointsDeducted: 25,
    balanceAfter: 990
  },
];

const pointsHistory = [
  { month: 'Sep', points: 1000 },
  { month: 'Oct', points: 1000 },
  { month: 'Nov', points: 1000 },
  { month: 'Dec', points: 990 },
  { month: 'Jan', points: 980 },
  { month: 'Feb', points: 970 },
];

const severityColors = {
  Low: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  Medium: 'bg-orange-100 text-orange-800 border-orange-300',
  High: 'bg-red-100 text-red-800 border-red-300',
};

const statusColors = {
  Active: 'bg-red-50 text-red-700 border-red-200',
  'Under Review': 'bg-blue-50 text-blue-700 border-blue-200',
  Resolved: 'bg-gray-50 text-gray-700 border-gray-200',
};

const getComplianceStatus = (points: number) => {
  if (points >= 900) return { label: 'Excellent', color: 'text-green-600', bgColor: 'bg-green-100' };
  if (points >= 800) return { label: 'Good', color: 'text-blue-600', bgColor: 'bg-blue-100' };
  if (points >= 700) return { label: 'Fair', color: 'text-yellow-600', bgColor: 'bg-yellow-100' };
  if (points >= 600) return { label: 'Warning', color: 'text-orange-600', bgColor: 'bg-orange-100' };
  return { label: 'Critical', color: 'text-red-600', bgColor: 'bg-red-100' };
};

export function MyPenalties() {
  const activePenalties = penalties.filter(p => p.status === 'Active').length;
  const underReview = penalties.filter(p => p.status === 'Under Review').length;
  const resolved = penalties.filter(p => p.status === 'Resolved').length;
  const totalPenalties = penalties.length;
  const currentPoints = 970;
  const pointsDeducted = 30;
  const complianceStatus = getComplianceStatus(currentPoints);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl text-gray-900 mb-2">My Penalties & Compliance Points</h2>
        <p className="text-gray-600">View penalties and track your compliance points balance</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <StatsCard
          title="Compliance Points"
          value={currentPoints.toString()}
          icon={Shield}
          trend={{ value: `-${pointsDeducted} from penalties`, isPositive: false }}
          iconBgColor={complianceStatus.bgColor}
          iconColor={complianceStatus.color}
        />
        <StatsCard
          title="Status"
          value={complianceStatus.label}
          icon={AlertCircle}
          iconBgColor={complianceStatus.bgColor}
          iconColor={complianceStatus.color}
        />
        <StatsCard
          title="Active Penalties"
          value={activePenalties.toString()}
          icon={AlertTriangle}
          iconBgColor="bg-red-100"
          iconColor="text-red-600"
        />
        <StatsCard
          title="Under Review"
          value={underReview.toString()}
          icon={FileText}
          iconBgColor="bg-blue-100"
          iconColor="text-blue-600"
        />
        <StatsCard
          title="Resolved"
          value={resolved.toString()}
          icon={AlertCircle}
          iconBgColor="bg-green-100"
          iconColor="text-green-600"
        />
      </div>

      {/* Points History Chart */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg text-gray-900 mb-4">Compliance Points History</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={pointsHistory}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis domain={[900, 1000]} />
            <Tooltip />
            <Line type="monotone" dataKey="points" stroke="#3b82f6" strokeWidth={2} name="Points" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Points Impact Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex gap-3">
          <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm text-blue-900 mb-2">Compliance Points System</h4>
            <div className="text-sm text-blue-700 space-y-1">
              <p>• All employees start with 1,000 compliance points</p>
              <p>• <strong>Low Severity:</strong> -10 points | <strong>Medium Severity:</strong> -25 points | <strong>High Severity:</strong> -50 points</p>
              <p>• Points may be restored when penalties are resolved</p>
              <p>• Maintain 900+ points for "Excellent" status</p>
            </div>
          </div>
        </div>
      </div>

      {/* Penalties List */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg text-gray-900 mb-4">Penalty History</h3>
        <div className="space-y-4">
          {penalties.map((penalty) => (
            <div
              key={penalty.id}
              className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm font-medium text-gray-500">{penalty.id}</span>
                    <span className={`text-xs px-2 py-1 rounded-full border ${severityColors[penalty.severity]}`}>
                      {penalty.severity} Severity
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full border ${statusColors[penalty.status]}`}>
                      {penalty.status}
                    </span>
                    <span className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-700 border border-red-300">
                      -{penalty.pointsDeducted} points
                    </span>
                  </div>
                  <h4 className="text-base text-gray-900 mb-1">{penalty.reason}</h4>
                  <p className="text-sm text-gray-600 mb-3">{penalty.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-3 border-t border-gray-100">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Date Issued</p>
                  <p className="text-sm text-gray-900">{penalty.date}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Issued By</p>
                  <p className="text-sm text-gray-900">{penalty.issuer}</p>
                  <p className="text-xs text-gray-500">{penalty.issuedBy}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Balance After</p>
                  <p className="text-sm text-gray-900">{penalty.balanceAfter} points</p>
                  {penalty.pointsRestored && (
                    <p className="text-xs text-green-600">+{penalty.pointsRestored} restored</p>
                  )}
                </div>
              </div>

              {penalty.status === 'Resolved' && penalty.resolvedDate && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <p className="text-xs text-green-600">
                    ✓ Resolved on {penalty.resolvedDate} - Compliance points restored
                  </p>
                </div>
              )}
              {penalty.status === 'Under Review' && penalty.reviewNotes && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <p className="text-xs text-gray-500 mb-1">Review Notes</p>
                  <p className="text-sm text-gray-600 italic">{penalty.reviewNotes}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Information Notice */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <div className="flex gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm text-amber-900 mb-1">About Penalties & Points</h4>
            <p className="text-sm text-amber-700">
              Penalties are issued to maintain workplace standards and compliance. Each penalty deducts compliance points
              based on severity. If you believe a penalty was issued in error, please contact your Line Manager or HR 
              department to request a review. Successfully resolved penalties may result in point restoration.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}