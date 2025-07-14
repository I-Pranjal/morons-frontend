export default function JDMatchTab() {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">Match with Job Description</h2>
      <textarea
        placeholder="Paste the job description here..."
        className="w-full p-4 border rounded-lg mb-4"
        rows="5"
      ></textarea>
      <button className="w-full bg-rose-400 hover:bg-rose-500 text-white font-semibold py-2 rounded-lg">
        ⚡ Run JD-to-Resume Workflow
      </button>
    </div>
  );
}
