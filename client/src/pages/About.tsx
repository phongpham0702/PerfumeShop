import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Tooltip,
}  from "@material-tailwind/react"

const About = () => {
  return( <>

    <section className="lg:md:flex-row flex-col flex flex-wrap justify-center align-middle p-10 font-space h-fit">
      <div className=" pr-8 flex-[1] text-justify leading-loose">
        <h2 className=" font-extrabold text-2xl">
          About Us
        </h2>
        <p className=" font-normal pt-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta similique animi sit quidem, totam expedita debitis sed suscipit aperiam aliquam repudiandae voluptate hic tenetur, id molestiae earum a! Molestias excepturi consequatur officiis praesentium, voluptatem optio non voluptatum vitae asperiores eum ipsam eaque suscipit id nam repudiandae eos ea nesciunt dolor veniam, sint est ad inventore. Consequuntur quisquam harum nemo dolor iure autem nam est?
        </p>
        <br></br>
        <p className=" font-normal">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quam et necessitatibus molestias harum illo, alias aspernatur dolore voluptates excepturi. Delectus mollitia at pariatur earum consequatur sequi voluptates doloremque velit dignissimos?
        </p>

      </div>
      <div className="flex-[1] lg:md:pt-0 pt-5">
        <img src="/images/about/shop.jpg" className="w-full h-full rounded-md" alt="perfume-shop"></img>
      </div>
    </section>

    <section className="flex justify-center align-middle gap-5 p-10 bg-[#e6e6e6]">
      <Card className="w-80 shadow-[0px_8px_15px_0px_#515151]">
        <CardHeader floated={false} className="h-80" >
          <div className="w-full h-full bg-[url('/images/about/founder1.jpg')] bg-center bg-cover"></div>
        </CardHeader>
        <CardBody className="text-center">
          <Typography variant="h4" color="blue-gray" className="mb-2">
            Mr. Phat Dat
          </Typography>
          <Typography color="blue-gray" className="font-medium" textGradient>
            Co-Founder
          </Typography>
        </CardBody>
        
      </Card>

      <Card className="w-80 shadow-[0px_8px_15px_0px_#515151]">
        <CardHeader floated={false} className="h-80">
          <div className="w-full h-full bg-[url('/images/about/founder2.jpg')] bg-center bg-cover"></div>
        </CardHeader>
        <CardBody className="text-center">
          <Typography variant="h4" color="blue-gray" className="mb-2">
            Mr. Thanh Phong
          </Typography>
          <Typography color="blue-gray" className="font-medium" textGradient>
            Co-Founder
          </Typography>
        </CardBody>
      </Card>

      <Card className="w-80 shadow-[0px_8px_15px_0px_#515151]">
        <CardHeader floated={false} className="h-80">
          <div className="w-full h-full bg-[url('/images/about/culi.jpg')] bg-center bg-cover"></div>
        </CardHeader>
        <CardBody className="text-center">
          <Typography variant="h4" color="blue-gray" className="mb-2">
            Mr. Ngoc Ngo
          </Typography>
          <Typography color="blue-gray" className="font-medium" textGradient>
            Co-Founder
          </Typography>
        </CardBody>
      </Card>
    </section>
    
  </>);
};

export default About;
