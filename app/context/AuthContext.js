// "use client"
// import { createContext, useContext, useState, useEffect } from "react";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [Loading, setLoading] = useState(null);

//   useEffect(() => {
//        const fetchUser = async () => {
//       try {
//         const res = await fetch("http://localhost:7000/user/register", {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
            
//           }
//         });

//         if (res.ok) {
//           const data = await res.json();
//           console.log(data);
          
//           localStorage.setItem("user", data)
//           setUser(data);
//         } else {
//           setUser(null);
//         }
//       } catch (err) {
//         setUser(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUser();

//   }, [user]);

//   const login = (userData) => {
//     localStorage.setItem("user", JSON.stringify(userData));
//     setUser(userData);
//   };

//   const logout = () => {
//     localStorage.removeItem("user");
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
