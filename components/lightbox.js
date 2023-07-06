import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";

import styles from "@/styles/components/lightbox.module.scss";

import { UserContext } from "context/userContext";

const lightbox = ({ lightbox, roomData, bookingData }) => {
  const router = useRouter();
  const [date, setDate] = useState(new Date());
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [duration, setDuration] = useState(0);
  const [price, setPrice] = useState(0);

  const { userInfo } = useContext(UserContext);

  console.log(userInfo);

  useEffect(() => {
    setDate(new Date(bookingData.date));
    setStart(bookingData.startDateTime.time);
    setEnd(bookingData.endDateTime.time);
    setDuration(
      bookingData.endDateTime.value - bookingData.startDateTime.value
    );
    setPrice(
      roomData.hourlyRate *
        (bookingData.endDateTime.value - bookingData.startDateTime.value)
    );
  }, [roomData, bookingData]);

  const handleOnBooking = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/rooms/book/${roomData._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          startDateTime: bookingData.dateStart,
          endDateTime: bookingData.dateEnd,
          userid: userInfo._id,
        }),
      }
    );
    if (response.status === 200) {
      router.push("/thanks");
    }
  };

  return (
    <div
      className={`${styles.lightbox} ${
        lightbox.openLightbox === true ? styles.style_active : ""
      }`}
    >
      <div className={styles.wrapper}>
        <div className={styles.container_lightbox}>
          <div
            className={styles.close}
            onClick={() => lightbox.setOpenLightbox(false)}
          >
            <img src="/img/common/icn_close.svg" alt="" />
          </div>
          <div className={styles.container_img}>
            <img src="/img/booking/lightbox_img.png" alt="" />
          </div>
          <div className={styles.content}>
            <div className={styles.container_text}>
              <div className={styles.title}>Récapitulatif de réservation</div>
              <div className={styles.container_date}>
                <div className={styles.label}>Date & créneau horaire</div>
                <div className={styles.text}>
                  {date.getDay() === 0
                    ? "Dimanche"
                    : date.getDay() === 1
                    ? "Lundi"
                    : date.getDay() === 2
                    ? "Mardi"
                    : date.getDay() === 3
                    ? "Mercredi"
                    : date.getDay() === 4
                    ? "Jeudi"
                    : date.getDay() === 5
                    ? "Vendredi"
                    : date.getDay() === 6
                    ? "Samedi"
                    : ""}{" "}
                  {date.getDate()}{" "}
                  {date.getMonth() === 0
                    ? "Janvier"
                    : date.getMonth() === 1
                    ? "Février"
                    : date.getMonth() === 2
                    ? "Mars"
                    : date.getMonth() === 3
                    ? "Avril"
                    : date.getMonth() === 4
                    ? "Mai"
                    : date.getMonth() === 5
                    ? "Juin"
                    : date.getMonth() === 6
                    ? "Juillet"
                    : date.getMonth() === 7
                    ? "Août"
                    : date.getMonth() === 8
                    ? "Septembre"
                    : date.getMonth() === 9
                    ? "Octobre"
                    : date.getMonth() === 10
                    ? "Novembre"
                    : date.getMonth() === 11
                    ? "Décembre"
                    : ""}
                  ,
                  {start !== "" && end !== "" && (
                    <span>
                      {" "}
                      de {start} à {end}
                    </span>
                  )}
                </div>
              </div>
              <div className={styles.container_price}>
                <div className={styles.label}>Coût</div>
                <div className={styles.text}>
                  {price}€ ({duration}h de réservation)
                </div>
              </div>
              <div className={styles.container_description}>
                <div className={styles.label}>Espace de travail</div>
                <div className={styles.text}>
                  {roomData.description} :
                  <br />
                  écran, clavier, souris et imprimante.
                  <br />
                  Wifi & café illimité.
                </div>
              </div>
            </div>
            <div className={styles.container_btn}>
              <div className={styles.btn} onClick={handleOnBooking}>
                <span className={styles.btn_text}>
                  Confirmer ma réservation
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={styles.background}
        onClick={() => lightbox.setOpenLightbox(false)}
      ></div>
    </div>
  );
};

export default lightbox;
