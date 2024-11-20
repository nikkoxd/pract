export default function TableHeader({ children }: { children: React.ReactNode }) {
  return (
    <th className="p-2 border-b border-gray-300 dark:border-gray-700 text-left">
      {children}
    </th>
  )
}
