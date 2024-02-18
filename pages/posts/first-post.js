import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import Layout from "../../components/Layout";

export default function FirstPost() {
  return (
    <Layout>
      <Head>
        <title>first post</title>
      </Head>
      <h1>First Post</h1>
    </Layout>
  );
}
