import { useEffect } from "react";

export const Test = () => {
  const url = "https://instagram28.p.rapidapi.com/search?search=pawan";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "c5dce4266fmsh4498b13688a8fe7p13712bjsnf554b0ac76c7",
      "X-RapidAPI-Host": "instagram28.p.rapidapi.com",
    },
  };

  useEffect(() => {
    try {
      const response = fetch(url, options);
      const result = response.text();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }, []);

  return <div>test</div>;
};
