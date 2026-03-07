import { motion } from "framer-motion";

const TypewriterHeadline = () => {
  const lines = ["Every site.", "Every format.", "One API."];

  return (
    <h1 className="text-4xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-foreground mb-8">
      {lines.map((line, lineIndex) => (
        <span key={lineIndex} className="block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.3 + lineIndex * 0.15,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </h1>
  );
};

export default TypewriterHeadline;
