'use client';

import { motion, type MotionProps } from 'framer-motion';
import type { ElementType, HTMLAttributes } from 'react';

type MotionDivProps = MotionProps &
  HTMLAttributes<HTMLDivElement> & {
    tag?: ElementType;
  };

export function MotionDiv({ tag = 'div', ...props }: MotionDivProps) {
  const MotionComponent = motion(tag);
  return <MotionComponent {...props} />;
}
