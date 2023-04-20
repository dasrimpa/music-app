import React, { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowRoundBack } from 'react-icons/io';

export function Header({
  children,
  link,
  disableGoBack,
  className,
}: {
  children?: ReactNode;
  link?: string;
  breadcrumb?: boolean;
  disableGoBack?: boolean;
  className?: string;
}): JSX.Element {
  const navigate = useNavigate();

  function goBack() {
    navigate(-1);
  }

  function goToLink() {
    if (link) {
      navigate(link, { replace: true });
    }
  }

  return (
    <header
      className={`px-6 pt-8 pb-4 lg:px-16 lg:py-8 top-0 bg-white z-20 shadow-outer  relative ${className}`}
    >
      {!disableGoBack && (
        <div
          className="breadcrumb flex cursor-pointer w-fit"
          onClick={() => (link ? goToLink() : goBack())}
        >
          <IoIosArrowRoundBack/>
          <span className="ml-2.5">Back</span>
        </div>
      )}

      {children}
    </header>
  );
}
