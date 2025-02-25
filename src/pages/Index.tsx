
import { useState } from "react";
import { Card } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { 
  AlertTriangle,
  CheckCircle,
  DollarSign,
  PieChart,
  Users,
} from "lucide-react";

const mockData = {
  departments: [
    { name: "Research", allocation: 2500000, spent: 1200000, compliance: 98 },
    { name: "IT", allocation: 1800000, spent: 900000, compliance: 85 },
    { name: "HR", allocation: 800000, spent: 600000, compliance: 92 },
    { name: "Finance", allocation: 1200000, spent: 400000, compliance: 95 },
  ],
  complianceIssues: [
    { department: "IT", issue: "Missing quarterly audit report", severity: "warning" },
    { department: "Research", issue: "Grant allocation documentation needed", severity: "info" },
  ],
};

const Index = () => {
  const [selectedDepartment, setSelectedDepartment] = useState(mockData.departments[0]);

  const totalAllocation = mockData.departments.reduce((sum, dept) => sum + dept.allocation, 0);
  const totalSpent = mockData.departments.reduce((sum, dept) => sum + dept.spent, 0);

  return (
    <div className="min-h-screen bg-background p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-2">
        <span className="text-sm font-medium text-muted-foreground">Dashboard</span>
        <h1 className="text-3xl font-bold tracking-tight">Funding Allocation Overview</h1>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6 space-y-2">
          <div className="flex items-center space-x-2">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">Total Budget</span>
          </div>
          <p className="text-2xl font-mono font-bold">${(totalAllocation / 1000000).toFixed(2)}M</p>
        </Card>
        <Card className="p-6 space-y-2">
          <div className="flex items-center space-x-2">
            <PieChart className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">Spent</span>
          </div>
          <p className="text-2xl font-mono font-bold">${(totalSpent / 1000000).toFixed(2)}M</p>
        </Card>
        <Card className="p-6 space-y-2">
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">Departments</span>
          </div>
          <p className="text-2xl font-mono font-bold">{mockData.departments.length}</p>
        </Card>
        <Card className="p-6 space-y-2">
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-4 w-4 text-success" />
            <span className="text-sm font-medium text-muted-foreground">Avg. Compliance</span>
          </div>
          <p className="text-2xl font-mono font-bold">
            {Math.round(
              mockData.departments.reduce((sum, dept) => sum + dept.compliance, 0) /
                mockData.departments.length
            )}%
          </p>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Department Allocations Chart */}
        <Card className="col-span-2 p-6">
          <h2 className="text-lg font-semibold mb-4">Department Allocations</h2>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={mockData.departments}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => `$${(value as number).toLocaleString()}`}
                />
                <Bar dataKey="allocation" fill="hsl(var(--primary))" name="Allocated" />
                <Bar dataKey="spent" fill="hsl(var(--muted))" name="Spent" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Compliance Issues */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Compliance Alerts</h2>
          <div className="space-y-4">
            {mockData.complianceIssues.map((issue, index) => (
              <div
                key={index}
                className="flex items-start space-x-3 p-3 rounded-lg bg-muted"
              >
                <AlertTriangle className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">{issue.department}</p>
                  <p className="text-sm text-muted-foreground">{issue.issue}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Index;
