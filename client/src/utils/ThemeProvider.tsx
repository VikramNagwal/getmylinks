import { Toggle } from "../components/ui/toggle"


const Theme = () => {
  return (
    <div className="mx-2">
      <Toggle className="rounded-full p-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-6 h-6 text-gray-900 dark:text-white"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
        </svg>
      </Toggle>
    </div>
  );
}

export default Theme