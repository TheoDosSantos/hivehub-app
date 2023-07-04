import { useEffect, useState } from "react";
import Layout from "/components/layout.js";
import SEO from "/components/SEO";

import Link from "next/link";
import { useRouter } from "next/router";

import styles from "@/styles/pages/register.module.scss";

const login = () => {
  const seoTitle = "Inscription | Hivehub";
  const seoDescription =
    "Hivehub est une plateforme de gestion de projets open-source.";

  const [firstname, setFirstname] = useState("");
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8000/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        firstname,
        mail,
        password,
      }),
    });

    if (response.status === 201) {
      router.push("/login");
    } else {
      setError(true);
    }
  };

  return (
    <div className={styles.login}>
      <Layout>
        <SEO title={seoTitle} description={seoDescription} />
        <div className={styles.section_hero}>
          <div className={styles.wrapper}>
            <div className={styles.container}>
              <div className={styles.container_form}>
                <h1>Rejoignez-nous</h1>
                <form onSubmit={handleOnSubmit}>
                  <div className={styles.container_row}>
                    <div className={styles.container_input}>
                      <div className={styles.label}>Prénom</div>
                      <input
                        type="text"
                        placeholder="user"
                        required
                        onChange={(e) => setFirstname(e.target.value)}
                      />
                      <div className={styles.error}>
                        <img src="/img/common/icn_error.svg" alt="" />
                        <span>Erreur</span>
                      </div>
                    </div>
                    <div className={styles.container_input}>
                      <div className={styles.label}>Nom</div>
                      <input
                        type="text"
                        placeholder="hivehub"
                        required
                        onChange={(e) => setName(e.target.value)}
                      />
                      <div className={styles.error}>
                        <img src="/img/common/icn_error.svg" alt="" />
                        <span>Erreur</span>
                      </div>
                    </div>
                  </div>
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
                      <span>Un compte existe déjà avec cette email</span>
                    </div>
                  </div>
                  <div className={styles.container_input}>
                    <div className={styles.label}>Mot de passe</div>
                    <input
                      type="password"
                      placeholder="********"
                      required
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className={styles.error}>
                      <img src="/img/common/icn_error.svg" alt="" />
                      <span>Erreur</span>
                    </div>
                  </div>
                  <div className={styles.container_submit}>
                    <button className={styles.btn} type="submit">
                      <span className={styles.btn_text}>Connexion</span>
                    </button>
                    <p>
                      Vous êtes déjà inscrit chez nous ?{" "}
                      <Link href="/login">Connectez-vous</Link>
                    </p>
                  </div>
                </form>
              </div>
              <div className={styles.container_img}>
                <img src="/img/login/hero_img.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default login;
