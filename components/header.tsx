import { SessionContext } from "@/app/layout-wrapper";
import React from "react";

// export function Header() {
//   const session = React.useContext(SessionContext);
//   const [menuOpen, setMenuOpen] = React.useState<boolean>(false);

//   //   React.useEffect(() => {
//   //     if (session && session.user && session.user.id)
//   //       setCurrentUserId(session.user?.id);
//   //   }, [session, setCurrentUserId]);

//   return (
//     <header
//       id="header"
//       className={cn(
//         "max-w-480 mx-auto absolute z-98 w-full py-6 sm:py-8 px-4 md:px-8 lg:px-20 bg-transparent flex justify-between items-center",
//         guminertRegular.className
//       )}
//     >
//       <nav
//         className={cn(
//           "container mx-auto flex justify-between items-center w-full backdrop-blur-xs border border-gray-400/60 rounded-full p-2 xl:p-3 transition-colors duration-300 ease-in-out",
//           menuOpen
//             ? "bg-[linear-gradient(to_bottom,rgb(210,245,130)_0%,white_100%)]"
//             : "bg-white/25"
//         )}
//       >
//         {/* Logo */}
//         <div className="md:flex-1 flex items-center gap-3">
//           <Image
//             width={40}
//             height={40}
//             src={NeylonAI}
//             alt="neylon-ai"
//             className="rounded-full"
//           />
//           <h1 className={cn(guminertBold.className, "text-xl")}>Neylon AI</h1>
//         </div>

//         {/* Desktop Nav Links */}
//         <div className="md:flex-1">
//           <PageNavigations
//             className="max-lg:hidden"
//             itemClassName="text-base md:text-base xl:text-lg"
//           />
//         </div>

//         {/* Desktop Buttons */}
//         <div className="md:flex-1 flex justify-end">
//           <AuthNavigations
//             className="ml-auto max-lg:hidden"
//             session={session}
//           />
//         </div>

//         {/* Mobile Menu Toggle */}
//         <div className="lg:hidden flex items-center px-2">
//           {menuOpen ? (
//             <X
//               className="cursor-pointer text-black"
//               onClick={() => setMenuOpen(false)}
//             />
//           ) : (
//             <Menu
//               className="cursor-pointer text-black"
//               onClick={() => setMenuOpen(true)}
//             />
//           )}
//         </div>

//         {/* Mobile Menu Drawer */}
//         <div
//           className={cn(
//             "lg:hidden mx-auto absolute top-[110%] left-0 z-5 w-full bg-[linear-gradient(to_bottom,rgb(210,245,130)_0%,white_100%)] border border-gray-400/60 rounded-2xl py-6 px-6 flex flex-col items-center gap-2 shadow-md transition-all duration-300 ease-in-out transform",
//             menuOpen
//               ? "opacity-100 translate-y-0 pointer-events-auto"
//               : "opacity-0 translate-y-4 pointer-events-none"
//           )}
//         >
//           <PageNavigations
//             className="flex-col text-lg text-center space-y-6"
//             itemClassName="text-base md:text-lg"
//           />

//           <AuthNavigations className="flex-col mt-4" session={session} />
//         </div>
//       </nav>
//     </header>
//   );
// }
