export function ChevronLeftIcon({ size = 24, className, style }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={{ flexShrink: 0, ...style }}>
            <path d="M15 18l-6-6 6-6" />
        </svg>
    );
}
