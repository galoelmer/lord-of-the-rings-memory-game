import Image, { ImageProps } from "next/image";

export default function BackgroundImage({ src, alt, ...rest }: ImageProps) {
  return (
    <Image
      fill
      priority
      src={src}
      alt={alt}
      quality={100}
      placeholder="empty"
      {...rest}
    />
  );
}
