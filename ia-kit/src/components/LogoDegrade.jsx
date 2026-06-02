export default function LogoDegrade({ className, style, ...props }) {
  return (
    <span
      className={className}
      style={{
        fontFamily: "'Romie', serif",
        fontWeight: 400,
        fontSize: '1.7rem',
        lineHeight: 1,
        letterSpacing: '0.04em',
        background: 'linear-gradient(90deg, #8e00fa 0%, #4347f3 55%, #47bfff 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        display: 'inline-block',
        ...style,
      }}
      {...props}
    >
      NOVAÏ
    </span>
  );
}
