import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import Navbar from '../components/navbar';
import Footer from '../components/footer'
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData } from '../lib/posts';
import Link from 'next/link';
import Date from '../components/date';
import React from 'react';
import { FaLinkedin, FaGithub, FaAt } from "react-icons/fa";

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Contact({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <a href="www.linkedin.com/in/craig-breaden" className="text-2xl text-gray-600 dark:text-gray-50">
        <a className="inline-block"><FaLinkedin /></a>
        <a className="inline-block">linkedin.com/in/craig-breaden</a  >
      </a>

      <a className="text-5xl text-gray-600 dark:text-gray-50">
        <a href="https://www.github.com/craigbreaden"><FaGithub /></a>
      </a>
      <a className="text-5xl text-gray-600 dark:text-gray-50">
        <a href="mailto:craig@engineeredbybreaden.com"><FaAt /></a>
      </a>
      <Footer />
    </Layout>
  );
}