import Link from "next/link";

export default function Sidebar() {
  return (
    <section className="bg-gray-100 dark:bg-gray-800 p-5 rounded-lg">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-xl font-bold">Занятия</h1>
        <input type="date" className="p-1 rounded-lg text-black border-gray-300 dark:border-gray-700 border-solid" />
      </div>
      <ul className="list-decimal list-inside">
        <li>
          <Link href="/" className="text-blue-500">Базы данных - Б22-191-1</Link>
        </li>
        <li>
          <Link href="/" className="text-blue-500">Операционные системы - Б22-191-1</Link>
        </li>
      </ul>
    </section>
  )
}
