export default function StickyTable() {
  return (
    <div className="overflow-auto max-h-64">
      <table className="table-auto border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="sticky top-0 bg-gray-100 border border-gray-300 px-4 py-2">
              Header 1
            </th>
            <th className="sticky top-0 bg-gray-100 border border-gray-300 px-4 py-2">
              Header 2
            </th>
            <th className="sticky top-0 bg-gray-100 border border-gray-300 px-4 py-2">
              Header 3
            </th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 10 }, (_, rowIndex) => (
            <tr key={rowIndex}>
              <td className="sticky left-0 bg-gray-50 border border-gray-300 px-4 py-2">
                Row {rowIndex + 1}
              </td>
              <td className="border border-gray-300 px-4 py-2">Data 1</td>
              <td className="border border-gray-300 px-4 py-2">Data 2</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
