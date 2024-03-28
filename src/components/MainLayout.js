import React, { useState } from "react";
import {
  AiOutlineDashboard,
  AiOutlinePicLeft,
  AiOutlinePicRight,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from "react-icons/ai";
import { SiBrandfolder } from "react-icons/si";
import { TbCategory } from "react-icons/tb";
import { IoColorPaletteOutline } from "react-icons/io5";
import { IoMdListBox, IoIosNotifications } from "react-icons/io";
import { FaBlog, FaBloggerB } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import { Layout, Menu, Button, theme } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
const { Header, Sider, Content } = Layout;
const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical logo">
          <h2 className="text-white fs-5 text-center py-3 mb-0">
            <span className="lg-logo">Alex.</span>
            <span className="sm-logo">AX</span>
          </h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[""]}
          onClick={({ key }) => {
            if (key === "signout") {
            } else {
              navigate(key);
            }
          }}
          items={[
            {
              key: "",
              icon: <AiOutlineDashboard className="fs-5" />,
              label: "Dashboard",
            },
            {
              key: "customers",
              icon: <AiOutlineUser className="fs-5" />,
              label: "Customers",
            },
            {
              key: "catalog",
              icon: <AiOutlineShoppingCart className="fs-5" />,
              label: "Catalog",
              children: [
                {
                  key: "add-product",
                  icon: <AiOutlineShoppingCart className="fs-5" />,
                  label: "Product",
                },
                {
                  key: "product-list",
                  icon: <AiOutlineShoppingCart className="fs-5" />,
                  label: "Product List",
                },
                {
                  key: "add-brand",
                  icon: <SiBrandfolder className="fs-5" />,
                  label: "Brand",
                },
                {
                  key: "brand-list",
                  icon: <SiBrandfolder className="fs-5" />,
                  label: "Brand List",
                },
                {
                  key: "add-product-category",
                  icon: <TbCategory className="fs-5" />,
                  label: "Category",
                },
                {
                  key: "category-list",
                  icon: <TbCategory className="fs-5" />,
                  label: "Category List",
                },
                {
                  key: "add-color",
                  icon: <IoColorPaletteOutline className="fs-5" />,
                  label: "Color",
                },
                {
                  key: "color-list",
                  icon: <IoColorPaletteOutline className="fs-5" />,
                  label: "Color List",
                },
                {
                  key: "coupon-list",
                  icon: <IoColorPaletteOutline className="fs-5" />,
                  label: "Coupon List",
                },
                {
                  key: "add-coupon",
                  icon: <IoColorPaletteOutline className="fs-5" />,
                  label: "Add Coupon",
                },
              ],
            },
            {
              key: "orders",
              icon: <IoMdListBox className="fs-5" />,
              label: "Orders",
            },
            {
              key: "blog",
              icon: <FaBloggerB className="fs-5" />,
              label: "Blog",
              children: [
                {
                  key: "add-blog",
                  icon: <FaBlog className="fs-5" />,
                  label: "Add Blog",
                },
                {
                  key: "blog-list",
                  icon: <FaBloggerB className="fs-5" />,
                  label: " Blog List",
                },
                {
                  key: "add-blog-category",
                  icon: <FaBlog className="fs-5" />,
                  label: "Add Blog Category",
                },
                {
                  key: "blog-category-list",
                  icon: <FaBloggerB className="fs-5" />,
                  label: " Blog Category List",
                },
              ],
            },
            {
              key: "enquiries",
              icon: <IoMdListBox className="fs-5" />,
              label: "Enquiries",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          className="d-flex flex-row ps-3 pe-5 justify-content-between"
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={
              collapsed ? (
                <AiOutlinePicRight className="fs-3" />
              ) : (
                <AiOutlinePicLeft className="fs-3" />
              )
            }
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <div className="d-flex gap-3 align-items-center mb-0 ">
            <div className="position-relative">
              <IoIosNotifications className="fs-4" />
              <span className="badge bg-warning position-absolute rounded-circle p-1">
                3
              </span>
            </div>
            <div className="d-flex align-items-center gap-3">
              <div
                style={{ width: "32px", height: "32px" }}
                className="d-flex "
              >
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzBXNuO6PezhC18aYH_2cYtS0I7KbxoKYdwA&usqp=CAU"
                  alt=""
                  className="w-100"
                />
              </div>
              <div className="d-flex flex-column">
                <div className="dropdown">
                  <button
                    className="btn btn-transparte dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Dropdown button
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <a className="dropdown-item" href="/">
                        View Profile
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/">
                        Change Password
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/">
                        LogOut
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="dropdown"></div>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <ToastContainer
            position="top-right"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;
