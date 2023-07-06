import { useEffect, useState, useContext } from "react";
import Layout from "/components/layout.js";
import SEO from "/components/seo.js";
import Link from "next/link";

import styles from "@/styles/pages/profile.module.scss";

import { UserContext } from "context/userContext";

const profile = () => {
  const seoTitle = "Mon compte | Hivehub";
  const seoDescription =
    "Réservez, partagez et connectez-vous dans notre écosystème d'espaces de travail dynamiques.";

  const { userInfo, logout } = useContext(UserContext);

  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className={styles.profile}>
      <Layout>
        <SEO title={seoTitle} description={seoDescription} />
        <div className={styles.section_hero}>
          <div className={styles.wrapper}>
            <div className={styles.container}>
              <div className={styles.content}>
                <h1>Mon compte</h1>
                {userInfo.isAdmin && (
                  <div className={styles.container_nav}>
                    <div
                      className={`${styles.nav_tab} ${
                        activeTab === 0 ? styles.style_active : ""
                      }`}
                      onClick={() => setActiveTab(0)}
                    >
                      <span>Mon profile</span>
                    </div>
                    <div
                      className={`${styles.nav_tab} ${
                        activeTab === 1 ? styles.style_active : ""
                      }`}
                      onClick={() => setActiveTab(1)}
                    >
                      <span>Admin</span>
                    </div>
                  </div>
                )}
                {!userInfo.isAdmin && (
                  <div className={styles.container_infos}>
                    <div className={styles.title}>Mes informations</div>
                    <div className={styles.container_row}>
                      <div className={styles.row}>
                        <div className={styles.item}>
                          <em>Prénom :</em> {userInfo.firstname}
                        </div>
                        <div className={styles.item}>
                          <em>Nom :</em> {userInfo.name}
                        </div>
                      </div>
                      <div className={styles.row}>
                        <div className={styles.item}>
                          <em>Adresse mail :</em> {userInfo.mail}
                        </div>
                      </div>
                      <div className={styles.row}>
                        <div className={styles.item}>
                          <em>Mot de passe :</em> **************
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {userInfo.isAdmin && activeTab === 0 && (
                  <div className={styles.container_infos}>
                    <div className={styles.title}>Mes informations</div>
                    <div className={styles.container_row}>
                      <div className={styles.row}>
                        <div className={styles.item}>
                          <em>Prénom :</em> {userInfo.firstname}
                        </div>
                        <div className={styles.item}>
                          <em>Nom :</em> {userInfo.name}
                        </div>
                      </div>
                      <div className={styles.row}>
                        <div className={styles.item}>
                          <em>Adresse mail :</em> {userInfo.mail}
                        </div>
                      </div>
                      <div className={styles.row}>
                        <div className={styles.item}>
                          <em>Mot de passe :</em> **************
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div className={styles.container_btn}>
                  {!userInfo.isAdmin && (
                    <>
                      <Link href="/profile/update" className={styles.btn}>
                        <span className={styles.btn_text}>Modifier</span>
                      </Link>
                      <div className={styles.btn} onClick={logout}>
                        <span className={styles.btn_text}>Déconnexion</span>
                      </div>
                    </>
                  )}
                  {userInfo.isAdmin && activeTab === 0 && (
                    <>
                      <Link href="/profile/update" className={styles.btn}>
                        <span className={styles.btn_text}>Modifier</span>
                      </Link>
                      <div className={styles.btn} onClick={logout}>
                        <span className={styles.btn_text}>Déconnexion</span>
                      </div>
                    </>
                  )}
                  {userInfo.isAdmin && activeTab === 1 && (
                    <>
                      <Link href="/admin/users" className={styles.btn}>
                        <span className={styles.btn_text}>
                          Gérer les utilisateurs
                        </span>
                      </Link>
                      <Link href="/admin/rooms" className={styles.btn}>
                        <span className={styles.btn_text}>
                          Gérer les espaces
                        </span>
                      </Link>
                    </>
                  )}
                </div>
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

export default profile;
