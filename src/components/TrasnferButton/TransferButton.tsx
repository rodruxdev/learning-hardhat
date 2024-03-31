import React from "react";

export const TransferButton = ({
  handleClick,
  disabled,
}: {
  handleClick: () => void;
  disabled: boolean;
}) => {
  return (
    <button
      className={`p-2 border-white border-solid border-2 rounded ${
        disabled && "bg-gray-500"
      }`}
      disabled={disabled}
      onClick={handleClick}
    >
      Transfer NFT
    </button>
  );
};
