export default function TableHeader({ children, isCurrentDate }: { children: React.ReactNode, isCurrentDate?: boolean }) {
  let headerClass = "p-2 border-b border-gray-300 dark:border-gray-700 text-left";

  if (isCurrentDate) {
    headerClass += " bg-gray-200 dark:bg-gray-600"; // Highlight the current date header with a lighter color
  }

  return (
    <th className={headerClass}>
      {children}
    </th>
  );
}
