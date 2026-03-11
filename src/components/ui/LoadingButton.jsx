import React from "react";

export default function LoadingButton({ loading, children, ...props }) {
  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      style={{
        cursor: loading ? "not-allowed" : "pointer",
        opacity: loading ? 0.7 : 1,
      }}
      className="bg-(--color-secondary) text-white px-4 py-2 rounded-xl hover:bg-(--bg-hover) transition-colors duration-300 ease-in-out"
    >
      {children}
    </button>
  );
}
