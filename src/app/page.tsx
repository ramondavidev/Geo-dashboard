"use client";

import { useState } from "react";
import { Layout } from "@/components/Layout";
import { UserManagement } from "@/components/UserManagement/UserManagement";

export default function Home() {
  const [userCount, setUserCount] = useState(0);

  const handleUserCountChange = (count: number) => {
    setUserCount(count);
  };

  return (
    <Layout 
      title="Geo-CRUD" 
      showFooter={true} 
      userCount={userCount}
    >
      <UserManagement onUserCountChange={handleUserCountChange} />
    </Layout>
  );
}
