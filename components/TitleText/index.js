import React from 'react'
import { motion } from 'framer-motion'
import { textContainer, textVariant2 } from '@/utils/motion'

export const TitleText = ({ title, textStyle }) => (
  <motion.p
    variants={textVariant2}
    initial="hidden"
    whileInView="show"
    className={`font-normal text-[14x] xl:text-[22px] 2xl:text-[24px] lg:text-[22px] sm:text-[14px] md:text-[16px] text-black py-2 ${textStyle} `}
  >
    {title}
  </motion.p>
)
