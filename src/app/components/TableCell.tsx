export default function TableCell({ children, status, isCurrentDate, onChange, attendanceId }:
  { children?: React.ReactNode, status?: string, isCurrentDate?: boolean, onChange?: (_newStatus: string, _attendanceId: string) => void, attendanceId?: string }) {
  let cellClass = "p-2 border-b border-gray-300 dark:border-gray-700 text-left";

  if (status) {
    switch (status) {
      case "PRESENT":
        if (isCurrentDate) {
          cellClass += " bg-green-200";
        } else {
          cellClass += " bg-green-300";
        }
        break;
      case "ABSENT":
        if (isCurrentDate) {
          cellClass += " bg-red-200";
        } else {
          cellClass += " bg-red-300";
        }
        break;
      case "LATE":
        if (isCurrentDate) {
          cellClass += " bg-yellow-200";
        } else {
          cellClass += " bg-yellow-300";
        }
        break;
      default:
        break;
    }
    cellClass += " text-black";
  }

  return (
    <td className={cellClass}>
      {isCurrentDate ? (
        <select
          value={status}
          onChange={(e) => onChange && onChange(e.target.value, attendanceId!)}
          className="p-1 bg-transparent"
        >
          <option value="PRESENT">Присутствует</option>
          <option value="ABSENT">Отсутствует</option>
          <option value="LATE">Опоздал</option>
        </select>
      ) : (
        children
      )}
    </td>
  );
}

