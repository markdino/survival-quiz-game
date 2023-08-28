import Image from "next/image";
import { useEffect, useState } from "react";
import cuteEarsGif from "@assets/images/cute-ears.gif";
import sadCuteGif from "@assets/images/sad-cute.gif";
import peachCatCuteGif from "@assets/images/peach-cat-cute.gif";
import peachCatGif from "@assets/images/peach-cat.gif";
import Glass from "@components/Glass";

const WaitingGif = () => {
  const [intervalId, setIntervalId] = useState(null);
  const [timerCount, setTimerCount] = useState(0);
  const [image, setImage] = useState(cuteEarsGif.src);
  const [caption, setCaption] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("#fcfcf9");

  useEffect(() => {
    const newIntervalId = setInterval(() => {
      setTimerCount((prevCount) => prevCount + 1);
    }, 1000);
    setIntervalId(newIntervalId);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    if (timerCount <= 15) {
      setImage(cuteEarsGif.src);
      setCaption("Waiting for other players...");
    } else if (timerCount > 15 && timerCount <= 25) {
      setImage(sadCuteGif.src);
      setCaption("Still waiting for other players...");
      setBackgroundColor("#ffffff");
    } else if (timerCount > 25 && timerCount <= 40) {
      setImage(peachCatCuteGif.src);
      setCaption("Are they still coming? hmmm...");
      setBackgroundColor("#fcfaf8");
    } else {
      setImage(peachCatGif.src);
      setCaption("Are we going to start or not?");
      setBackgroundColor("#fcfefc");
      clearInterval(intervalId);
    }
    console.log({ timerCount });
  }, [timerCount]);

  return (
    <section className="w-full h-full flex flex-col gap-2 justify-center items-center">
      <section
        className="rounded-full w-72 h-72 overflow-hidden flex justify-center items-center"
        style={{ backgroundColor }}
      >
        <Image
          src={image}
          width={200}
          height={200}
          style={{ maxHeight: "200px", maxWidth: "200px" }}
          alt="dancing fox"
        />
      </section>
      <Glass className="px-4 py-1" opacity={0.6}>
        <p>{caption}</p>
      </Glass>
    </section>
  );
};

export default WaitingGif;
