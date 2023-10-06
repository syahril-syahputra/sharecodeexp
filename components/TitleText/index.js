import {motion} from 'framer-motion';
import {textContainer, textVariant2} from '@/utils/motion';

export const TitleText = ({title, textStyle}) => (
  <motion.p
    variants={textVariant2}
    initial="hidden"
    whileInView="show"
    className={`font-normal text-[22px] text-black py-2 ${textStyle} `}
  >
    {title}
  </motion.p>
);
