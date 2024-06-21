import React, { useEffect, useState } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { NavLink } from "react-router-dom";
import { Hoc } from "../Components/Hoc";
import { Container } from "@mui/material";
import news1 from "../Images/news1.webp";
import news3 from "../Images/news3.webp";
import news5 from "../Images/news5.webp";
import news6 from "../Images/llllll.jpg";
import news9 from "../Images/news9.webp";
import nse from "../Images/nse.webp";
import googal from "../Images/googal.webp";
import news11 from "../Images/news11.webp";
import news13 from "../Images/news13.jpg";
import newspaper from "../Images/timesofindia.jpg";
import { Card } from "react-bootstrap";
import { HashLoader } from "react-spinners";

const Dashboard = () => {
  const [isLoading, setIsloading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsloading(false)
    }, 2000);
  }, [])
  return (
    <>
      {isLoading === true ? <HashLoader color="#121621" style={{ height:'100vh'}}/> : <div>
      <div className="container-fluid dashboard-news-wrapper m-0 p-0">
          <div className="container-fluid m-0 p-0">
            <div className="row g-3 m-0 p-0">
              {/* First div */}
              <div className="col-lg-3 col-md-6 col-sm-12" >
                <img src={news3} alt="" className="img-fluid rounded object-fit-contain" style={{ width: "100%" }} />
                <hr />
                <div className="text-capitalize px-2 py-2">
                  PM Modi To Stake Claim To Form Government Today After NDA Meet: Sources | Live Updates Rahul Gandhi To Appear Before Bengaluru Court In Defamation Case.
                </div>
                <hr />
                <div className="text-capitalize px-2 py-2">
                PM Modi LIVE Updates: PM's first visit to Varanasi post poll victory today, to release 17th instalment of Rahul gandhi.
                </div>
              </div>

              {/* Second Div */}
              <div className="col-lg-3 col-md-6 col-sm-12" >
                <img src={news1} alt="" className="img-fluid rounded" />
                <span className="text-capitalize">After Congress' Stock Market Charge,BJP's"5th Largest Economy" Rebuttal</span>
                <hr />
                <span className="text-capitalize">Babar Azam Minces No Words After Embarrassing Loss To USA, Blames...</span>
                <hr />
                <span className="text-capitalize">Watch: Rohit, Kohli React As 'Best Fielder' Award Returns With Fresh Twist</span>
                <hr />
                <span className="text-capitalize">Watch: Raina, Jadeja React As 'Best Fielder' Award Returns With Fresh Twist</span>
              </div>

              {/* Third Div */}
              <div className="col-lg-3 col-md-12 col-sm-12" >
                <div className="video-container" style={{ width: "100%", height: "auto" }}>
                  <video className="video-player img-fluid rounded" width="100%" height="400px" controls autoPlay muted loop preload="metadata" title="Sample Video">
                    <source src="https://ndtvod.pc.cdn.bitgravity.com/23372/ndtv/wap_gify_Ranbir_125726_119010_320.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <span>Watch: "New Day, New Skill" Added To Ranbir Kapoor's Fitness Diaries</span>
                  <hr />
                  <span>"My Mother Was At Farmers Protest": Constable Who "Slapped" Kangana Ranaut"</span>
                  <hr />
                  <span>MPC Keeps Repo Rate Unchanged At 6.5%, Lifts FY25 GDP Growth To 7.2%</span>
                </div>
              </div>

              <div className="col-lg-3 col-md-12 col-sm-12">
                <div className="video-container" style={{ width: "100%", height: "auto" }}>
                  <video className="video-player img-fluid rounded" width="100%" height="400px" controls autoPlay muted loop preload="metadata" title="Sample Video">
                    <source src="https://ndtvod.pc.cdn.bitgravity.com/23372/ndtv/wap_gify_SunitaGIF_125703_118977_320.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <span>Watch: Indian-Origin Sunita Williams Dances On Her Arrival At Space Station</span>
                  <hr />
                  <span>Phool Kumari X Jasmine: Nitanshi Goel "Manifests" A Crossover With Kareena</span>
                  <hr />
                  <span>Review: Gullak 4 Retains The Edge Despite A Few Stray Passages </span>
                </div>
              </div>
            </div>
          </div>
        </div>
 
        <div className="container-fluid dashboard-news-wrapper" style={{ paddingTop: "30px" }}>
          <div className="container-fluid m-0 p-0">
            <div className="row g-3 px-3 py-3" style={{ justifyContent: 'center' }}>
              <div className="col-lg-2 col-md-6 col-sm-12">
                <Card className="m-0 p-0" style={{ width: "100%" }}>
                  <Card.Img variant="top" src={news3} className="m-0 p-0" height={150} />
                  <Card.Body>
                    <Card.Text>NDA Meets To Decide On Cabinet, Nitish Kumar, C Naidu Seek Key Posts</Card.Text>
                  </Card.Body>
                </Card>
              </div>
              <div className="col-lg-2 col-md-6 col-sm-12">
                <Card className="m-0 p-0" style={{ width: "100%" }}>
                  <Card.Img variant="top" src={news5} className="m-0 p-0" height={150} />
                  <Card.Body>
                    <Card.Text>Mumbai Engineer Stars In USA's Stunning Super Over Win Against Pakistan</Card.Text>
                  </Card.Body>
                </Card>
              </div>
              <div className="col-lg-2 col-md-6 col-sm-12">
                <Card className="m-0 p-0" style={{ width: "100%" }}>
                  <Card.Img variant="top" src={news6} className="m-0 p-0" height={150} />
                  <Card.Body>
                    <Card.Text >RBI May Not Cut Policy Rate Even If Federal Reserve Does: Shaktikanta </Card.Text>
                  </Card.Body>
                </Card>
              </div>
              <div className="col-lg-2 col-md-6 col-sm-12">
                <Card className="m-0 p-0" style={{ width: "100%" }}>
                  <Card.Img variant="top" src={news9} className="m-0 p-0" height={150} />
                  <Card.Body>
                    <Card.Text>Constable Who Slapped Kangana Ranaut Suspended, Arrested</Card.Text>
                  </Card.Body>
                </Card>
              </div>
              <div className="col-lg-2 col-md-6 col-sm-12">
                <Card className="m-0 p-0 " style={{ width: "100%" }}>
                  <Card.Img variant="top" src={nse} className="m-0 p-0" height={150} />
                  <Card.Body>
                    <Card.Text>Constable Who Slapped Kangana Ranaut Suspended, Arrested
                      Lorem ipsum dolor.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
              <div className="col-lg-2 col-md-6 col-sm-12">
                <Card className="m-0 p-0  text-dark" style={{ width: "100%" }}>
                  <Card.Img variant="top" src={googal} className="m-0 p-0" height={150} />
                  <Card.Body>
                    <Card.Text>What is the biggest perk of working at technology major
                      googal WorkOffice.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid dashboard-news-wrapper">
          <div className="container-fluid m-0 p-0">
            <div className="row g-3 px-3 py-3">
              {/* First div */}
              <div className="col-lg-3 col-md-6 col-sm-12">
                <img src={news11} alt="" className="img-fluid rounded object-fit-contain" style={{ width: "100%" }} />
                <hr />
                <div className="text-capitalize">
                  12 Pocket-Friendly Restaurants In Mumbai To Explore The City On A BudgetMumbai Food Guide: Here are some of the city's legendary restaurants that serve delicious and budget-friendly food.Toshita SahniUpdated: June 05, 2024 21:08
                  <hr />
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, voluptatem.
                   <hr />
                   Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, voluptatem.

                </div>
              </div>

              {/* Second Div */}
              <div className="col-lg-3 col-md-6 col-sm-12">
                <img src={news13} alt="" className="img-fluid rounded" />
                <span className="text-capitalize">The India Meteorological Department (IMD) on Friday (June 7) said the monsoon is expected to reach Mumbai between June 9 and 10. The IMD said the southwest</span>
                <hr />
                <span className="text-capitalize">In Pics: New Parents Varun Dhawan-Natasha Dalal Take Their Baby Girl Home</span>
                <hr />
                <span className="text-capitalize">WHO Says 1.6 Million People Globally Fall Ill Daily Due To Contaminated Food</span>
                <hr />
                <span className="text-capitalize">WHO Says 1.6 Million People Globally Fall Ill Daily Due To Contaminated Food</span>

              </div>

              {/* Third Div */}
              <div className="col-lg-3 col-md-12 col-sm-12">
                <div className="video-container" style={{ width: "100%", height: "auto" }}>
                  <video className="video-player img-fluid rounded" width="100%" height="400px" controls autoPlay muted loop preload="metadata" title="Sample Video">
                    <source src="https://ndtvod.pc.cdn.bitgravity.com/23372/ndtv/wap_gify_SunitaGIF_125703_118977_320.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <span>Watch: Indian-Origin Sunita Williams Dances On Her Arrival At Space Station</span>
                  <hr />
                  <span>Phool Kumari X Jasmine: Nitanshi Goel "Manifests" A Crossover With Kareena</span>
                  <hr />
                  <span>Review: Gullak 4 Retains The Edge Despite A Few Stray Passages </span>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12">
                <img src={newspaper} alt="" className="img-fluid rounded" />
                <span className="text-capitalize">The India Meteorological Department (IMD) on Friday (June 7) said the monsoon is expected to reach Mumbai between June 9 and 10. The IMD said the southwest</span>
                <hr />
                <span className="text-capitalize">In Pics: New Parents Varun Dhawan-Natasha Dalal Take Their Baby Girl Home</span>
                <hr />
                <span className="text-capitalize">WHO Says 1.6 Million People Globally Fall Ill Daily Due To Contaminated Food</span>
                <hr />
                <span className="text-capitalize">WHO Says 1.6 Million People Globally Fall Ill Daily Due To Contaminated Food</span>
             </div>
            </div>
          </div>
        </div>
      </div>
      }
    </>
  );
};

export default Hoc(Dashboard);
