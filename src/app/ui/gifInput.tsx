import React, { useState } from "react";

interface GifInputProps {
  value: string;
  onChange: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
}

const GifInput: React.FC<GifInputProps> = ({ value, onChange, onKeyDown }) => {
  const containsGif = value.toLowerCase().startsWith("/gif");
  const modifiedText = value.replace("/gif", "").trim();

  return (
    <div className="relative px-[16px] py-[13px] h-[62px] bg-[#FAFBFC] mt-auto border border-[#DCE1E5] rounded-[4px]">
      {containsGif && (
        <div className="absolute mr-[9px] ml-[11px] mt-[6px] h-[25px] bg-[#FAFBFC] text-black rounded-[6px]">
          <span className="text-transparent bg-gradient bg-clip-text">
            /gif
          </span>{" "}
          {modifiedText}
        </div>
      )}

      <input
        placeholder="Напишите сообщение:"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        className="placeholder:roboto focus:outline-none text-sm/[17px] w-[405px] h-[36px] bg-white rounded-[6px] border border-[#D3D9DE] text-black py-[8px] px-[10px]"
      />
    </div>
  );
};

export default GifInput;
