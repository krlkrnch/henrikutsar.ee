import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactDom from "react-dom";
import axios from "axios";
import buffer from "../images/buffer.gif";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";

export default function ProjectView( ) {
  // FETCH DATA FROM WORDPRESS REST API
  const [posts, setPosts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  // Set different sizes of the REST API images
  const { slug } = useParams();

  // GET THE WIDTH OF IMAGE ORDER TO SET WIDTH OF DESCRIPTION CONTAINER
  const targetRef = useRef();
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  useEffect(() => {
    // TO MAKE SURE THE BODY OVERFLOW IS NEVER UNSET
    function hashHandler() {
      document.querySelector("body").style.overflow = "hidden";
    }
    window.addEventListener("hashchange", hashHandler, false);

    function handleResize() {
      if (targetRef.current) {
        setDimensions({
          width: targetRef.current.offsetWidth,
          height: targetRef.current.offsetHeight,
        });
      }
    }
    window.addEventListener("resize", handleResize);

    const fetchData = async () => {
      const results = await axios(
        `https://henrikutsar.ee/admin/wp-json/acf/v3/projektid?slug[]=${slug}`
      );

      setPosts(results.data);
      setIsOpen(true);
    };
    handleResize();
    hashHandler();
    fetchData();
  }, [slug]);

  const DESCRIPTIONS_CONTAINER = {
    width: dimensions.width,
  };

  const LONGER_PARAGRAPH_DESCRIPTION = {
    paddingTop: "3.4%",
    display: "block",
  };

  const OVERYLAY_STYLES = {
    position: "fixed",
    height: "100%",
    // backdropFilter: "blur(8px)",
    width: "100vw",
    overflow: "scroll",
  };

  const PROJECT_VIEW_BACKGROUNDCOLOR = {
    // backgroundColor: posts.projektivaate_taustavarv,
    backgroundColor: "rgba(253, 241, 244)",
  };

  // GO BACK TO PREVIOUS PAGE, CHANGE BODY OVERFLOW TO UNSET
  let history = useHistory();
  const routeChange = () => {
    history.push("/");
  };
  if (isOpen) {
    return ReactDom.createPortal(
      <div>
        {posts &&
          posts.map((pilt) => (
            <div
              key={pilt.id}
              className="overlay-styles"
              style={OVERYLAY_STYLES}
              onClick={routeChange}
            >
              <div className="larger-project-view">
                <motion.div
                  initial={{
                    transform: "translateY(-100%)",
                  }}
                  animate={{ transform: "translateY(0%)" }}
                  exit={{ transform: "translateY(0%)" }}
                  transition={{ duration: 0.1 }}
                >
                  <div className="main-landing-picture-container">
                    <div
                      ref={targetRef}
                      onClick={(e) => {
                        // do not close projectview if anything inside modal content is clicked
                        e.stopPropagation();
                      }}
                      className="landing-picture-container"
                    >
                      <img
                        className="landing-picture"
                        src={pilt.acf.thumbnaili_foto.url}
                        alt="Savant"
                      />
                    </div>
                  </div>
                </motion.div>

                {/* FIRST PARAGRAPHS AFTER PROJECT PICTURE*/}
                <div
                  className="main-description-container"
                  style={PROJECT_VIEW_BACKGROUNDCOLOR}
                >
                  <div
                    onClick={(e) => {
                      // do not close projectview if anything inside modal content is clicked
                      e.stopPropagation();
                    }}
                    style={DESCRIPTIONS_CONTAINER}
                    className="descriptions-container"
                  >
                    <div>
                      <div className="project-details">
                        <div>
                          <div className="project-client">
                            <div>{pilt.acf.vasak_esimene_tekst}</div>

                            <div>{pilt.acf.vasak_teine_tekst}</div>
                          </div>

                          <div className="year-cvi">
                            <div>{pilt.acf.parem_esimene_tekst}</div>
                            <div>{pilt.acf.parem_teine_tekst}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* LONGER, DETAILED PARAGRAPH */}
                    <div
                      className="longer-paragraph-description"
                      style={LONGER_PARAGRAPH_DESCRIPTION}
                    >
                      {pilt.acf.kirjeldus}
                    </div>
                    {/* PROJECT PICTURES*/}
                    <div className="project-view-pictures">
                      {pilt.acf.pildid &&
                        pilt.acf.pildid.map((pildid) => (
                          <div key={pildid.id} className="project-picture-size">
                            <img src={pildid.url} alt="kai_keskus_2" />
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="smaller-project-view"
                onClick={(e) => {
                  // do not close projectview if anything inside modal content is clicked
                  e.stopPropagation();
                }}
              >
                {/* <nav className="project-nav"> */}
                {/* <div className="project-list-items project-henri-kutsar-element"> */}
                {/* <div>HENRI KUTSAR</div> */}
                {/* <Link onClick={routeChange} to={"/"}> */}
                {/* HENRI KUTSAR */}
                {/* </Link> */}
                {/* </div> */}
                {/* <InfoContact /> */}
                {/* </nav> */}

                {/* <Header /> */}

                <motion.div
                  initial={{
                    transform: "translateY(-100%)",
                  }}
                  animate={{ transform: "translateY(0%)" }}
                  exit={{ transform: "translateY(0%)" }}
                  transition={{ duration: 0.1 }}
                >
                  <div
                    style={PROJECT_VIEW_BACKGROUNDCOLOR}
                    className="main-landing-picture-container"
                  >
                    {pilt.acf.vaikse_ekraani_pilt &&
                      pilt.acf.vaikse_ekraani_pilt.map((pildid) => (
                        <div
                          key={pildid.id}
                          className="landing-picture-container"
                        >
                          <img
                            className="landing-picture"
                            src={pildid.sizes.medium_large}
                            alt="trenn"
                          />
                        </div>
                      ))}
                  </div>
                  {/* FIRST PARAGRAPHS AFTER PROJECT PICTURE*/}
                  <div
                    className="main-description-container"
                    style={PROJECT_VIEW_BACKGROUNDCOLOR}
                  >
                    <div className="descriptions-container">
                      <div className="project-details">
                        <div className="project-client">
                          <div>{pilt.acf.vasak_esimene_tekst}</div>
                          <div>{pilt.acf.vasak_teine_tekst}</div>
                        </div>

                        <div className="year-cvi">
                          <div>{pilt.acf.parem_esimene_tekst}</div>
                          <div>{pilt.acf.parem_teine_tekst}</div>
                        </div>
                      </div>
                      {/* LONGER, DETAILED PARAGRAPH */}
                      <div
                        className="longer-paragraph-description"
                        style={LONGER_PARAGRAPH_DESCRIPTION}
                      >
                        {pilt.acf.kirjeldus}
                      </div>
                      {/* PROJECT PICTURES*/}
                      <div className="project-view-pictures">
                        {pilt.acf.pildid &&
                          pilt.acf.pildid.map((pildid) => (
                            <div
                              key={pildid.id}
                              className="project-picture-size"
                            >
                              <img
                                src={pildid.sizes.medium_large}
                                alt="kai_keskus_2"
                              />
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          ))}
      </div>,

      document.getElementById("project-view")
    );
  }

  return (
    <div className="main-buffer-container">
      <div className="buffer-container">
        <img className="buffer-image" src={buffer} alt="" />
      </div>
    </div>
  );
}
