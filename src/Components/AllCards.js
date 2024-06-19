import React from "react";
import DashboardCards from "./DashboardCards";
import todo from "../Images/todo.png";
import stats from "../Images/stats.jpg";
import announcements from "../Images/announcements.jpg";
import chat from "../Images/chat.png";
export default function AllCards() {
  const cardData = [
    {
      title: "To-Do List",
      description: "description 1",
      image: todo,
    },
    {
      title: "Statistics",
      description: "description 2",
      image: stats,
    },
    {
      title: "Announcements",
      description: "description 3",
      image: announcements,
    },
    {
      title: "Chat",
      description: "description 4",
      image: chat,
    },
    {
        title: "Chat",
        description: "description 4",
        image: chat,
      },
      {
        title: "Chat",
        description: "description 4",
        image: chat,
      },
      {
        title: "Chat",
        description: "description 4",
        image: chat,
      },
  ];

  return (
    <div>
      <DashboardCards props={cardData} />
    </div>
  );
}
