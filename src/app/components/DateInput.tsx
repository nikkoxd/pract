'use client';

import { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DateInput({ initialDate }: {
  initialDate: string
}) {
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const router = useRouter();

  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newDate = event.target.value;
    setSelectedDate(newDate);
    router.push(`/?date=${newDate}`);
  };

  return (
    <input
      type="date"
      className="p-1 rounded-lg text-black border-gray-300 dark:border-gray-700 border-solid"
      value={selectedDate}
      onChange={handleDateChange}
    />
  );
}

