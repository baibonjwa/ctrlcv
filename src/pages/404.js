import React from "react";
import Footer from "../components/footer";
import Header from "../components/header";

const NotFoundPage = () => (
  <>
    <Header />
    <div className="container mx-auto text-center min-h-screen">
      <h1 className="mt-10 mb-10 text-6xl text-yellow-600">404</h1>
      <h1 className="mt-10 text-4xl text-yellow-600">页面未找到</h1>
      <p className="mt-10 text-gray-400 underline">
        <a href="/">点此返回首页</a>
      </p>
    </div>
    <Footer />
  </>
);

export default NotFoundPage;
