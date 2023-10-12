import {motion} from 'framer-motion';
import {textContainer, textVariant2} from '@/utils/motion';

export const TypingText = ({title, textStyle}) => (
  <motion.h2
    variants={textContainer}
    className={`font-semibold text-[20px] lg:text-[40px] sm:text-[20px] text-black ${textStyle}`}
  >
    {Array.from(title).map((l, index) => {
      return (
        <motion.span
          variants={textVariant2}
          className={`${
            l === '/' ? 'text-sub-header !important md:text-6xl' : ''
          }  `}
          key={l}
        >
          {l === '' ? '\u00A0' : l}
        </motion.span>
      );
    })}
  </motion.h2>
);
