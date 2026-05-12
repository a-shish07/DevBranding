import React from 'react';
import { motion } from "framer-motion";

const TitleReveal = ({ children, className = "", delay = 0 }) => {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.08, 
        delayChildren: delay 
      },
    },
  };

  const item = {
    hidden: { y: "120%", opacity: 0, rotate: 2 },
    visible: {
      y: 0,
      opacity: 1,
      rotate: 0,
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const renderContent = (content) => {
    return React.Children.map(content, (child) => {
      if (typeof child === "string") {
        return child.split(" ").map((word, i) => (
          <span key={i} className="inline-block overflow-hidden mr-[0.25em] py-[0.1em]">
            <motion.span variants={item} className="inline-block whitespace-nowrap">
              {word}
            </motion.span>
          </span>
        ));
      }
      if (React.isValidElement(child)) {
        if (child.type === "br") return child;
        return (
          <span className="inline-block">
            {React.cloneElement(child, {
              children: renderContent(child.props.children),
            })}
          </span>
        );
      }
      return child;
    });
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className={className}
    >
      {renderContent(children)}
    </motion.div>
  );
};

export default TitleReveal;
