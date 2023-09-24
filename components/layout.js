import Head from 'next/head';
import Image from 'next/image';
import styles from './layout.module.css';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import Sidebar from './Sidebar';
const name = 'Craig Breaden';
export const siteTitle = 'Engineered By Breaden';

export default function Layout({ children, home }) {
  return (
    <div className="h-screen bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] from-blue-700 via-blue-800 to-gray-900 flex flex-row">
      <Sidebar />
      <div className="b flex-1 p-4 text-white border-dashed">
        <header className={styles.header}>
          {home ? (
            <>
              <Image
                priority
                src="/images/profile.jpg"
                className="rounded-xl"
                height={144}
                width={144}
                alt=""
              />
            </>
          ) : (
            <>
              <Link href="/">
                <Image
                  priority
                  src="/images/profile.jpg"
                  className="rounded-xl"
                  height={108}
                  width={108}
                  alt=""
                />
              </Link>
            </>
          )}
        </header>
        <main>{children}</main>
        {!home && (
          <div className={styles.backToHome}>
            <Link href="/">← Back to home</Link>
          </div>
        )}
      </div>
    </div>
    // </div>
  );
}
