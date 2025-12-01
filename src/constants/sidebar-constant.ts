import {
  LayoutDashboard,
  Store,
  Users,
  Package,
  ClipboardList,
  CreditCard,
  ChartBar,
  ClipboardClock 
} from "lucide-react";

export const SIDEBAR_MENU_LIST = {
  admin: [
    {
      title: "Users Management",
      url: "/dashboard/users",
      icon: Users,
      features: [
        {
          title: "Add User",
          url: "/dashboard/users/add",
        },
        {
          title: "Menage User",
          url: "/dashboard/users/list",
        },
      ],
    },
    {
      title: "Outlet Management",
      url: "/dashboard/outlet",
      icon: Store,
      features: [
        {
          title: "Add Outlet",
          url: "/dashboard/outlet/add",
        },
        {
          title: "Menage Outlet",
          url: "/dashboard/outlet/list",
        },
      ],
    },
    {
      title: "Packet Management",
      url: "/dashboard/packet",
      icon: Package,
      features: [
        {
          title: "Add Packet",
          url: "/dashboard/packet/add",
        },
        {
          title: "Menage Packet",
          url: "/dashboard/packet/list",
        },
      ],
    },
    {
      title: "Orders",
      url: "/dashboard/orders",
      icon: ClipboardList,
    },
    {
      title: "Processing",
      url: "/dashboard/processing",
      icon: ClipboardClock,
    },
    {
      title: "Transaction",
      url: "/dashboard/transaction",
      icon: CreditCard,
      features: [
        // {
        //   title: "List Transaction",
        //   url: "/dashboard/transaction/list",
        // },
        {
          title: "Menage Transaction",
          url: "/dashboard/transaction/menage",
        },
      ],
    },
    {
      title: "Report",
      url: "/dashboard/report",
      icon: ChartBar,
      features: [
        // {
        //   title: "list Report",
        //   url: "/dashboard/report/list",
        // },
        {
          title: "Menage Report",
          url: "/dashboard/report/menage",
        },
      ],
    },
  ],

  kasir: [
    {
      title: "Users Management",
      url: "/dashboard/users",
      icon: Users,
      features: [
        {
          title: "Tambah User",
          url: "/dashboard/users/add",
        },
        {
          title: "Menage User",
          url: "/dashboard/users/list",
        },
      ],
    },
    {
      title: "Orders",
      url: "/dashboard/orders",
      icon: ClipboardList,
    },
    {
      title: "Processing",
      url: "/dashboard/processing",
      icon: ClipboardClock,
    },
    {
      title: "Transaction",
      url: "/dashboard/transaction",
      icon: CreditCard,
      features: [
        // {
        //   title: "List Transaction",
        //   url: "/dashboard/transaction/list",
        // },
        {
          title: "Menage Transaction",
          url: "/dashboard/transaction/menage",
        },
      ],
    },
    {
      title: "Report",
      url: "/dashboard/report",
      icon: ChartBar,
      features: [
        // {
        //   title: "list Report",
        //   url: "/dashboard/report/list",
        // },
        {
          title: "Menage Report",
          url: "/dashboard/report/menage",
        },
      ],
    },
  ],
  owner: [
    {
      title: "Report",
      url: "/dashboard/report",
      icon: ChartBar,
      features: [
        // {
        //   title: "list Report",
        //   url: "/dashboard/report/list",
        // },
        {
          title: "Menage Report",
          url: "/dashboard/report/menage",
        },
      ],
    },
  ],
  user: [
    {
      title: "My Order",
      url: "/dashboard/my_order",
      icon: ClipboardList,
      features: [
        {
          title: "Buat Pesanan",
          url: "/dashboard/my_order/add",
        },
        {
          title: "Riwayat Pesanan",
          url: "/dashboard/my_order/history",
        },
      ],
    },
    {
      title: "My Transaction",
      url: "/dashboard/my_transaction",
      icon: ClipboardList,
      features: [
        {
          title: "Bill",
          url: "/dashboard/my_transaction/paid",
        },
        {
          title: "History Transaction",
          url: "/dashboard/my_transaction/history",
        },
      ],
    }
  ],
};

export type SIDEBAR_MENU_KEY = keyof typeof SIDEBAR_MENU_LIST;

export const SIDEBAR_SECRET_MENU_LIST = [
  { title: "Transaction" },
  { title: "Report" },
]

export const SIDEBAR_ORDERS_MENU_LIST = [
  { title: "Orders" },
  { title: "Processing" },
]

export type SIDEBAR_SECRET_MENU_KEY = typeof SIDEBAR_SECRET_MENU_LIST

export type SIDEBAR_ORDERS_MENU_KEY = typeof SIDEBAR_ORDERS_MENU_LIST