export default function TableCell({ children }: { children: React.ReactNode }) {
  return (
    <td className="p-2 border-b border-gray-300 dark:border-gray-700 text-left">
      {children}
    </td>
  )
}
