import logoLight from "figma:asset/7ceda7b425c2f8170a9e5f7176f904a2388aed03.png";
import logoDark from "figma:asset/db44c860a9472c382ab2646c2ec1f8727d2ecf6d.png";

interface LogoProps {
  onClick?: () => void;
  isDarkMode?: boolean;
}

export function Logo({ onClick, isDarkMode = true }: LogoProps) {
  return (
    <div 
      className={`flex items-center ${onClick ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''}`}
      onClick={onClick}
    >
      <img 
        src={isDarkMode ? logoDark : logoLight} 
        alt="Esslingen University" 
        className="h-8 md:h-12 lg:h-16"
      />
    </div>
  );
}