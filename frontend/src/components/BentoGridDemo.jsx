import React from "react";
import { BentoGrid, BentoGridItem } from "../components/ui/bento-grid";
import {
  IconArrowWaveRightUp,
  IconBoxAlignRightFilled,
  IconBoxAlignTopLeft,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";
import img from '../assets/image.png';
import img1 from '../assets/img1.png'
import cars from '../assets/cars.png'
import caro from '../assets/caro.png'

export function BentoGridDemo() {
  return (
    <BentoGrid className="max-w-5xl mx-auto">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          icon={item.icon}
          className={i === 3 || i === 6 ? "md:col-span-2" : ""}
        />
      ))}
    </BentoGrid>
  );
}

const ImagePreview = ({ images = [] }) => (
  <div className="flex space-x-2">
    {images.map((image, idx) => (
      <img
        key={idx}
        src={image}
        alt={`Image ${idx + 1}`}
        className="w-20 h-20 object-cover rounded-xl"
      />
    ))}
  </div>
);

const items = [
  {
    title: "The Dawn of Innovation",
    description: "Explore the birth of groundbreaking ideas and inventions.",
    header: <img src={img} alt="Innovation" className="w-full h-40 object-cover rounded-xl" />,
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Digital Revolution",
    description: "Dive into the transformative power of technology.",
    header: <img src={cars} alt="Digital Revolution" className="w-full h-40 object-cover rounded-xl" />,
    icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Art of Design",
    description: "Discover the beauty of thoughtful and functional design.",
    header: <img src={img1} alt="Design" className="w-full h-40 object-cover rounded-xl" />,
    icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Power of Communication",
    description: "Understand the impact of effective communication in our lives.",
    header: <img src={caro} alt="Communication" className="w-full h-40 object-cover rounded-xl" />,
    icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Pursuit of Knowledge",
    description: "Join the quest for understanding and enlightenment.",
    header: <img src={img1} alt="Knowledge" className="w-full h-40 object-cover rounded-xl" />,
    icon: <IconArrowWaveRightUp className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Joy of Creation",
    description: "Experience the thrill of bringing ideas to life.",
    header: <img src={img} alt="Creation" className="w-full h-40 object-cover rounded-xl" />,
    icon: <IconBoxAlignTopLeft className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Spirit of Adventure",
    description: "Embark on exciting journeys and thrilling discoveries.",
    header: <img src={caro} alt="Adventure" className="w-full h-40 object-cover rounded-xl" />,
    icon: <IconBoxAlignRightFilled className="h-4 w-4 text-neutral-500" />,
  },
];

