import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Button,
} from "@nextui-org/react";

const CardMap = () => {
  return (
    <div>
      <Card
        isFooterBlurred
        className="col-span-12 h-[300px] w-full sm:col-span-7"
      >
        <CardHeader className="absolute top-1 z-10 flex-col items-start">
          <p className="text-tiny font-bold uppercase">lOKASI</p>
        </CardHeader>
        <Image
          removeWrapper
          alt="Relaxing app background"
          className="z-0 h-full w-full object-cover"
          src="/images/card-example-5.jpeg"
        />
        <CardFooter className="absolute bottom-0 z-10 border-t-1 border-default-600 bg-black/40 dark:border-default-100">
          <div className="flex flex-grow items-center gap-2">
            <Image
              alt="Breathing app icon"
              className="h-11 w-10 rounded-full bg-black"
              src="/images/breathing-app-icon.jpeg"
            />
            <div className="flex flex-col">
              <p className="text-tiny text-white/60">Breathing App</p>
              <p className="text-tiny text-white/60">
                Get a good night's sleep.
              </p>
            </div>
          </div>
          <Button radius="full" size="sm">
            Get App
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CardMap;
