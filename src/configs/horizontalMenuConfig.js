import React from "react";
import * as Icon from "react-feather";

const horizontalMenuConfig = [
  {
    id: "dashboard",
    title: "Dashboard",
    type: "item",
    icon: <Icon.Home size={20} />,
    navLink: "/",
  },
  {
    id: "customer",
    title: "Customer",
    type: "collapse",
    icon: <Icon.Home size={20} />,
    badge: "warning",
    badgeText: "2",
    children: [
      {
        id: "individualCustomer",
        title: "Individual Customer",
        type: "item",
        icon: <Icon.Circle size={12} />,
        navLink: "/customers",
      },
      {
        id: "smeCustomer",
        title: "SME Customer",
        type: "item",
        icon: <Icon.Circle size={12} />,
        navLink: "/customers/sme",
      },
    ],
  },
  {
    id: "applications",
    title: "Applications",
    type: "collapse",
    icon: <Icon.Home size={20} />,
    badge: "warning",
    badgeText: "2",
    children: [
      {
        id: "individualLoans",
        title: "Individual Loans",
        type: "item",
        icon: <Icon.Circle size={12} />,
        navLink: "/applications/individual",
      },
      {
        id: "smeLoans",
        title: "SME Loans",
        type: "item",
        icon: <Icon.Circle size={12} />,
        navLink: "/applications/sme",
      },
    ],
  },
  {
    id: "bre",
    title: "BRE",
    type: "item",
    icon: <Icon.File size={20} />,
    navLink: "/rules",
  },
  {
    id: "reports",
    title: "Reports",
    type: "item",
    icon: <Icon.MessageSquare size={20} />,
    navLink: "/reports",
  },
  {
    id: "organisations",
    title: "Organisations",
    type: "item",
    icon: <Icon.CheckSquare size={20} />,
    navLink: "/organisation",
  },
];

export default horizontalMenuConfig;
