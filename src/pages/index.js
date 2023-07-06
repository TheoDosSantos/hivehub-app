import { useEffect, useState, useContext } from "react";
import Layout from "/components/layout.js";
import SEO from "/components/seo.js";
import Link from "next/link";

import styles from "@/styles/pages/home.module.scss";

import { UserContext } from "context/userContext";

const home = () => {
  const seoTitle = "Accueil | Hivehub";
  const seoDescription =
    "Réservez, partagez et connectez-vous dans notre écosystème d'espaces de travail dynamiques.";

  const { isAuth } = useContext(UserContext);

  return (
    <div className={styles.home}>
      <Layout>
        <SEO title={seoTitle} description={seoDescription} />
        <section className={styles.section_hero}>
          <div className={styles.wrapper}>
            <div className={styles.container}>
              <div className={styles.content}>
                <h1>
                  Réinventons <em>ensemble</em> le travail partagé
                </h1>
                <p>
                  Réservez, partagez et connectez-vous dans notre écosystème
                  d'espaces de travail dynamiques.
                </p>
                <div className={styles.container_btn}>
                  {!isAuth && (
                    <Link href="/register" className={styles.btn}>
                      <span className={styles.btn_text}>Rejoignez nous</span>
                      <svg
                        className={styles.btn_icon}
                        viewBox="0 0 16 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g id={styles.content}>
                          <path d="M1 6.5C0.447715 6.5 0 6.94772 0 7.5C0 8.05228 0.447715 8.5 1 8.5V6.5ZM15.7071 8.20711C16.0976 7.81658 16.0976 7.18342 15.7071 6.79289L9.34315 0.428932C8.95262 0.0384079 8.31946 0.0384079 7.92893 0.428932C7.53841 0.819456 7.53841 1.45262 7.92893 1.84315L13.5858 7.5L7.92893 13.1569C7.53841 13.5474 7.53841 14.1805 7.92893 14.5711C8.31946 14.9616 8.95262 14.9616 9.34315 14.5711L15.7071 8.20711ZM1 8.5H15V6.5H1V8.5Z" />
                        </g>
                      </svg>
                    </Link>
                  )}
                  {isAuth && (
                    <Link href="/booking" className={styles.btn}>
                      <span className={styles.btn_text}>
                        Réserver un espace
                      </span>
                    </Link>
                  )}
                </div>
              </div>
              <div className={styles.container_img}>
                <img src="/img/home/hero_img.png" alt="" />
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </div>
  );
};

export default home;
