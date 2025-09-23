export default function Spinner() {
  return (
    <svg
      className={
        'w-5 inline-block fill-none stroke-2 stroke-current animate-spin'
      }
      viewBox="0 0 20 20"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M1 10a9 9 0 1 0 9-9" />
      <path d="M15 10a5 5 0 1 0-5 5" />
    </svg>
  )
}
