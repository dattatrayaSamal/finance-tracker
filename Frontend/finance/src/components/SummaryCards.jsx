const SummaryCards = ({ transactions }) => {
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
  const expenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);
  const net = income - expenses;

  const Card = ({ title, amount, color }) => (
    <div className="bg-white border-l-4 shadow p-4 rounded border-blue-500">
      <h3 className="text-sm font-semibold text-gray-500">{title}</h3>
      <p className={`text-2xl font-bold ${color}`}>₹{amount.toFixed(2)}</p>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
      <Card title="Total Income" amount={income} color="text-green-600" />
      <Card title="Total Expenses" amount={expenses} color="text-red-600" />
      <Card title="Net Balance" amount={net} color="text-blue-600" />
    </div>
  );
};

export default SummaryCards;
