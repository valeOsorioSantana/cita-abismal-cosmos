import React from "react";
import cn from "clsx";

// Importa las imágenes
import GatoNormal from "../assets/gatos/Normal.jpg";
import GatoFeliz from "../assets/gatos/Feliz.jpg";
import GatoConfundido from "../assets/gatos/Confundido.jpg";
import GatoEnojado from "../assets/gatos/Enojado.jpg";

interface Props {
  mood: "normal" | "feliz" | "confundido" | "enojado";
  className?: string;
}

const imageMap: Record<Props["mood"], string> = {
  normal: GatoNormal,
  feliz: GatoFeliz,
  confundido: GatoConfundido,
  enojado: GatoEnojado,
};

export const GatoPresenter = ({ mood, className }: Props) => {
  return (
    <div className={cn("flex justify-center items-center", className)}>
      <img
        key={mood} // 🔁 fuerza reinicio de animación al cambiar mood
        src={imageMap[mood]}
        alt={`Gato ${mood}`}
        className={cn(
          "w-full h-full object-contain transition-all duration-300 ease-in-out",
          mood === "feliz" && "animate-bounce",
          mood === "confundido" && "animate-none",
          mood === "enojado" && "grayscale animate-shake",
          mood === "normal" && "opacity-100"
        )}
      />
    </div>
  );
};
