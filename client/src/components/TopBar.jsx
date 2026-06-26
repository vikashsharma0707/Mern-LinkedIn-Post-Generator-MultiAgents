

// import { useState } from "react";
// import { useAuth } from "../context/AuthContext.jsx";
// import {
//   Bell,
//   Search,
//   User,
//   ChevronDown,
//   X,
// } from "lucide-react";

// const TopBar = () => {
//   const { user } = useAuth();
//   const [showSearch, setShowSearch] = useState(false);

//   return (
//     <>
//       <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-lg border-b border-gray-200 shadow-sm">
//         <div className="flex items-center justify-between px-3 sm:px-5 lg:px-6 py-3">
          
//           {/* Left Section */}
//           <div className="flex items-center gap-3 ml-12 lg:ml-0 min-w-0">
//             <div className="min-w-0">
//               <h2 className="text-base sm:text-lg lg:text-xl font-bold text-gray-800 truncate">
//                 👋 Welcome Back
//               </h2>
//               <p className="text-xs sm:text-sm text-gray-500 truncate">
//                 {user?.name || "Admin"} Dashboard
//               </p>
//             </div>
//           </div>

//           {/* Desktop Search */}
//           <div className="hidden lg:flex items-center bg-gray-100 rounded-xl px-4 py-2 w-[320px] xl:w-[400px]">
//             <Search size={18} className="text-gray-500" />
//             <input
//               type="text"
//               placeholder="Search..."
//               className="bg-transparent outline-none px-3 w-full text-sm text-gray-700"
//             />
//           </div>

//           {/* Right Section */}
//           <div className="flex items-center gap-2 sm:gap-4">

//             {/* Mobile Search Button */}
//             <button
//               onClick={() => setShowSearch(true)}
//               className="lg:hidden p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition"
//             >
//               <Search size={18} className="text-gray-700" />
//             </button>

//             {/* Notification */}
//             <button className="relative p-2 sm:p-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition">
//               <Bell size={20} className="text-gray-700" />

//               <span className="absolute top-2 right-2 flex h-2.5 w-2.5">
//                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
//                 <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
//               </span>
//             </button>

//             {/* User Profile */}
//             <div className="flex items-center gap-2 sm:gap-3 cursor-pointer bg-gray-100 hover:bg-gray-200 px-2 sm:px-3 py-2 rounded-xl transition">

//               <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
//                 <User size={18} className="text-white" />
//               </div>

//               <div className="hidden md:block max-w-[180px]">
//                 <h4 className="text-sm font-semibold text-gray-800 truncate">
//                   {user?.name || "Admin"}
//                 </h4>
//                 <p className="text-xs text-gray-500 truncate">
//                   {user?.email || "admin@gmail.com"}
//                 </p>
//               </div>

//               <ChevronDown
//                 size={16}
//                 className="hidden md:block text-gray-500"
//               />
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Mobile Search Modal */}
//       {showSearch && (
//         <div className="fixed inset-0 z-50 bg-black/40 lg:hidden">
//           <div className="bg-white p-4 shadow-lg">
//             <div className="flex items-center gap-3">
//               <div className="flex items-center flex-1 bg-gray-100 rounded-xl px-3 py-2">
//                 <Search size={18} className="text-gray-500" />
//                 <input
//                   type="text"
//                   placeholder="Search..."
//                   autoFocus
//                   className="bg-transparent outline-none px-3 w-full text-sm"
//                 />
//               </div>

//               <button
//                 onClick={() => setShowSearch(false)}
//                 className="p-2 rounded-lg bg-gray-100"
//               >
//                 <X size={18} />
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default TopBar;





import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useTheme } from "../context/ThemeContext.jsx";
import {
  Bell,
  Search,
  User,
  ChevronDown,
  X,
  Sun,
  Moon,
} from "lucide-react";

const TopBar = () => {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [showSearch, setShowSearch] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-lg border-b border-gray-200
                         dark:bg-[#0a0c12]/90 dark:border-white/[0.06]">
        <div className="flex items-center justify-between px-3 sm:px-5 lg:px-6 py-3">

          {/* Left Section */}
          <div className="flex items-center gap-3 ml-12 lg:ml-0 min-w-0">
            <div className="min-w-0">
              <h2 className="text-base sm:text-lg lg:text-xl font-bold text-gray-800 dark:text-white truncate">
                👋 Welcome Back
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-white/40 truncate">
                {user?.name || "Admin"} Dashboard
              </p>
            </div>
          </div>

          {/* Desktop Search */}
          <div className="hidden lg:flex items-center bg-gray-100 border border-transparent rounded-xl px-4 py-2 w-[320px] xl:w-[400px]
                          dark:bg-white/[0.05] dark:border-white/[0.06]
                          focus-within:border-gray-300 dark:focus-within:border-white/20 transition-colors">
            <Search size={18} className="text-gray-500 dark:text-white/40" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none px-3 w-full text-sm text-gray-700 dark:text-white
                         placeholder:text-gray-400 dark:placeholder:text-white/30"
            />
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2 sm:gap-3">

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 sm:p-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition
                         dark:bg-white/[0.05] dark:border dark:border-white/[0.06] dark:hover:bg-white/[0.08]"
            >
              {theme === 'dark' ? (
                <Sun size={20} className="text-white/70" />
              ) : (
                <Moon size={20} className="text-gray-700" />
              )}
            </button>

            {/* Mobile Search Button */}
            <button
              onClick={() => setShowSearch(true)}
              className="lg:hidden p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition
                         dark:bg-white/[0.05] dark:border dark:border-white/[0.06] dark:hover:bg-white/[0.08]"
            >
              <Search size={18} className="text-gray-700 dark:text-white/70" />
            </button>

            {/* Notification */}
            <button className="relative p-2 sm:p-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition
                               dark:bg-white/[0.05] dark:border dark:border-white/[0.06] dark:hover:bg-white/[0.08]">
              <Bell size={20} className="text-gray-700 dark:text-white/70" />

              <span className="absolute top-2 right-2 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
              </span>
            </button>

            {/* User Profile */}
            <div className="flex items-center gap-2 sm:gap-3 cursor-pointer bg-gray-100 hover:bg-gray-200 px-2 sm:px-3 py-2 rounded-xl transition
                            dark:bg-white/[0.05] dark:border dark:border-white/[0.06] dark:hover:bg-white/[0.08]">

              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-pink-500
                              flex items-center justify-center shadow-lg shadow-fuchsia-500/20 flex-shrink-0">
                <User size={18} className="text-white" />
              </div>

              <div className="hidden md:block max-w-[180px]">
                <h4 className="text-sm font-semibold text-gray-800 dark:text-white truncate">
                  {user?.name || "Admin"}
                </h4>
                <p className="text-xs text-gray-500 dark:text-white/40 truncate">
                  {user?.email || "admin@gmail.com"}
                </p>
              </div>

              <ChevronDown
                size={16}
                className="hidden md:block text-gray-500 dark:text-white/40"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Search Modal */}
      {showSearch && (
        <div className="fixed inset-0 z-50 bg-black/40 dark:bg-black/60 backdrop-blur-sm lg:hidden">
          <div className="bg-white dark:bg-[#0a0c12] dark:border-b dark:border-white/[0.06] p-4 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="flex items-center flex-1 bg-gray-100 dark:bg-white/[0.05] dark:border dark:border-white/[0.06] rounded-xl px-3 py-2">
                <Search size={18} className="text-gray-500 dark:text-white/40" />
                <input
                  type="text"
                  placeholder="Search..."
                  autoFocus
                  className="bg-transparent outline-none px-3 w-full text-sm text-gray-800 dark:text-white
                             placeholder:text-gray-400 dark:placeholder:text-white/30"
                />
              </div>

              <button
                onClick={() => setShowSearch(false)}
                className="p-2 rounded-lg bg-gray-100 dark:bg-white/[0.05] text-gray-700 dark:text-white/70"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TopBar;