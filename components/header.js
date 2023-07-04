import { useEffect, useState, useContext } from "react";
import Link from "next/link";

import styles from "@/styles/components/header.module.scss";

import { UserContext } from "context/userContext";

const header = ({ action }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { isAuth } = useContext(UserContext);

  const handleScroll = () => {
    const scrollPosition = window.pageYOffset;

    if (scrollPosition > 1) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    const mediaQuery = window.matchMedia("(min-width: 1248px)");
    setIsMobile(!mediaQuery.matches);
    mediaQuery.addEventListener("change", (event) => {
      if (event.matches) {
        setIsMobile(false);
      } else {
        setIsMobile(true);
      }
    });
  }, [isMobile]);

  return (
    <header
      className={`${styles.header} ${isScrolled ? styles.style_scroll : ""}`}
    >
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.container_logo}>
            <Link href="/">
              {!isMobile && (
                <img
                  src="/img/common/header_img_desktop.png"
                  alt="hivehub-logo"
                />
              )}
              {isMobile && (
                <img
                  src="/img/common/header_img_mobile.png"
                  alt="hivehub-logo"
                />
              )}
            </Link>
          </div>
          {action && (
            <div className={styles.container_action}>
              {!isAuth && (
                <Link href="/login" className={styles.link}>
                  Connexion
                </Link>
              )}
              {isAuth && (
                <Link href="/profile" className={styles.link}>
                  Mon compte
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default header;
