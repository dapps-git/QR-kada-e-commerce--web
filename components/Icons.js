// Hand-tuned 24px line icons (1.6 stroke) used across the store.
const S = ({ children, size = 20, className, ...rest }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
    {...rest}
  >
    {children}
  </svg>
);

export const IconSearch = (p) => (<S {...p}><circle cx="11" cy="11" r="6.5" /><path d="m20 20-4.2-4.2" /></S>);
export const IconBag = (p) => (<S {...p}><path d="M5 8h14l-1.2 11.2a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8L5 8Z" /><path d="M9 8V6.5a3 3 0 0 1 6 0V8" /></S>);
export const IconMenu = (p) => (<S {...p}><path d="M4 7h16M4 12h10M4 17h16" /></S>);
export const IconClose = (p) => (<S {...p}><path d="M6 6l12 12M18 6 6 18" /></S>);
export const IconArrow = (p) => (<S {...p}><path d="M5 12h14M13 6l6 6-6 6" /></S>);
export const IconArrowUpRight = (p) => (<S {...p}><path d="M7 17 17 7M8 7h9v9" /></S>);
export const IconPlus = (p) => (<S {...p}><path d="M12 5v14M5 12h14" /></S>);
export const IconMinus = (p) => (<S {...p}><path d="M5 12h14" /></S>);
export const IconTrash = (p) => (<S {...p}><path d="M5 7h14M10 7V5h4v2M7 7l.8 12a1.5 1.5 0 0 0 1.5 1.4h5.4a1.5 1.5 0 0 0 1.5-1.4L17 7" /></S>);
export const IconCheck = (p) => (<S {...p}><path d="m5 12.5 4.2 4L19 7" /></S>);
export const IconBox = (p) => (<S {...p}><path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" /><path d="m4 7.5 8 4.5 8-4.5M12 12v9" /></S>);
export const IconTruck = (p) => (<S {...p}><path d="M3 6.5h11v9H3zM14 9.5h3.6l3 3.2v2.8H14" /><circle cx="7" cy="17.5" r="1.8" /><circle cx="17" cy="17.5" r="1.8" /></S>);
export const IconShield = (p) => (<S {...p}><path d="M12 3.5 5 6v5.5c0 4.2 3 7.6 7 9 4-1.4 7-4.8 7-9V6l-7-2.5Z" /><path d="m9 12 2.2 2.2L15.5 10" /></S>);
export const IconBrush = (p) => (<S {...p}><path d="M14.5 4.5 19.5 9.5 11 18l-5-5 8.5-8.5Z" /><path d="M6 13c-2 0-2.8 1.6-2.8 3.4 0 1.2-.5 2.3-1.2 3 3.4.4 6.6-.9 7-3.4" /></S>);
export const IconWallet = (p) => (<S {...p}><rect x="3" y="6" width="18" height="13" rx="2.5" /><path d="M3 10h18M16.5 14.5h1" /></S>);
export const IconStar = ({ filled = true, ...p }) => (
  <S {...p} fill={filled ? 'currentColor' : 'none'} strokeWidth="1.2"><path d="m12 3.8 2.5 5.1 5.6.8-4 3.9 1 5.6-5.1-2.7-5 2.7.9-5.6-4-3.9 5.6-.8L12 3.8Z" /></S>
);
export const IconPhone = (p) => (<S {...p}><path d="M6.5 3.8h3l1.5 4-2 1.3a10.5 10.5 0 0 0 5.9 5.9l1.3-2 4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 6a2 2 0 0 1 2-2.2Z" /></S>);
export const IconPin = (p) => (<S {...p}><path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z" /><circle cx="12" cy="10" r="2.3" /></S>);
export const IconMail = (p) => (<S {...p}><rect x="3" y="5.5" width="18" height="13" rx="2.5" /><path d="m4 7 8 6 8-6" /></S>);
export const IconClock = (p) => (<S {...p}><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></S>);
export const IconChevron = (p) => (<S {...p}><path d="m9 6 6 6-6 6" /></S>);
export const IconChevronDown = (p) => (<S {...p}><path d="m6 9 6 6 6-6" /></S>);
export const IconNfc = (p) => (<S {...p}><path d="M8.5 8.5a5 5 0 0 1 0 7M11.5 6a8.5 8.5 0 0 1 0 12M14.5 3.5a12 12 0 0 1 0 17" /><circle cx="5.5" cy="12" r="1.2" fill="currentColor" stroke="none" /></S>);
export const IconQr = (p) => (<S {...p}><rect x="4" y="4" width="6" height="6" rx="1" /><rect x="14" y="4" width="6" height="6" rx="1" /><rect x="4" y="14" width="6" height="6" rx="1" /><path d="M14 14h2.5v2.5H14zM18.5 18.5H20V20M14 19.5V20h1.5M20 14v1.5" /></S>);
export const IconSparkle = (p) => (<S {...p}><path d="M12 3.5c.6 4.2 2.3 5.9 6.5 6.5-4.2.6-5.9 2.3-6.5 6.5-.6-4.2-2.3-5.9-6.5-6.5 4.2-.6 5.9-2.3 6.5-6.5Z" /><path d="M18.5 16v4M16.5 18h4" /></S>);
export const IconChart = (p) => (<S {...p}><path d="M4 20h16" /><path d="M6.5 16v-4M11 16V8M15.5 16v-6M20 16V5" /></S>);
export const IconBolt = (p) => (<S {...p}><path d="M13 3 5 13.5h6L10 21l8-10.5h-6L13 3Z" /></S>);
export const IconHand = (p) => (<S {...p}><path d="M9 11V5.5a1.5 1.5 0 0 1 3 0V11M12 10V4.5a1.5 1.5 0 0 1 3 0V11M15 10.5V6.5a1.5 1.5 0 0 1 3 0v7c0 4-2.6 7-6.5 7-2.4 0-3.9-1-5.3-2.9L3.8 14a1.6 1.6 0 0 1 2.6-1.8L9 15" /></S>);

export const IconWhatsApp = ({ size = 20, ...p }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M12.04 2.5A9.43 9.43 0 0 0 3.9 16.7L2.6 21.5l4.93-1.3a9.43 9.43 0 1 0 4.51-17.7Zm0 17.2a7.8 7.8 0 0 1-3.98-1.09l-.29-.17-2.93.77.78-2.86-.19-.3a7.8 7.8 0 1 1 6.6 3.65Zm4.28-5.84c-.23-.12-1.38-.68-1.6-.76-.21-.08-.37-.12-.53.12-.15.23-.6.76-.74.92-.14.15-.27.17-.5.06a6.4 6.4 0 0 1-1.88-1.16 7.06 7.06 0 0 1-1.3-1.62c-.14-.23 0-.36.1-.47.11-.11.24-.27.35-.41.12-.14.16-.23.24-.39.08-.16.04-.29-.02-.41-.06-.12-.53-1.27-.72-1.74-.19-.46-.38-.4-.53-.4h-.45a.87.87 0 0 0-.63.29 2.65 2.65 0 0 0-.83 1.97 4.6 4.6 0 0 0 .97 2.45 10.5 10.5 0 0 0 4.03 3.56c.56.24 1 .39 1.35.5.56.18 1.08.15 1.48.09.45-.07 1.38-.56 1.58-1.11.2-.55.2-1.02.14-1.11-.06-.1-.21-.16-.44-.27Z" />
  </svg>
);
export const IconInstagram = (p) => (<S {...p}><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.2" cy="6.8" r=".9" fill="currentColor" stroke="none" /></S>);
export const IconFacebook = ({ size = 20, ...p }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.87.25-1.46 1.5-1.46h1.6V4.46A21 21 0 0 0 14.27 4.3c-2.3 0-3.87 1.4-3.87 3.98v2.22H7.8v3h2.6V21h3.1Z" />
  </svg>
);
export const IconGoogle = (p) => (<S {...p}><path d="M20 12.2c0-.6-.05-1.1-.15-1.7H12v3.3h4.5a4 4 0 0 1-1.7 2.6M20 12.2A8 8 0 1 1 17.3 6" /></S>);

// Business / profession icons
export const IconCup = (p) => (<S {...p}><path d="M5 9h11v5a5 5 0 0 1-5 5h-1a5 5 0 0 1-5-5V9Z" /><path d="M16 10.5h1.5a2.5 2.5 0 0 1 0 5H16M8 3.5c0 1.2 1 1.3 1 2.5M11.5 3.5c0 1.2 1 1.3 1 2.5" /></S>);
export const IconScissors = (p) => (<S {...p}><circle cx="6.5" cy="7" r="2.5" /><circle cx="6.5" cy="17" r="2.5" /><path d="M8.6 8.4 20 17M8.6 15.6 20 7" /></S>);
export const IconMedical = (p) => (<S {...p}><rect x="3.5" y="3.5" width="17" height="17" rx="4" /><path d="M12 8v8M8 12h8" /></S>);
export const IconStore = (p) => (<S {...p}><path d="M4 9.5 5.5 4h13L20 9.5M4 9.5a2.7 2.7 0 0 0 5.3 0 2.7 2.7 0 0 0 5.4 0 2.7 2.7 0 0 0 5.3 0M5 11.5V20h14v-8.5" /><path d="M10 20v-5h4v5" /></S>);
export const IconDumbbell = (p) => (<S {...p}><path d="M7 7v10M4.5 9v6M17 7v10M19.5 9v6M7 12h10" /></S>);
export const IconBed = (p) => (<S {...p}><path d="M3 18V6M3 14h18v4M21 14v-2.5A2.5 2.5 0 0 0 18.5 9H11v5" /><circle cx="7" cy="11" r="1.8" /></S>);
