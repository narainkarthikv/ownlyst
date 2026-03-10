interface LogoProps {
  size?: number;
  className?: string;
}

export default function Logo({ size = 32, className = '' }: LogoProps) {
  return (
    <div className={`flex items-center cursor-pointer ${className}`}>
      <img
        src='/favicon.svg'
        alt='Ownlyst Logo'
        width={size}
        height={size}
        className='rounded-lg w-auto h-auto'
        style={{
          filter: 'drop-shadow(0 4px 12px rgba(251, 191, 36, 0.3))',
          maxWidth: size,
          maxHeight: size,
        }}
      />
    </div>
  );
}
