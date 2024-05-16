import React from "react";

interface UserPageProps {
  title: string;
}

const UserPage: React.FC<UserPageProps> = () => {
  return <div className="flex justify-center">login or sign up</div>;
};

export default UserPage;
