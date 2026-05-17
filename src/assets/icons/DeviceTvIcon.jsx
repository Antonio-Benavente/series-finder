export function DeviceTvIcon({ size = 24, className, style }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#E50914" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={{ flexShrink: 0, ...style }}>
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M3 7m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" />
            <path d="M16 3l-4 4l-4 -4" />
        </svg>
    );
}
