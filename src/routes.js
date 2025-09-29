import Index from "./pages/Index/Index";
import CourseInfo from "./pages/CourseInfo/CourseInfo";
import ArticleInfo from "./pages/ArticleInfo/ArticleInfo";
import CategoryInfo from "./pages/CategoryInfo/CategoryInfo";
import Courses from "./pages/Courses/Courses";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Articles from "./pages/Articles/Articles";
import Contact from "./pages/Contact/Contact";
import Search from "./pages/Search/Search";

import PAdminPrivate from "./Components/Privates/PAdminPrivate"; //private below routes
import AdminPanel from "./pages/AdminPanel/index";
import IndexPanel from "./pages/AdminPanel/Index/Index";
import Users from "./pages/AdminPanel/Users/Users";
import AdminCourses from "./pages/AdminPanel/Courses/Courses";
import Menus from "./pages/AdminPanel/Menus/Menus";
import AdminArticles from "./pages/AdminPanel/Articles/Articles";
import Draft from "./pages/AdminPanel/Articles/Draft";
import AdminCategory from "./pages/AdminPanel/Category/Category";
import AdminContacts from "./pages/AdminPanel/AdminContacts/AdminContacts";
import AdminSessions from "./pages/AdminPanel/AdminSessions/AdminSessions";
import SessionInfo from "./pages/SessionInfo/SessionInfo";
import AdminComments from "./pages/AdminPanel/AdminComments/AdminComments";
import AdminOffs from "./pages/AdminPanel/AdminOffs/AdminOffs";
import AdminTickets from "./pages/AdminPanel/AdminTickets/AdminTickets";
import AdminCampaign from "./pages/AdminPanel/AdminCampaign/AdminCampaign";

import UserPanelPrivate from "./Components/Privates/UserPanelPrivate"; //private below routes
import UserPanel from "./pages/UserPanel/UserPanel";
import IndexUserPanel from "./pages/UserPanel/IndexUserPanel/IndexUserPanel";
import UserOrders from "./pages/UserPanel/UserOrders/UserOrders";
import UserCourses from "./pages/UserPanel/UserCourses/UserCourses";
import UserTickets from "./pages/UserPanel/UserTickets/Tickets";
import SendTicket from "./pages/UserPanel/UserTickets/SendTicket";
import TicketAnswer from "./pages/UserPanel/UserTickets/TicketAnswer";
import EditAccount from "./pages/UserPanel/EditAccount/EditAccount";

const routes = [
  { path: "/", element: <Index /> },
  { path: "/course-info/:courseName", element: <CourseInfo /> },
  { path: "/:courseName/:sessionID", element: <SessionInfo /> },
  { path: "/article/:articleName", element: <ArticleInfo /> },
  { path: "/category-info/:categoryName", element: <CategoryInfo /> },
  { path: "/category-info/:categoryName/:page", element: <CategoryInfo /> },
  { path: "/courses", element: <Courses /> },
  { path: "/courses/:page", element: <Courses /> },
  { path: "/articles", element: <Articles /> },
  { path: "/articles/:page", element: <Articles /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/contact", element: <Contact /> },
  { path: "/search/:value", element: <Search /> },

  {
    path: "/p-admin/*",
    element: (
      <PAdminPrivate>
        <AdminPanel />
      </PAdminPrivate>
    ),
    children: [
      { path: "", element: <IndexPanel /> },
      { path: "users", element: <Users /> },
      { path: "courses", element: <AdminCourses /> },
      { path: "menus", element: <Menus /> },
      { path: "articles/draft/:shortName", element: <Draft /> },
      { path: "articles", element: <AdminArticles /> },
      { path: "category", element: <AdminCategory /> },
      { path: "contacts", element: <AdminContacts /> },
      { path: "sessions", element: <AdminSessions /> },
      { path: "comments", element: <AdminComments /> },
      { path: "offs", element: <AdminOffs /> },
      { path: "tickets", element: <AdminTickets /> },
      { path: "campaign", element: <AdminCampaign /> },
    ],
  },

  {
    path: "/my-account/*",
    element: (
      <UserPanelPrivate>
        <UserPanel />
      </UserPanelPrivate>
    ),
    children: [
      { path: "", element: <IndexUserPanel /> },
      { path: "orders", element: <UserOrders /> },
      { path: "buyed", element: <UserCourses /> },
      { path: "tickets", element: <UserTickets /> },
      { path: "send-ticket", element: <SendTicket /> },
      { path: "tickets/answer/:ticketID", element: <TicketAnswer /> },
      { path: "edit-account", element: <EditAccount /> },
    ],
  },
];

export default routes;
