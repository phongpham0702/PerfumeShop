import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Tooltip,
}  from "@material-tailwind/react"

const About = () => {
  return( <>

    <section className="h-80 content-center">
      <div className="relative transform-style-preserve3d animate-galleryRotate w-60 h-60 m-auto">
          <div  style={{ transform: `rotateY(0deg) translateZ(380px)` }} className="absolute w-full h-full origin-center transform-style-preserve3d">
            <img  className="absolute w-full h-full object-cover" src="./images/about/a.jpg" alt=""  />
          </div>
          <div  style={{ transform: `rotateY(120deg) translateZ(380px)` }} className="absolute w-full h-full origin-center transform-style-preserve3d">
            <img className="absolute w-full h-full object-cover" src="./images/about/a.jpg" alt=""  />
          </div>
          <div  style={{ transform: `rotateY(240deg) translateZ(380px)` }} className="absolute w-full h-full origin-center transform-style-preserve3d">
            <img className="absolute w-full h-full object-cover" src="./images/about/a.jpg" alt=""  />
          </div>
        </div>
    </section>
    <section>
      aaaa
    </section>
    
  </>);
};

export default About;
