import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Button,
} from "@nextui-org/react";
const CoverImages = () => {
  return (
    <div className="grid max-w-[900px] grid-cols-12 gap-2 ">
      <Card className="col-span-12 h-[300px] sm:col-span-4">
        <CardHeader className="absolute top-1 z-10 flex-col !items-start">
          <p className="text-tiny font-bold uppercase text-white/60">
            What to watch
          </p>
          <h4 className="text-large font-medium text-white">
            Stream the Acme event
          </h4>
        </CardHeader>
        <Image
          removeWrapper
          alt="Card background"
          className="z-0 h-full w-full object-cover"
          src="/images/card-example-4.jpeg"
        />
      </Card>
      <Card className="col-span-4 aspect-[3/2]">
        <CardHeader className="absolute top-1 z-10 flex-col !items-start">
          <p className="text-tiny font-bold uppercase text-white/60">
            Plant a tree
          </p>
          <h4 className="text-large font-medium text-white">
            Contribute to the planet
          </h4>
        </CardHeader>
        <Image
          removeWrapper
          alt="Card background"
          className="z-0 h-full w-full object-cover"
          src="/images/card-example-3.jpeg"
        />
      </Card>
      <Card className="col-span-4  aspect-[3/2]">
        <CardHeader className="absolute top-1 z-10 flex-col !items-start">
          <p className="text-tiny font-bold uppercase text-white/60">
            Supercharged
          </p>
          <h4 className="text-large font-medium text-white">
            Creates beauty like a beast
          </h4>
        </CardHeader>
        <Image
          removeWrapper
          alt="Card background"
          className="z-0 h-full w-full object-cover"
          src="/images/card-example-2.jpeg"
        />
      </Card>
      <Card
        isFooterBlurred
        className="col-span-4 aspect-[3/2] w-full sm:col-span-5"
      >
        <CardHeader className="absolute top-1 z-10 flex-col items-start">
          <p className="text-tiny font-bold uppercase text-white/60">New</p>
          <h4 className="text-2xl font-medium text-black">Acme camera</h4>
        </CardHeader>
        <Image
          removeWrapper
          alt="Card example background"
          className="z-0 h-full w-full -translate-y-6 scale-125 object-cover"
          src="/images/card-example-6.jpeg"
        />
        <CardFooter className="absolute bottom-0 z-10 justify-between border-t-1 border-zinc-100/50 bg-white/30">
          <div>
            <p className="text-tiny text-black">Available soon.</p>
            <p className="text-tiny text-black">Get notified.</p>
          </div>
          <Button className="text-tiny" color="primary" radius="full" size="sm">
            Notify Me
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CoverImages;
