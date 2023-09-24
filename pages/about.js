import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import Navbar from '../components/navbar';
import Footer from '../components/footer'
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData } from '../lib/posts';
import Link from 'next/link';
import Date from '../components/date';

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function About({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className="text-light">
        <p>Alll about...</p>
      </section>
      <Footer />
    </Layout>
  );
}
