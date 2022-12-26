import React from "react";
import * as Icon from "react-feather";
import * as FaIcon from "react-icons/fa";
import { SiApplearcade } from "react-icons/si";
import { MdDashboard, MdBusinessCenter, MdPersonOutline } from "react-icons/md";
import { BsPersonCircle } from "react-icons/bs";
import { FaRegHandshake, FaUserTie } from "react-icons/fa";
import { TbBox } from "react-icons/tb";
import { GoGraph } from "react-icons/go";
import { IoLogoAppleAr } from "react-icons/io5";
import { RiAppsLine } from "react-icons/ri";
import { GiMagnifyingGlass } from "react-icons/gi";

const navigationConfig = [
  {
    id: "dashboard",
    title: "Dashboard",
    type: "collapse",
    icon: <MdDashboard size={20} />,
    children: [
      {
        id: "business",
        title: "Business",
        type: "item",
        icon: <MdBusinessCenter size={12} />,
        navLink: "/",
      },
      {
        id: "analytics",
        title: "Analytics",
        type: "item",
        icon: <GoGraph size={12} />,
        navLink: "/dashboard/analytics",
      },
    ],
  },
  {
    id: "leads",
    title: "Leads",
    type: "item",
    icon: <GiMagnifyingGlass size={20} />,
    navLink: "/leadr",
  },
  {
    id: "applications",
    title: "Applications",
    type: "item",
    icon: <FaIcon.FaFileAlt size={20} />,
    navLink: "/applications",
  },
  {
    id: "reports",
    title: "Reports",
    type: "item",
    icon: <FaIcon.FaClipboardList size={20} />,
    navLink: "/generate_reports",
  },
  {
    id: "bre",
    title: "BRE",
    type: "item",
    icon: <FaIcon.FaSitemap size={20} />,
    navLink: "/bre",
  },

  {
    id: "organisations",
    title: "Organisations",
    type: "item",
    icon: <FaIcon.FaThList size={20} />,
    navLink: "/organisation",
  },
  {
    id: "Originator",
    title: "Originator",
    type: "collapse",
    icon: <Icon.Home size={20} />,
    badge: "warning",
    badgeText: "2",
    children: [
      {
        id: "Applications",
        title: "Applications",
        type: "collapse",
        icon: <SiApplearcade size={20} />,
        children: [
          {
            id: "individualLoans",
            title: "Individual Applications",
            type: "item",
            icon: <RiAppsLine size={22} />,
            navLink: "/applications/individual",
          },
          {
            id: "smeLoans",
            title: "SME Applications",
            type: "item",
            icon: <IoLogoAppleAr size={22} />,
            navLink: "/applications/sme",
          },
        ],
      },
      {
        id: "Customers",
        title: "Customers",
        type: "collapse",
        icon: <FaUserTie size={20} />,
        children: [
          {
            id: "individualCustomer",
            title: "Individual Customers",
            type: "item",
            icon: <MdPersonOutline size={22} />,
            navLink: "/customers/individual",
          },
          {
            id: "smeCustomer",
            title: "SME Customers",
            type: "item",
            icon: <BsPersonCircle size={22} />,
            navLink: "/customers/sme",
          },
        ],
      },
      {
        id: "Originatorreports",
        title: "Reports",
        type: "item",
        icon: <FaIcon.FaClipboardList size={20} />,
        navLink: "/originator_reports",
      },
      {
        id: "partners",
        title: "Partners",
        type: "item",
        icon: <FaRegHandshake size={24} />,
        navLink: "/organisation/partners",
      },
    ],
  },
  {
    id: "products",
    title: "Products",
    type: "item",
    icon: <TbBox size={24} />,
    navLink: "/organisation/products",
  },
  {
    id: "fees_collection",
    title: "Fees Collection",
    type: "item",
    icon: <TbBox size={24} />,
    navLink: "/fees-collection/applications",
  },
  {
    id: "generate_kit",
    title: "Generate Kit",
    type: "item",
    icon: <TbBox size={24} />,
    navLink: "/generate-kit/applications",
  },
  {
    id: "disbursement",
    title: "Disbursement",
    type: "item",
    icon: <FaIcon.FaRupeeSign size={20} />,
    navLink: "/check_disbursement",
  },
  {
    id: "lms",
    title: "LMS",
    type: "item",
    icon: <FaIcon.FaExternalLinkAlt size={20} />,
    navLink: "#",
  },
];

export default navigationConfig;
