import {
  MdDashboard,
  MdSupervisedUserCircle,
  MdPendingActions,
  MdOutlineSettings,
  MdHelpCenter,
  MdOutlineBusinessCenter,
  MdLogout,
} from "react-icons/md";
import MenuLink from "./MenuLink";
import "./sidebar.css"
import {useSendLogoutMutation} from "../../features/auth/authApiSlice"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
const SideBar = () => {
  const {username, fullname, company, roles} = useAuth()
  const navigate = useNavigate()
  const [logout, {isSuccess}] =useSendLogoutMutation()
  const adminMenuItems = [
    {
      title: "דפים",
      list: [
        {
          title: "ראשי",
          path: "/dash",
          icon: <MdDashboard />,
        },
        {
          title: "משתמשים",
          path: "/dash/users",
          icon: <MdSupervisedUserCircle />,
        },
        {
          title: "חברות",
          path: "/dash/companies",
          icon: <MdOutlineBusinessCenter />,
        },
        {
          title: "פעולות",
          path: "/dash/actions",
          icon: <MdPendingActions />,
        },
      ],
    },
    {
      title: "משתמש",
      list: [
        {
          title: "הגדרות",
          path: "/dash/settings",
          icon: <MdOutlineSettings />,
        },
        {
          title: "עזרה",
          path: "/dash/help",
          icon: <MdHelpCenter />,
        },
      ],
    },
  ];
  const userMenuItems = [
    {
      title: "דפים",
      list: [
        {
          title: "ראשי",
          path: "/dash",
          icon: <MdDashboard />,
        },
        {
          title: "פעולות",
          path: "/dash/actions",
          icon: <MdPendingActions />,
        },
      ],
    },
    {
      title: "משתמש",
      list: [
        {
          title: "הגדרות",
          path: "/dash/settings",
          icon: <MdOutlineSettings />,
        },
        {
          title: "עזרה",
          path: "/dash/help",
          icon: <MdHelpCenter />,
        },
      ],
    },
  ];

  const menuItems = roles==="Admin"? adminMenuItems: userMenuItems

  // useEffect(()=>{
  //   if(isSuccess){
  //     navigate("/login")
  //   }
  // }, [isSuccess])
  const logoutClick = () =>{
      logout()
      navigate("/login")
  }

  return (
    <div className="side-bar">
      <div className="side-bar-user">
        <img
          src={company.image? "http://localhost:1100/uploads/" + company.image : "/noavatar.png"}
          alt=""
          width="50"
          height="50"
          className="side-bar-user-image"
        />
        <div className="side-bar-user-details">
          <span className="side-car-user-username">{fullname}</span>
          <span className="side-car-user-title">{company?.name}</span>
          <span className="side-car-user-title">{roles}</span>
        </div>
      </div>

      <ul className="side-bar-menu-list">
        {menuItems.map(cat=>(
          <li key={cat.title}>
            <span className="side-bar-menu-cat">{cat.title}</span>
            {cat.list.map(item=>(
              <MenuLink item={item} key={item.title} />
            ))}
          </li>
        ))}
      </ul>
      <button onClick={logoutClick} className="side-bar-logout">
        <MdLogout />
        יציאה
      </button>
    </div>
  );
};

export default SideBar;
