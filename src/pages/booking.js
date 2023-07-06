import { useEffect, useState, useContext } from "react";
import Layout from "/components/layout.js";
import SEO from "/components/SEO";
import Lightbox from "/components/lightbox";

import styles from "@/styles/pages/booking.module.scss";

import { Calendar } from "react-calendar";

const booking = () => {
  const seoTitle = "Réservation | Hivehub";
  const seoDescription =
    "Réservez, partagez et connectez-vous dans notre écosystème d'espaces de travail dynamiques.";

  // ------- SECTION DATE PICKER ------- //
  const [date, setDate] = useState(new Date());
  const timeSlotStart = [
    { time: "08:00", value: 8 },
    { time: "09:00", value: 9 },
    { time: "10:00", value: 10 },
    { time: "11:00", value: 11 },
    { time: "12:00", value: 12 },
    { time: "13:00", value: 13 },
    { time: "14:00", value: 14 },
    { time: "15:00", value: 15 },
    { time: "16:00", value: 16 },
    { time: "17:00", value: 17 },
    { time: "18:00", value: 18 },
    { time: "19:00", value: 19 },
  ];
  const [timeStart, setTimeStart] = useState(timeSlotStart[0]);
  const [dropdownStart, setDropdownStart] = useState(false);
  const [timeSlotEnd, setTimeSlotEnd] = useState([]);
  const [timeEnd, setTimeEnd] = useState(timeSlotStart[1]);
  const [dropdownEnd, setDropdownEnd] = useState(false);

  useEffect(() => {
    const initTimeEnd = () => {
      setTimeSlotEnd(
        timeSlotStart.filter((slot) => slot.value > timeStart.value)
      );
      setTimeEnd(
        timeSlotStart.filter((slot) => slot.value > timeStart.value)[0]
      );
    };
    initTimeEnd();
  }, [timeStart]);

  useEffect(() => {
    const closeDropdown = () => {
      setDropdownEnd(false);
    };
    closeDropdown();
  }, [dropdownStart]);

  useEffect(() => {
    setFindOffice(false);
  }, [date, timeStart, timeEnd]);

  // ------- SECTION OFFICE ------- //

  const [findOffice, setFindOffice] = useState(false);
  const [bookingData, setBookingData] = useState([]);

  var bookingDate = new Date(date.setHours(8, 0, 0, 0));
  var dateStart = bookingDate.toISOString().slice(0, 11) + timeStart.time + "Z";
  var dateEnd = bookingDate.toISOString().slice(0, 11) + timeEnd.time + "Z";

  const handleOnFetch = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/rooms/available/date`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          startDateTime: dateStart,
          endDateTime: dateEnd,
        }),
      }
    );
    if (response.status === 200) {
      const bookingData = await response.json();
      setFindOffice(true);
      setBookingData(bookingData);
    }
  };

  // ------- LIGHTBOX ------- //

  const [lightbox, setLightbox] = useState(false);
  const [openLightbox, setOpenLightbox] = useState(false);
  const [lightboxRoomData, setLightboxRoomData] = useState({});
  const [lightboxBookingData, setLightboxBookingData] = useState({});

  const handleOnClick = (e, data) => {
    e.preventDefault();
    setLightbox(true);
    setOpenLightbox(true);
    setLightboxRoomData(data);
    setLightboxBookingData({
      date: date,
      startDateTime: timeStart,
      endDateTime: timeEnd,
      dateStart: dateStart,
      dateEnd: dateEnd,
    });
  };

  return (
    <div className={styles.booking}>
      <Layout>
        <SEO title={seoTitle} description={seoDescription} />
        <section className={styles.section_hero}>
          <div className={styles.wrapper}>
            <div className={styles.container}>
              <div className={styles.content}>
                <h1>
                  Réservez votre <em>espace de travail</em>
                </h1>
                <p>
                  Que vous soyez un entrepreneur, un travailleur indépendant ou
                  une équipe,
                  <br />
                  découvrez l'environnement idéal pour stimuler votre
                  productivité.
                </p>
              </div>
              <div className={styles.container_img}>
                <img src="/img/booking/hero_img.png" alt="" />
              </div>
            </div>
          </div>
        </section>
        <section className={styles.section_date}>
          <div className={styles.wrapper}>
            <div className={styles.container}>
              <div className={styles.container_text}>
                <h2>Choisissez votre créneau horaire</h2>
                <p>
                  Planifiez dès maintenant et assurez-vous un espace de travail
                  réservé rien que pour vous.
                  <br />
                  Notre outil de réservation vous permet de sélectionner
                  facilement les horaires où nos bureaux sont disponibles.{" "}
                </p>
              </div>
              <div className={styles.container_date}>
                <div className={styles.date_picker}>
                  <div className={styles.content}>
                    <Calendar
                      className={styles.calendar}
                      onChange={setDate}
                      value={date}
                      locale="fr-FR"
                      tileDisabled={({ date }) =>
                        [0, 6].includes(date.getDay())
                      }
                    />
                  </div>
                  <div className={styles.container_img}>
                    <img src="/img/booking/date_img.png" alt="" />
                  </div>
                </div>
                <div className={styles.container_time_slot}>
                  <div className={styles.container_current_date}>
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
                      : ""}
                    {", "}
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
                  </div>
                  <div className={styles.container_time}>
                    <div className={styles.container_time_start}>
                      <div className={styles.label}>Horaire d’entrée</div>
                      <div
                        className={`${styles.container_dropdown} ${
                          dropdownStart ? styles.style_open : ""
                        }`}
                        onClick={() => setDropdownStart(!dropdownStart)}
                      >
                        <div className={styles.head}>
                          <div className={styles.text}>{timeStart.time}</div>
                        </div>
                        <div className={styles.dropdown}>
                          <ul>
                            {timeSlotStart.map((slot, index) => {
                              if (index <= timeSlotStart.length - 2) {
                                return (
                                  <li
                                    key={index}
                                    onClick={() => setTimeStart(slot)}
                                  >
                                    {slot.time}
                                  </li>
                                );
                              }
                            })}
                          </ul>
                        </div>
                      </div>
                    </div>
                    {timeSlotEnd.length > 0 && (
                      <div className={styles.container_time_end}>
                        <div className={styles.label}>Horaire de sortie</div>
                        <div
                          className={`${styles.container_dropdown} ${
                            dropdownEnd ? styles.style_open : ""
                          }`}
                          onClick={() => setDropdownEnd(!dropdownEnd)}
                        >
                          <div className={styles.head}>
                            <div className={styles.text}>{timeEnd.time}</div>
                          </div>
                          <div className={styles.dropdown}>
                            <ul>
                              {timeSlotEnd.map((slot, index) => (
                                <li
                                  key={index}
                                  onClick={() => setTimeEnd(slot)}
                                >
                                  {slot.time}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className={styles.container_btn}>
                    <div className={styles.btn} onClick={handleOnFetch}>
                      <span className={styles.btn_text}>
                        Trouver mon espace
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {findOffice && bookingData && (
          <>
            <section className={styles.section_office}>
              <div className={styles.wrapper}>
                <div className={styles.container}>
                  <div className={styles.container_text}>
                    <h2>Découvrez nos bureaux disponibles</h2>
                    <p>
                      Faites le premier pas vers une expérience de travail
                      collaborative et dynamique dès maintenant.
                    </p>
                  </div>
                  <div className={styles.container_cards}>
                    {bookingData.map((data, index) => (
                      <div className={styles.card} key={index}>
                        <div className={styles.container_img}>
                          {data.name === "Serein" && (
                            <img src={"/img/booking/room_img1.png"} alt="" />
                          )}
                          {data.name === "Équilibre" && (
                            <img src={"/img/booking/room_img2.png"} alt="" />
                          )}
                          {data.name === "Paisible" && (
                            <img src={"/img/booking/room_img3.png"} alt="" />
                          )}
                          {data.name === "Harmonie" && (
                            <img src={"/img/booking/room_img4.png"} alt="" />
                          )}
                        </div>
                        <div className={styles.container}>
                          <div className={styles.content}>
                            <div className={styles.title}>{data.name}</div>
                            <ul className={styles.container_infos}>
                              <li>
                                <img
                                  src="/img/common/icn_wifi.svg"
                                  alt=""
                                  className={styles.icon}
                                />
                                <span className={styles.text}>Wifi</span>
                              </li>
                              <li>
                                <img
                                  src="/img/common/icn_coffee.svg"
                                  alt=""
                                  className={styles.icon}
                                />
                                <span className={styles.text}>Café</span>
                              </li>
                              <li>
                                <img
                                  src="/img/common/icn_slot.svg"
                                  alt=""
                                  className={styles.icon}
                                />
                                <span className={styles.text}>
                                  {data.slot}
                                  {data.slot === 1 ? " place" : " places"}
                                </span>
                              </li>
                            </ul>
                            <div className={styles.container_price}>
                              {data.hourlyRate}€/Heure
                            </div>
                            <div className={styles.text}>
                              {data.description}
                            </div>
                          </div>
                          <div className={styles.container_btn}>
                            <div
                              className={styles.btn}
                              onClick={(e) => handleOnClick(e, data)}
                            >
                              <span className={styles.btn_text}>Réserver</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
            {lightbox && (
              <Lightbox
                lightbox={{ openLightbox, setOpenLightbox }}
                roomData={lightboxRoomData}
                bookingData={lightboxBookingData}
              />
            )}
          </>
        )}
      </Layout>
    </div>
  );
};

export default booking;
