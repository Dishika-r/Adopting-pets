import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const modalRoot = document.getElementById("modal");

const Modal = ({ children }) => {
  const elemRef = useRef(null);
  if (!elemRef.current) {
    const div = document.createElement("div");
    elemRef.current = div;
  }

  useEffect(() => {
    modalRoot.appendChild(elemRef.current);
    return () => modalRoot.removeChild(elemRef.current);
  }, []);

  return createPortal(<div>{children}</div>, elemRef.current);
};

export default Modal;
