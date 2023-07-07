import { useEffect, useState, useContext } from "react";
import Layout from "/components/layout.js";
import SEO from "/components/seo.js";

import Link from "next/link";
import { useRouter } from "next/router";

import styles from "@/styles/pages/updateProfile.module.scss";

import { UserContext } from "context/userContext";

const updateProfile = () => {
  const seoTitle = "Modifier mes informations | Hivehub";
  const seoDescription =
    "Réservez, partagez et connectez-vous dans notre écosystème d'espaces de travail dynamiques.";

  const { userInfo } = useContext(UserContext);

  const [firstname, setFirstname] = useState(userInfo.firstname);
  const [name, setName] = useState(userInfo.name);
  const [mail, setMail] = useState(userInfo.mail);
  const [error, setError] = useState(false);
  const [noChangement, setNoChangement] = useState(false);
  const router = useRouter();

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (
      firstname !== userInfo.firstname ||
      name !== userInfo.name ||
      mail !== userInfo.mail
    ) {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/${userInfo._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            firstname: firstname,
            name: name,
            mail: mail,
          }),
        }
      );
      if (response.status === 200) {
        setNoChangement(false);
        router.push("/");
      }
    } else {
      setNoChangement(true);
    }
  };

  return (
    <div className={styles.update_profile}>
      <Layout>
        <SEO title={seoTitle} description={seoDescription} />
        <div className={styles.section_hero}>
          <div className={styles.wrapper}>
            <div className={styles.container}>
              <div className={styles.container_form}>
                <h1>Mon compte</h1>
                <form onSubmit={handleOnSubmit}>
                  <div className={styles.container_row}>
                    <div className={styles.container_input}>
                      <div className={styles.label}>Prénom</div>
                      <input
                        type="text"
                        placeholder={userInfo.firstname}
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
                        placeholder={userInfo.name}
                        required
                        onChange={(e) => setName(e.target.value)}
                      />
                      <div className={styles.error}>
                        <img src="/img/common/icn_error.svg" alt="" />
                        <span>Erreur</span>
                      </div>
                    </div>
                  </div>
                  <div className={styles.container_input}>
                    <div className={styles.label}>Adresse email</div>
                    <input
                      type="email"
                      placeholder={userInfo.mail}
                      required
                      onChange={(e) => setMail(e.target.value)}
                    />
                    <div className={styles.error}>
                      <img src="/img/common/icn_error.svg" alt="" />
                      <span>Un compte existe déjà avec cette email</span>
                    </div>
                  </div>
                  <div
                    className={`${styles.container_submit} ${
                      noChangement ? styles.style_error : ""
                    }`}
                  >
                    <button className={styles.btn} type="submit">
                      <span className={styles.btn_text}>Enregistrer</span>
                    </button>
                    <div className={styles.error}>
                      <img src="/img/common/icn_error.svg" alt="" />
                      <span>Vous n'avez pas fait de changement</span>
                    </div>
                  </div>
                </form>
              </div>
              <div className={styles.container_img}>
                <img src="/img/profile/hero_img.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default updateProfile;
