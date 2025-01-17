import { saveAs } from "file-saver";

const data = [
  { name: "Alice", age: 25, email: "alice@example.com" },
  { name: "Bob", age: 30, email: "bob@example.com" },
  { name: "Charlie", age: 35, email: "charlie@example.com" },
];
const fileName = 'example.csv'

export default function Exam9() {
  const convertToCSV = (data: Array<Record<string, any>>): string => {
    if (!data.length) return "";

    const headers = Object.keys(data[0]).join(",");
    const rows = data
      .map((row) =>
        Object.values(row)
          .map((value) => `"${value}"`)
          .join(",")
      )
      .join("\n");

    return `${headers}\n${rows}`;
  };

  const handleDownload = () => {
    const csvData = convertToCSV(data);
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, fileName);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h3 className="text-center font-bold m-8 text-3xl">Exam 9</h3>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={handleDownload}
      >
        Export CSV
      </button>
    </div>
  );
}