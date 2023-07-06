import { useEffect, useState, useContext } from "react";
import Layout from "/components/layout.js";
import SEO from "/components/seo.js";

import Link from "next/link";
import { useRouter } from "next/router";

import styles from "@/styles/pages/login.module.scss";

import { UserContext } from "context/userContext";

const login = () => {
  const seoTitle = "Connexion | Hivehub";
  const seoDescription =
    "Réservez, partagez et connectez-vous dans notre écosystème d'espaces de travail dynamiques.";

  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();

  const { login } = useContext(UserContext);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/users/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          mail,
          password,
        }),
      }
    );
    if (response.status === 200) {
      const userInfo = await response.json();
      login(userInfo);
      router.push("/booking");
    } else {
      setError(true);
    }
  };

  return (
    <div className={styles.login}>
      <Layout>
        <SEO title={seoTitle} description={seoDescription} />
        <section className={styles.section_hero}>
          <div className={styles.wrapper}>
            <div className={styles.container}>
              <div className={styles.container_form}>
                <h1>Connectez-vous</h1>
                <form onSubmit={handleOnSubmit}>
                  <div
                    className={`${styles.container_input} ${
                      error ? styles.style_error : ""
                    }`}
                  >
                    <div className={styles.label}>Adresse email</div>
                    <input
                      type="email"
                      placeholder="user@hivehub.com"
                      required
                      onChange={(e) => setMail(e.target.value)}
                    />
                    <div className={styles.error}>
                      <img src="/img/common/icn_error.svg" alt="" />
                      <span>Pas de correspondance email & mot de passe</span>
                    </div>
                  </div>
                  <div
                    className={`${styles.container_input} ${
                      error ? styles.style_error : ""
                    }`}
                  >
                    <div className={styles.label}>Mot de passe</div>
                    <input
                      type="password"
                      placeholder="********"
                      required
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className={styles.error}>
                      <img src="/img/common/icn_error.svg" alt="" />
                      <span>Pas de correspondance email & mot de passe</span>
                    </div>
                  </div>
                  <div className={styles.container_submit}>
                    <button className={styles.btn} type="submit">
                      <span className={styles.btn_text}>Connexion</span>
                    </button>
                    <p>
                      Vous n’êtes pas encore enregistré chez nous ?{" "}
                      <Link href="/register">Rejoingez-nous</Link>
                    </p>
                  </div>
                </form>
              </div>
              <div className={styles.container_img}>
                <img src="/img/login/hero_img.png" alt="" />
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </div>
  );
};

export default login;
