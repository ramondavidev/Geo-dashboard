"use client";

import { Layout } from "@/components/Layout";
import { UserManagement } from "@/components/UserManagement/UserManagement";

export default function Home() {
  return (
    <Layout title="Geo-CRUD">
      <UserManagement />
    </Layout>
  );
}
