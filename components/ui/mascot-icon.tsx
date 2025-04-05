export function MascotIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z"
        fill="#58CC02"
      />
      <circle cx="8.5" cy="10.5" r="1.5" fill="white" />
      <circle cx="15.5" cy="10.5" r="1.5" fill="white" />
      <path d="M12 16C10.34 16 9 14.66 9 13H15C15 14.66 13.66 16 12 16Z" fill="white" />
      <path
        d="M18 8.5C18 9.05 17.55 9.5 17 9.5C16.45 9.5 16 9.05 16 8.5C16 7.95 16.45 7.5 17 7.5C17.55 7.5 18 7.95 18 8.5Z"
        fill="#FFC800"
      />
      <path
        d="M8 8.5C8 9.05 7.55 9.5 7 9.5C6.45 9.5 6 9.05 6 8.5C6 7.95 6.45 7.5 7 7.5C7.55 7.5 8 7.95 8 8.5Z"
        fill="#FFC800"
      />
    </svg>
  )
}

