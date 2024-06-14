import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { NavLink } from "react-router-dom";
import { Hoc } from "../Components/Hoc";
import { Container } from "@mui/material";
import news1 from "../Images/news1.webp";
import news3 from "../Images/news3.webp";
import news5 from "../Images/news5.webp";
import news6 from "../Images/llllll.jpg";
import news9 from "../Images/news9.webp";
import news11 from "../Images/news11.webp";
import news13 from "../Images/news13.jpg";
import { Card } from "react-bootstrap";

const Dashboard = () => {
  return (
    <>
      <div className="container-fluid dashboard-news-wrapper">
        <div className="container-fluid">
          <div className="row g-3 px-3 py-3">
            {/* First div */}
            <div className="col-lg-5 col-md-6 col-sm-12" style={{ borderRight: "1px solid #505050" }}>
              <img src={news3} alt="" className="img-fluid rounded object-fit-contain" style={{ width: "100%"}} />
              <hr />
              <h4>
                PM Modi To Stake Claim To Form Government Today After NDA Meet: Sources | Live Updates Rahul Gandhi To Appear Before Bengaluru Court In Defamation Case Today.
              </h4>
            </div>

            {/* Second Div */}
            <div className="col-lg-3 col-md-6 col-sm-12" style={{ borderRight: "1px solid #505050" }}>
              <img src={news1} alt="" className="img-fluid rounded" />
              <span className="text-capitalize">After Congress' Stock Market Charge,BJP's"5th Largest Economy" Rebuttal</span>
              <hr />
              <span className="text-capitalize">Babar Azam Minces No Words After Embarrassing Loss To USA, Blames...</span>
              <hr />
              <span className="text-capitalize">Watch: Rohit, Kohli React As 'Best Fielder' Award Returns With Fresh Twist</span>
            </div>

            {/* Third Div */}
            <div className="col-lg-4 col-md-12 col-sm-12" style={{ borderRight: "1px solid #505050" }}>
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
          </div>
        </div>
      </div>
      <hr />

      <div className="container-fluid dashboard-news-wrapper" style={{ paddingTop: "30px" }}>
        <div className="container-fluid m-0 p-0">
          <div className="row g-3 px-3 py-3">
            <div className="col-lg-3 col-md-6 col-sm-12">
              <Card className="m-0 p-0 bg-dark text-white" style={{ width: "100%" }}>
                <Card.Img variant="top" src={news3} className="m-0 p-0" />
                <Card.Body>
                  <Card.Text>NDA Meets To Decide On Cabinet, Nitish Kumar, C Naidu Seek Key Posts</Card.Text>
                </Card.Body>
              </Card>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12">
              <Card className="m-0 p-0 bg-dark text-white" style={{ width: "100%" }}>
                <Card.Img variant="top" src={news5} className="m-0 p-0" />
                <Card.Body>
                  <Card.Text>Mumbai Engineer Stars In USA's Stunning Super Over Win Against Pakistan</Card.Text>
                </Card.Body>
              </Card>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12">
              <Card className="m-0 p-0 bg-dark text-white" style={{ width: "100%" }}>
                <Card.Img variant="top" src={news6} className="m-0 p-0" />
                <Card.Body>
                  <Card.Text className="mb-2">RBI May Not Cut Policy Rate Even If Federal Reserve Does: Shaktikanta </Card.Text>
                </Card.Body>
              </Card>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12">
              <Card className="m-0 p-0 bg-dark text-white" style={{ width: "100%" }}>
                <Card.Img variant="top" src={news9} className="m-0 p-0" />
                <Card.Body>
                  <Card.Text>Constable Who Slapped Kangana Ranaut Suspended, Arrested</Card.Text>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <hr />

      <div className="container-fluid dashboard-news-wrapper">
        <div className="container-fluid m-0 p-0">
          <div className="row g-3 px-3 py-3">
            {/* First div */}
            <div className="col-lg-5 col-md-6 col-sm-12" style={{ borderRight: "1px solid #505050" }}>
              <img src={news11} alt="" className="img-fluid rounded object-fit-contain" style={{ width: "100%" }} />
              <hr />
              <h5>
              12 Pocket-Friendly Restaurants In Mumbai To Explore The City On A BudgetMumbai Food Guide: Here are some of the city's legendary restaurants that serve delicious and budget-friendly food.Toshita SahniUpdated: June 05, 2024 21:08 
              </h5>
            </div>

            {/* Second Div */}
            <div className="col-lg-3 col-md-6 col-sm-12" style={{ borderRight: "1px solid #505050" }}>
              <img src={news13} alt="" className="img-fluid rounded" />
              <span className="text-capitalize">The India Meteorological Department (IMD) on Friday (June 7) said the monsoon is expected to reach Mumbai between June 9 and 10. The IMD said the southwest</span>
              <hr />
              <span className="text-capitalize">In Pics: New Parents Varun Dhawan-Natasha Dalal Take Their Baby Girl Home</span>
              <hr />
              <span className="text-capitalize">WHO Says 1.6 Million People Globally Fall Ill Daily Due To Contaminated Food</span>
            </div>

            {/* Third Div */}
            <div className="col-lg-4 col-md-12 col-sm-12" style={{ borderRight: "1px solid #505050" }}>
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

      <hr />
    </>
  );
};

export default Hoc(Dashboard);
