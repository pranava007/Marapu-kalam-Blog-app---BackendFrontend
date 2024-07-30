import React, { useEffect, useState } from "react";
import { Card } from "flowbite-react";

const Blogs = () => {
  const [bloges, setBloges] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await fetch("https://marapu-kalam-blog-app-backend.onrender.com/api/post/getpost");
    const data = await response.json();
    setBloges(data);
    console.log(bloges);
  };

  return (
    <div className="grid grid-cols-4 gap-4 ">
      {bloges.map((ele, index) => {
        return (
          <div key={index} className="  m-10 " >
            <Card
              className="max-w-sm"
              imgAlt="Meaningful alt text for an image that is not purely decorative"
              imgSrc={ele.image}
            >
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {ele.title}
              </h5>
              <h4 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {ele.category}
              </h4>
              <p className="font-normal text-gray-700 dark:text-gray-400">
               {ele.content}
              </p>
            </Card>
          </div>
        );
      })}
    </div>
  );
};

export default Blogs;
