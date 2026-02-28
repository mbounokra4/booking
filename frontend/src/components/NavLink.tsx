import { NavLink as RouterNavLink, NavLinkProps } from "react-router-dom";
import { forwardRef } from "react";
import { cn } from "../lib/utils";

interface NavLinkCompatProps extends Omit<NavLinkProps, "className"> {
  className?: string;
  activeClassName?: string;
  pendingClassName?: string;
}

const baseStyle =
  "inline-flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition";

const defaultStyle =
  "text-slate-600 hover:text-[#0A1A2F] hover:bg-slate-100";

const activeStyle =
  "bg-[#0A1A2F] text-white shadow-md";

const pendingStyle =
  "opacity-60";

const NavLink = forwardRef<HTMLAnchorElement, NavLinkCompatProps>(
  (
    {
      className,
      activeClassName,
      pendingClassName,
      to,
      ...props
    },
    ref
  ) => {
    return (
      <RouterNavLink
        ref={ref}
        to={to}
        className={({ isActive, isPending }) =>
          cn(
            baseStyle,
            defaultStyle,
            isActive && (activeClassName ?? activeStyle),
            isPending && (pendingClassName ?? pendingStyle),
            className
          )
        }
        {...props}
      />
    );
  }
);

NavLink.displayName = "NavLink";

export { NavLink };