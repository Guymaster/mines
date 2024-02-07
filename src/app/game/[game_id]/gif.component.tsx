import { gifler } from "gifler";
import { LegacyRef, useEffect, useMemo, useRef } from "react";
import { Image } from 'react-konva';
import { Image as I } from "konva/lib/shapes/Image";

export function GIF(props: { src: string }) {
    const imageRef = useRef<{getLayer: any}>(null);
    const canvas = useMemo(() => {
      const node = document.createElement("canvas");
      return node;
    }, []);
  
    useEffect(() => {
        console.log("GIFLER: ", gifler)
      // save animation instance to stop it on unmount
      let anim: any;
      gifler(props.src).get((a: any) => {
        anim = a;
        anim.animateInCanvas(canvas);
        anim.onDrawFrame = (ctx: any, frame: any) => {
          ctx.drawImage(frame.buffer, frame.x, frame.y);
          imageRef.current?.getLayer().draw();
        };
      });
      return () => anim.stop();
    }, [props.src, canvas]);
  
    return <Image image={canvas} ref={ imageRef as LegacyRef<I>} />;
  };