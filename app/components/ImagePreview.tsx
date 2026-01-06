import { useEffect, useState } from "react";

/**
 * Image preview component with click-to-enlarge functionality
 * @param children - Image content to display
 */
export default function ImagePreview({ children }: {
  children: React.ReactNode;
}) {
  const [enlarged, setEnlarged] = useState(false);

  useEffect(() => {
    return setEnlarged(false);
  }, []);

  return (
    <div 
      className={`
        transition duration-300
        ${!enlarged && "cursor-pointer hover:scale-[100.5%] hover:-translate-y-0.5 hover:shadow-lg"}
        ${enlarged && "scale-200"}
      `}
      onClick={() => setEnlarged(!enlarged)}
    >
      {children}
    </div>
  );
}