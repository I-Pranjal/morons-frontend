export default function AnalyticsTab() {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">Resume Score Breakdown</h2>
      <div className="space-y-4">
        {[
          { label: 'ATS Score', value: 94, tip: 'Great alignment for automated screeners.' },
          { label: 'Clarity', value: 88, tip: 'Use action words. Avoid passive voice.' },
          { label: 'Uniqueness', value: 82, tip: 'Remove generic buzzwords.' },
          { label: 'Relevance to JD', value: 76, tip: 'Missing 3 keywords from pasted JD.' },
        ].map((item, idx) => (
          <div key={idx}>
            <div className="flex justify-between mb-1">
              <span className="font-medium">{item.label}</span>
              <span className="text-sm">{item.value}/100</span>
            </div>
            <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
              <div
                className="bg-rose-700 h-full"
                style={{ width: `${item.value}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-500 mt-1">{item.tip}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
