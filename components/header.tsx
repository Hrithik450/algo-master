"use client";

import React from "react";
import Image from "next/image";
import { scroller } from "react-scroll";
import type { Session } from "next-auth";
import { cn, navLists } from "@/lib/utils";
import { LogOut, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SessionContext } from "@/app/layout-wrapper";
import { usePathname, useRouter } from "next/navigation";
import { signOutAccount } from "@/actions/auth/sign-out";
import { signInWithGoogle } from "@/actions/auth/sign-in";

function PageNavigations({
  className,
  itemClassName,
}: {
  className: string;
  itemClassName: string;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavRoute = async (section: string) => {
    if (pathname !== "/") {
      router.push(`/`);
    }

    scroller.scrollTo(section, {
      duration: 300,
      smooth: true,
      offset: 0,
    });
  };

  return (
    <div className={cn("flex flex-1 w-full", className)}>
      {navLists.map((navItem) => (
        <div
          className={cn(
            "w-max text-black xl:px-3 transition-all cursor-pointer",
            itemClassName
          )}
          key={navItem.id}
        >
          <button
            className="cursor-pointer"
            onClick={() => handleNavRoute(navItem.id)}
          >
            {navItem.label}
          </button>
        </div>
      ))}
    </div>
  );
}

function AuthNavigations({
  className,
  session,
}: {
  className: string;
  session: Session | null;
}) {
  return !session ? (
    <div className={cn("w-full flex gap-4 xl:gap-6", className)}>
      <Button
        variant="default"
        className="rounded-full px-6 xl:px-10 py-6 text-base cursor-pointer"
        onClick={async () => await signInWithGoogle()}
      >
        Login
      </Button>
    </div>
  ) : (
    <div className={cn("w-full flex gap-4", className)}>
      <div className="flex items-center gap-2">
        {session.user?.image && (
          <Image
            src={session.user.image}
            alt={session.user.name ?? "User"}
            width={36}
            height={36}
            className="rounded-full"
          />
        )}
        <span className="text-lg font-medium text-gray-700">
          {session.user?.name}
        </span>
      </div>
      <div className="relative group">
        <button
          onClick={async () => await signOutAccount()}
          className="cursor-pointer px-6 lg:px-2 py-2 rounded-full border border-red-600 text-red-600 hover:bg-red-50 flex justify-center items-center gap-2"
        >
          <LogOut className="w-5 h-5" />
          <p className="lg:hidden">Logout</p>
        </button>

        <div className="hidden sm:block absolute -bottom-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-sm rounded-md px-3 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out pointer-events-none">
          Logout
        </div>
      </div>
    </div>
  );
}

export function Header() {
  const session = React.useContext(SessionContext);
  const [menuOpen, setMenuOpen] = React.useState<boolean>(false);

  //   React.useEffect(() => {
  //     if (session && session.user && session.user.id)
  //       setCurrentUserId(session.user?.id);
  //   }, [session, setCurrentUserId]);

  return (
    <header
      id="header"
      className={cn(
        "max-w-480 mx-auto absolute z-98 w-full py-6 sm:py-8 px-4 md:px-8 lg:px-20 bg-transparent flex justify-between items-center"
      )}
    >
      <nav
        className={cn(
          "container mx-auto flex justify-between items-center w-full backdrop-blur-xs border border-gray-400/60 rounded-full p-2 xl:p-3 transition-colors duration-300 ease-in-out"
        )}
      >
        {/* Logo */}
        <div className="md:flex-1 flex items-center gap-3">
          <h1 className={cn("mx-2 md:mx-4 text-xl")}>Algo Master</h1>
        </div>

        {/* Desktop Nav Links */}
        <div className="md:flex-1">
          <PageNavigations
            className="max-lg:hidden"
            itemClassName="text-base md:text-base xl:text-lg"
          />
        </div>

        {/* Desktop Buttons */}
        <div className="md:flex-1 flex justify-end">
          <AuthNavigations
            className="ml-auto max-lg:hidden justify-end"
            session={session}
          />
        </div>

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden flex items-center px-2">
          {menuOpen ? (
            <X
              className="cursor-pointer text-black"
              onClick={() => setMenuOpen(false)}
            />
          ) : (
            <Menu
              className="cursor-pointer text-black"
              onClick={() => setMenuOpen(true)}
            />
          )}
        </div>

        {/* Mobile Menu Drawer */}
        <div
          className={cn(
            "lg:hidden mx-auto absolute top-[120%] left-0 z-5 w-full rounded-4xl py-6 px-6 flex flex-col items-center gap-2 shadow-xs transition-all duration-300 ease-in-out transform",
            menuOpen
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 translate-y-4 pointer-events-none"
          )}
        >
          <PageNavigations
            className="text-lg space-y-6 flex-col justify-center"
            itemClassName="text-base md:text-lg"
          />

          <AuthNavigations className="flex-col mt-4" session={session} />
        </div>
      </nav>
    </header>
  );
}
