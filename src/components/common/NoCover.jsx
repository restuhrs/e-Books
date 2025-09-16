export default function NoCover({ alt = "No Cover", className = "" }) {
  return (
    <img
      src="/no_cover.png"
      alt={alt}
      className={`object-cover bg-gray-100 ${className}`}
    />
  );
}
