export function IconHome({ className = '' }) {
  return (
    <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M3 10.5 12 3l9 7.5V20a1.5 1.5 0 0 1-1.5 1.5H15v-7.5H9V21.5H4.5A1.5 1.5 0 0 1 3 20V10.5Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconCalendar({ className = '' }) {
  return (
    <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="4.5" width="18" height="16.5" rx="2" stroke="currentColor" strokeWidth="1.75" />
      <path d="M3 9.75h18M8 2.25v4.5M16 2.25v4.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

export function IconUtensils({ className = '' }) {
  return (
    <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M8 3v7.5a2.25 2.25 0 1 0 4.5 0V3M10.25 3v7.5M8 3h4.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path
        d="M17.25 3v18M17.25 3a2.25 2.25 0 0 1 2.25 2.25v4.5a2.25 2.25 0 0 1-4.5 0v-4.5A2.25 2.25 0 0 1 17.25 3Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconCart({ className = '' }) {
  return (
    <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M2.25 3.75h2.1l1.65 9.9a1.5 1.5 0 0 0 1.5 1.26h9.3a1.5 1.5 0 0 0 1.5-1.26l1.2-6.9H6"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="9.75" cy="19.5" r="1.5" fill="currentColor" />
      <circle cx="17.25" cy="19.5" r="1.5" fill="currentColor" />
    </svg>
  );
}

export function IconPeople({ className = '' }) {
  return (
    <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="9" cy="7.5" r="3" stroke="currentColor" strokeWidth="1.75" />
      <path
        d="M3 19.5v-1.5a4.5 4.5 0 0 1 4.5-4.5h3a4.5 4.5 0 0 1 4.5 4.5v1.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path
        d="M16.5 10.5a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5ZM15 19.5v-1.125a3.375 3.375 0 0 1 2.7-3.3"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}
