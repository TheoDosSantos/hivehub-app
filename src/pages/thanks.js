import { useEffect, useState, useContext } from "react";
import Layout from "/components/layout.js";
import SEO from "/components/seo.js";

import Link from "next/link";

import styles from "@/styles/pages/thanks.module.scss";

const thanks = () => {
  const seoTitle = "Réservation | Hivehub";
  const seoDescription =
    "Réservez, partagez et connectez-vous dans notre écosystème d'espaces de travail dynamiques.";

  return (
    <div className={styles.thanks}>
      <Layout>
        <SEO title={seoTitle} description={seoDescription} />
        <div className={styles.section_hero}>
          <div className={styles.wrapper}>
            <div className={styles.container}>
              <div className={styles.content}>
                <h1>Merci!</h1>
                <p>
                  Votre réservation a été prise en compte, vous pourrez vous
                  présenter à nos locaux à la date convenue.
                  <br />
                  Pour le réglement, la transaction s'effectuera sur place.
                </p>
                <div className={styles.container_btn}>
                  <Link href="/" className={styles.btn}>
                    <span className={styles.btn_text}>Retour à l'accueil</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default thanks;
